import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Clock, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { events } from '@/lib/events';
import { getAcceptedEvents, toggleEvent } from '@/lib/storage';
import { toast } from 'sonner';

const Activities = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(getAcceptedEvents());

  const handleToggle = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleEvent(eventId);
    setAccepted(updated);
    if (updated.includes(eventId)) {
      toast.success('Added to your calendar!');
    } else {
      toast('Removed from calendar');
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-6 text-center">
        <CalendarDays className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Events & Activities</h1>
        <p className="font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
          December 5 – 20, 2026
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-3">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            className={`bg-card rounded-lg p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
              event.isWedding ? 'border-gold/50 ring-1 ring-gold/20' : 'border-border'
            }`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/activities/${event.id}`)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {event.isWedding && <Star className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                  <h3 className="font-serif text-base text-foreground truncate">{event.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {event.time}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-xs text-gold-dark font-sans mt-0.5">
                  <MapPin className="w-3 h-3" /> {event.location}
                </p>
              </div>

              {!event.isWedding && (
                <button
                  onClick={(e) => handleToggle(event.id, e)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all flex-shrink-0 ${
                    accepted.includes(event.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {accepted.includes(event.id) ? 'Going ✓' : 'Join'}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default Activities;
