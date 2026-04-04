import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Clock, CalendarDays, Shirt, 
  DollarSign, ExternalLink, Info, Palette 
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { events } from '@/lib/events';
import { toggleEvent, saveAcceptedEvents } from '@/lib/storage';
import { updateSingleActivity, fetchRSVPStatus, EVENT_MAP } from '@/lib/rsvp-service';
import { toast } from 'sonner';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);
  
  const [accepted, setAccepted] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const syncWithDB = async () => {
      try {
        const data = await fetchRSVPStatus();
        if (data) {
          const dbAccepted: string[] = [];
          Object.keys(EVENT_MAP).forEach(uiKey => {
            if (data[EVENT_MAP[uiKey]] === true) dbAccepted.push(uiKey);
          });
          setAccepted(dbAccepted);
          saveAcceptedEvents(dbAccepted);
        }
      } catch (error) {
        console.error("Database sync error:", error);
      }
    };
    syncWithDB();
  }, [id]);

  if (!event) return <div className="min-h-screen bg-cream flex items-center justify-center font-serif text-gold">Event not found</div>;

  const isAccepted = accepted.includes(event.id);

  const handleToggle = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    const isJoining = !isAccepted;
    const updated = toggleEvent(event.id);
    setAccepted(updated);

    try {
      await updateSingleActivity(event.id, isJoining);
      toast.success(isJoining ? 'Added to your itinerary!' : 'Removed');
    } catch (error) {
      toast.error("Error updating database.");
      setAccepted(prev => isJoining ? prev.filter(i => i !== event.id) : [...prev, event.id]);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground font-sans text-xs uppercase tracking-widest mb-6 hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </button>
      </div>

      <motion.div className="px-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
            <h1 className="font-serif text-3xl text-foreground leading-tight mb-2">{event.title}</h1>
            {event.isWedding && (
                <span className="inline-block bg-gold/10 text-gold text-[10px] font-sans uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-gold/20">
                    Wedding Event
                </span>
            )}
        </div>

        {event.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 aspect-video">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 mb-8">
          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border"><CalendarDays className="w-5 h-5 text-gold" /></div>
            <div>
              <p className="font-sans text-sm text-foreground font-medium">{event.date}</p>
              <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border"><MapPin className="w-5 h-5 text-gold" /></div>
            <div className="flex-1">
              <p className="font-sans text-sm text-foreground font-medium">{event.location}</p>
              {event.mapLink && <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-gold uppercase tracking-wider font-bold mt-1">Open in Maps <ExternalLink className="w-3 h-3" /></a>}
            </div>
          </div>

          {/* PRICING SECTION */}
          {(event.priceTHB || event.priceEUR) && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border">
                  <DollarSign className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-sans text-sm text-foreground font-medium">
                  {event.priceTHB && `฿${event.priceTHB}`}
                  {event.priceTHB && event.priceEUR && <span className="mx-2 text-border">|</span>}
                  {event.priceEUR && `€${event.priceEUR}`}
                </p>
                <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Estimated Cost</p>
              </div>
            </div>
          )}

          {/* Dress Code */}
          {event.dressCode && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border"><Shirt className="w-5 h-5 text-gold" /></div>
              <div>
                <p className="font-sans text-sm text-foreground font-medium">{event.dressCode}</p>
                <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Dress Code</p>
              </div>
            </div>
          )}

          {/* COLOR PALETTE SECTION */}
          {event.colors && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border"><Palette className="w-5 h-5 text-gold" /></div>
              <div>
                <div className="flex gap-2 mb-1">
                  {event.colors.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white border border-border rounded-full px-2 py-1">
                      <div className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: c.hex }} />
                      <span className="font-sans text-[10px] text-foreground font-medium">{c.name}</span>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Theme Colors</p>
              </div>
            </div>
          )}
        </div>

        {/* ELEGANT TYPOGRAPHY STACK (Icon-free, Box-free) */}
        {event.highlightLines && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 mt-4 text-center px-4"
          >
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-dark/60 font-bold mb-6">
              Event Highlights
            </h4>
            
            <div className="space-y-4">
              {event.highlightLines.map((line, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <p className="font-serif text-base text-foreground/90 leading-relaxed italic max-w-[90%] mx-auto">
                    "{line}"
                  </p>
                  {idx < event.highlightLines.length - 1 && (
                    <div className="w-px h-3 bg-gold/30 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}  

        {/* Description */}
        <div className="bg-white/60 rounded-2xl p-6 border border-border/50 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
             <Info className="w-4 h-4 text-gold/60" />
             <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">About the event</h4>
          </div>
          <p className="font-serif text-base text-foreground/80 leading-relaxed italic">"{event.description}"</p>
        </div>

        {/* TIMELINE SECTION */}
        {event.timeline && (
          <div className="mb-10 px-2">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-gold" />
              <h2 className="font-serif text-xl text-foreground">Event Schedule</h2>
            </div>
            <div className="relative pl-6 border-l border-gold/30">
              {event.timeline.map((item, i) => (
                <div key={i} className="relative pb-6 last:pb-0">
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-gold border-2 border-cream" />
                  <p className="font-sans text-[10px] tracking-wider text-gold-dark uppercase mb-1 font-bold">{item.time}</p>
                  <p className="font-serif text-sm text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!event.isWedding && (
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleToggle} disabled={isSyncing} className={`w-full py-4 rounded-xl font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-lg ${isAccepted ? 'bg-foreground text-background shadow-foreground/20' : 'bg-primary text-white shadow-primary/30'} ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isSyncing ? 'Updating...' : isAccepted ? 'Remove from Calendar' : 'Yes, Count Me In!'}
          </motion.button>
        )}
      </motion.div>
      <Navigation />
    </div>
  );
};

export default ActivityDetail;
