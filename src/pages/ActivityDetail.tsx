import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, CalendarDays, Shirt, DollarSign, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { events } from '@/lib/events';
import { getAcceptedEvents, toggleEvent } from '@/lib/storage';
import { toast } from 'sonner';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);
  const [accepted, setAccepted] = useState(getAcceptedEvents());

  if (!event) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-serif text-lg text-foreground">Event not found</p>
      </div>
    );
  }

  const isAccepted = accepted.includes(event.id);

  const handleToggle = () => {
    const updated = toggleEvent(event.id);
    setAccepted(updated);
    toast(updated.includes(event.id) ? 'Added to your calendar!' : 'Removed from calendar');
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground font-sans text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <motion.div
        className="px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl text-foreground mb-6">{event.title}</h1>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-sans text-sm text-foreground">{event.date}</p>
              <p className="font-sans text-xs text-muted-foreground">Date</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-sans text-sm text-foreground">{event.time}</p>
              <p className="font-sans text-xs text-muted-foreground">Time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-sans text-sm text-foreground">{event.location}</p>
              {event.mapLink && (
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-gold-dark flex items-center gap-1 mt-0.5"
                >
                  View on Map <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          {event.dressCode && (
            <div className="flex items-start gap-3">
              <Shirt className="w-5 h-5 text-gold mt-0.5" />
              <div>
                <p className="font-sans text-sm text-foreground">{event.dressCode}</p>
                <p className="font-sans text-xs text-muted-foreground">Dress Code</p>
              </div>
            </div>
          )}
          {event.priceTHB && (
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-gold mt-0.5" />
              <div>
                <p className="font-sans text-sm text-foreground">
                  ฿{event.priceTHB} THB / €{event.priceEUR} EUR
                </p>
                <p className="font-sans text-xs text-muted-foreground">Estimated Cost</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card rounded-lg p-5 border border-border mb-8">
          <p className="font-sans text-sm text-foreground leading-relaxed">
            {event.description}
          </p>
        </div>

        {!event.isWedding && (
          <button
            onClick={handleToggle}
            className={`w-full py-3.5 rounded-md font-sans text-sm tracking-[0.15em] uppercase transition-all ${
              isAccepted
                ? 'bg-foreground text-background'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {isAccepted ? 'Remove from Calendar' : 'Yes, Count Me In!'}
          </button>
        )}
      </motion.div>

      <Navigation />
    </div>
  );
};

export default ActivityDetail;
