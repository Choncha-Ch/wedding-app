import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { saveRsvpData } from '@/lib/storage';
import { submitRSVP, fetchRSVPStatus } from '@/lib/rsvp-service';
import { toast } from 'sonner';

const rsvpEvents = [
  { id: 'phuket-wedding', title: 'Exclusive Wedding in Phuket', date: '9th Dec 2026' },
  { id: 'traditional-wedding', title: 'Traditional Wedding', date: '19th Dec 2026' },
  { id: 'official-wedding', title: 'Official Wedding', date: '19th Dec 2026' },
];

const RSVP = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    allergy: ''
  });
  const [responses, setResponses] = useState<Record<string, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // FETCH ON LOAD: Pull existing info from Supabase to "Remember" the guest
  useEffect(() => {
    const loadExistingData = async () => {
      try {
        const data = await fetchRSVPStatus();
        if (data) {
          setForm({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || '',
            whatsapp: data.phone_number || '',
            allergy: data.allergy || ''
          });

          setResponses({
            'phuket-wedding': data.is_phuket_wedding,
            'traditional-wedding': data.is_thai_wedding,
            'official-wedding': data.is_suphan_wedding
          });
          
          // If they have filled in an email, they've already submitted before
          if (data.email) setSubmitted(true);
        }
      } catch (err) {
        console.error("Error loading RSVP:", err);
      } finally {
        setLoading(false);
      }
    };
    loadExistingData();
  }, []);

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error('Please fill in required fields');
      return;
    }
    setLoading(true);
    try {
      await submitRSVP(form, responses, []); 
      saveRsvpData({ ...form, responses, submitted: true });
      setSubmitted(true);
      toast.success('Your RSVP has been saved!');
    } catch (err) {
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="animate-pulse font-serif text-gold">Loading your RSVP...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-8 text-center">
        <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">RSVP</h1>
        <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-sans">
            ★ Please submit before 30 April 2026 ★
          </p>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-6">
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
          <h2 className="font-serif text-lg text-foreground mb-4">Your Information</h2>
          <div className="space-y-3">
            <input placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" />
            <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" />
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" />
            <input placeholder="WhatsApp / Phone +49xxxxxxxxxxx" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" />
            <textarea placeholder="Allergies or Dietary Requirements" value={form.allergy} onChange={e => setForm({...form, allergy: e.target.value})} className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm h-20" />
          </div>
        </div>

        {rsvpEvents.map((event) => (
          <div key={event.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h3 className="font-serif text-lg mb-1">{event.title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">{event.date}</p>
            <div className="flex gap-3">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => setResponses({ ...responses, [event.id]: val })}
                  className={`flex-1 py-2 rounded-md text-sm border transition-all ${responses[event.id] === val ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-border text-muted-foreground'}`}
                >
                  {val ? 'Accept' : 'Decline'}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          className="w-full py-4 bg-primary text-white rounded-md uppercase tracking-[0.2em] text-xs font-bold shadow-lg active:scale-[0.95] transition-transform"
        >
          {loading ? 'Saving...' : submitted ? 'Update RSVP' : 'Submit RSVP'}
        </button>
        
        {submitted && (
          <p className="text-center text-[10px] text-sage-dark uppercase tracking-[0.15em] font-medium">
            You can return to this page to update your details anytime.
          </p>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default RSVP;
