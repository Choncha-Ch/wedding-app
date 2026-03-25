import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getRsvpData, saveRsvpData } from '@/lib/storage';
import { toast } from 'sonner';

const rsvpEvents = [
  {
    id: 'phuket-wedding',
    title: 'Exclusive Wedding in Phuket',
    date: '9th December 2026',
    time: '3:00 PM – 3:00 AM',
    location: 'The Naka Island Luxury Resort',
  },
  {
    id: 'traditional-wedding',
    title: 'Traditional Wedding in Suphanburi',
    date: '19th December 2026',
    time: '9:00 AM – 12:00 PM',
    location: 'Chomdeun Complex',
  },
  {
    id: 'official-wedding',
    title: 'Official Wedding in Suphanburi',
    date: '19th December 2026',
    time: '5:00 PM – 11:00 PM',
    location: 'Sri Uthong Grand Hotel',
  },
];

const RSVP = () => {
  const existing = getRsvpData();
  const [form, setForm] = useState({
    firstName: existing?.firstName || '',
    lastName: existing?.lastName || '',
    email: existing?.email || '',
    whatsapp: existing?.whatsapp || '',
  });
  const [responses, setResponses] = useState<Record<string, boolean | null>>(
    existing?.responses || {}
  );
  const [submitted, setSubmitted] = useState(!!existing?.submitted);

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    const allAnswered = rsvpEvents.every(e => responses[e.id] !== undefined && responses[e.id] !== null);
    if (!allAnswered) {
      toast.error('Please respond to all wedding invitations');
      return;
    }
    saveRsvpData({ ...form, responses, submitted: true });
    setSubmitted(true);
    toast.success('Thank you for your RSVP!');
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-8 text-center">
        <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">RSVP</h1>
        <p className="font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
          We would be honoured <br />
          by your presence <br />
        </p>
      </div>

    <div className="text-center mb-6 px-6">
      <p className="font-sans text-[10px] tracking-[0.1em] text-muted-foreground/80 flex items-center justify-center gap-1.5 animate-pulse">
        please reply by 30 April 2026
      </p>
    </div>  

      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Guest Information */}
        <motion.div
          className="bg-card rounded-lg p-6 shadow-sm border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-serif text-lg text-foreground mb-4">Your Information</h2>
          <div className="space-y-3">
            {[
              { key: 'firstName', label: 'First Name *', type: 'text' },
              { key: 'lastName', label: 'Last Name *', type: 'text' },
              { key: 'email', label: 'Email *', type: 'email' },
              { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel' },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="font-sans text-xs tracking-wide text-muted-foreground block mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  disabled={submitted}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-md font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* RSVP Events */}
        {rsvpEvents.map((event, i) => (
          <motion.div
            key={event.id}
            className="bg-card rounded-lg p-6 shadow-sm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
          >
            <h3 className="font-serif text-lg text-foreground mb-1">{event.title}</h3>
            <p className="font-sans text-xs text-muted-foreground mb-1">{event.date}</p>
            <p className="font-sans text-xs text-muted-foreground mb-1">{event.time}</p>
            <p className="font-sans text-xs text-gold-dark mb-4">{event.location}</p>

            <div className="flex gap-3">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => !submitted && setResponses({ ...responses, [event.id]: val })}
                  disabled={submitted}
                  className={`flex-1 py-2.5 rounded-md font-sans text-sm tracking-wide transition-all border ${
                    responses[event.id] === val
                      ? val
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-foreground text-background border-foreground'
                      : 'bg-background text-foreground border-border hover:border-primary/50'
                  } disabled:cursor-default`}
                >
                  {val ? 'Joyfully Accept' : 'Regretfully Decline'}
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-primary-foreground rounded-md font-sans text-sm tracking-[0.15em] uppercase transition-all hover:opacity-90"
          >
            Submit RSVP
          </button>
        ) : (
          <div className="text-center py-6">
            <Check className="w-10 h-10 text-sage-dark mx-auto mb-2" />
            <p className="font-serif text-lg text-foreground">Thank you!</p>
            <p className="font-sans text-xs text-muted-foreground mt-1">Your response has been recorded</p>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default RSVP;
