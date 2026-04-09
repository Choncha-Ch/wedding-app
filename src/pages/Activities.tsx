import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { events } from '@/lib/events';
import { toggleEvent, saveAcceptedEvents } from '@/lib/storage';
import { updateSingleActivity, fetchRSVPStatus, EVENT_MAP } from '@/lib/rsvp-service';
import { toast } from 'sonner';

const Activities = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  useEffect(() => {
    const syncData = async () => {
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
      } catch (e) {
        console.error("Sync error:", e);
      }
    };
    syncData();
  }, []);

  const handleToggle = async (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isJoining = !accepted.includes(eventId);
    
    const updated = toggleEvent(eventId);
    setAccepted(updated);
    
    setIsSyncing(eventId);
    try {
      await updateSingleActivity(eventId, isJoining);
      toast.success(isJoining ? 'Joined!' : 'Removed');
    } catch (err) {
      setAccepted(prev => isJoining ? prev.filter(id => id !== eventId) : [...prev, eventId]);
      toast.error('Sync failed.');
    } finally {
      setIsSyncing(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24 text-center">
      <div className="px-6 pt-10 pb-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CalendarDays className="w-8 h-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-3xl mb-2 text-foreground">Events & Activities</h1>
          <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-sans">
            ★ Please finalise your interest by 31th May ★
          </p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 inline-block bg-gold/10 border border-gold/20 px-4 py-2 rounded-full shadow-sm"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-gold font-bold font-sans flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              Tap each event for details & prices
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-4 text-left">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl overflow-hidden border border-border/50 cursor-pointer shadow-sm active:scale-[0.98] transition-transform"
            onClick={() => navigate(`/activities/${event.id}`)}
          >
            <div className="flex items-center"> {/* Added items-center here */}
              {event.imageUrl && (
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={event.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
              )}
              
              <div className="p-4 flex flex-1 items-center justify-between min-w-0">
                {/* Text Container: min-w-0 prevents text from pushing the button */}
                <div className="min-w-0 pr-2">
                  <h3 className="font-serif text-sm text-foreground leading-tight mb-1 truncate">
                    {event.title}
                  </h3>
                  <p className="text-[9px] font-sans text-muted-foreground uppercase tracking-wider">
                    {event.date}
                  </p>
                </div>

                {/* Button Container: Fixed width prevents resizing */}
                {!event.isWedding && (
                  <button
                    onClick={(e) => handleToggle(event.id, e)}
                    className={`flex-shrink-0 w-[72px] py-1.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider transition-all text-center ${
                      accepted.includes(event.id) 
                        ? 'bg-foreground text-background' 
                        : 'border border-border text-muted-foreground'
                    } ${isSyncing === event.id ? 'opacity-50 animate-pulse' : ''}`}
                  >
                    {accepted.includes(event.id) ? 'Going ✓' : 'Join'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Navigation />
    </div>
  );
};

export default Activities;
