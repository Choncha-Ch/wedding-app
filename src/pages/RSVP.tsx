import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plane, Car } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { saveRsvpData } from '@/lib/storage';
import { submitRSVP, fetchRSVPStatus, updateFlightInfo } from '@/lib/rsvp-service';
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
  const [flightForm, setFlightForm] = useState({
    flight: '',
    date: '',
    time: '',
    bangkokFlight: '',
    bangkokAirport: '',
    bangkokDate: '',
    bangkokTime: '',
    toSuphan: '',
    numberSuphan: '0',
    toBangkok: '',
    numberBangkok: '0'
  });
  const [responses, setResponses] = useState<Record<string, boolean | null>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
          setFlightForm({
            flight: data.phuket_flight || '',
            date: data.phuket_date || '',
            time: data.phuket_time || '',
            bangkokFlight: data.bangkok_flight || '',
            bangkokAirport: data.bangkok_airport || '',
            bangkokDate: data.bangkok_date || '',
            bangkokTime: data.bangkok_time || '',
            toSuphan: data.to_suphan || '',
            numberSuphan: data.number_suphan?.toString() || '0',
            toBangkok: data.to_bangkok || '',
            numberBangkok: data.number_bangkok?.toString() || '0'
          });
          setResponses({
            'phuket-wedding': data.is_phuket_wedding,
            'traditional-wedding': data.is_thai_wedding,
            'official-wedding': data.is_suphan_wedding
          });
        }
      } catch (err) {
        console.error("Error loading RSVP:", err);
      } finally {
        setLoading(false);
      }
    };
    loadExistingData();
  }, []);

  const autoSaveMain = async (updatedForm = form, updatedResponses = responses) => {
    if (!updatedForm.firstName || !updatedForm.lastName || !updatedForm.email) return;
    setIsSaving(true);
    try {
      await submitRSVP(updatedForm, updatedResponses);
      saveRsvpData({ ...updatedForm, responses: updatedResponses, submitted: true });
      toast.success('Changes saved automatically', { duration: 1000 });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const autoSaveFlight = async (updatedFlight = flightForm) => {
    try {
      await updateFlightInfo(updatedFlight);
      toast.success('Information updated', { duration: 1000 });
    } catch (err) {
      console.error(err);
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
          ★ Please submit before 31 May 2026 ★
        </p>
        
        {isSaving && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-4 text-[10px] text-gold font-bold uppercase tracking-widest animate-pulse"
          >
            Saving updates...
          </motion.div>
        )}
      </div>

      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* PERSONAL INFO SECTION */}
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
          <h2 className="font-serif text-lg text-foreground mb-4">Your Information</h2>
          <div className="space-y-3">
            <input 
              placeholder="First Name" 
              value={form.firstName} 
              onChange={e => setForm({...form, firstName: e.target.value})}
              onBlur={() => autoSaveMain()} 
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
            />
            <input 
              placeholder="Last Name" 
              value={form.lastName} 
              onChange={e => setForm({...form, lastName: e.target.value})} 
              onBlur={() => autoSaveMain()}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
            />
            <input 
              placeholder="Email" 
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
              onBlur={() => autoSaveMain()}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
            />
            <input 
              placeholder="WhatsApp / Phone +49xxxxxxxxxxx" 
              value={form.whatsapp} 
              onChange={e => setForm({...form, whatsapp: e.target.value})} 
              onBlur={() => autoSaveMain()}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
            />
            <textarea 
              placeholder="Allergies or Dietary Requirements" 
              value={form.allergy} 
              onChange={e => setForm({...form, allergy: e.target.value})} 
              onBlur={() => autoSaveMain()}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm h-20" 
            />
          </div>
        </div>

        {/* RSVP EVENT CARDS */}
        {rsvpEvents.map((event) => (
          <div key={event.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <h3 className="font-serif text-lg mb-1">{event.title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">{event.date}</p>
            <div className="flex gap-3">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => {
                    const newResponses = { ...responses, [event.id]: val };
                    setResponses(newResponses);
                    autoSaveMain(form, newResponses);
                  }}
                  className={`flex-1 py-2 rounded-md text-sm border transition-all ${responses[event.id] === val ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-border text-muted-foreground'}`}
                >
                  {val ? 'Accept' : 'Decline'}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* PHUKET ARRIVAL SECTION */}
        <div className="bg-white/50 border border-gold/20 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg text-foreground">Phuket Arrival</h2>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Fill in when flight is booked</p>
          <div className="space-y-3">
            <input 
              placeholder="Flight Number" 
              value={flightForm.flight} 
              onChange={e => setFlightForm({...flightForm, flight: e.target.value})} 
              onBlur={() => autoSaveFlight()}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
            />
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Flight date and Arrival time</p>
            <div className="flex gap-2">
              <input 
                type="date" 
                value={flightForm.date} 
                onChange={e => setFlightForm({...flightForm, date: e.target.value})} 
                onBlur={() => autoSaveFlight()}
                className="flex-1 px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
              />
              <input 
                type="time" 
                value={flightForm.time} 
                onChange={e => setFlightForm({...flightForm, time: e.target.value})} 
                onBlur={() => autoSaveFlight()}
                className="flex-1 px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
              />
            </div>
          </div>
        </div>

        {/* SUPHANBURI ARRIVAL SECTION */}
        <div className="bg-white/50 border border-gold/20 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg text-foreground">Suphanburi Arrival</h2>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Fill when the flight is booked<br />Arrival to Bangkok
          </p>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input 
                placeholder="Flight Number" 
                value={flightForm.bangkokFlight} 
                onChange={e => setFlightForm({...flightForm, bangkokFlight: e.target.value})} 
                onBlur={() => autoSaveFlight()}
                className="flex-1 px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
              />
              <select 
                value={flightForm.bangkokAirport} 
                onChange={e => {
                  const updated = {...flightForm, bangkokAirport: e.target.value};
                  setFlightForm(updated);
                  autoSaveFlight(updated);
                }}
                className="w-1/3 px-3 py-2.5 bg-background border border-border rounded-md text-sm"
              >
                <option value="">Airport</option>
                <option value="BKK">BKK</option>
                <option value="DMK">DMK</option>
              </select>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Flight date and Arrival time</p>
            <div className="flex gap-2">
              <input 
                type="date" 
                value={flightForm.bangkokDate} 
                onChange={e => setFlightForm({...flightForm, bangkokDate: e.target.value})} 
                onBlur={() => autoSaveFlight()}
                className="flex-1 px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
              />
              <input 
                type="time" 
                value={flightForm.bangkokTime} 
                onChange={e => setFlightForm({...flightForm, bangkokTime: e.target.value})} 
                onBlur={() => autoSaveFlight()}
                className="flex-1 px-3 py-2.5 bg-background border border-border rounded-md text-sm" 
              />
            </div>
          </div>
        </div>

        {/* TRANSPORTATION SECTION */}
        <div className="bg-white/50 border border-gold/20 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg text-foreground">Transportation</h2>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Bangkok - Suphanburi Transfers
          </p>
          
          <div className="space-y-3">
            {/* TO SUPHAN */}
            <div>
              <p className="text-[10px] text-gold-dark font-bold uppercase tracking-widest mb-2">
                From Bangkok to Suphanburi
              </p>
              <select 
                value={flightForm.toSuphan}
                onChange={e => {
                  const updated = {...flightForm, toSuphan: e.target.value};
                  setFlightForm(updated);
                  autoSaveFlight(updated);
                }}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm mb-2"
              >
                <option value="">Select Timetable</option>
                <option value="17/12/26 late morning">17/12/26 late morning</option>
                <option value="17/12/26 late afternoon">17/12/26 late afternoon</option>
                <option value="18/12/26 late morning">18/12/26 late morning</option>
                <option value="18/12/26 late afternoon">18/12/26 late afternoon</option>
                <option value="do not need transport">Do not need transport</option>
              </select>
              
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Total Guests requesting transport</p>
              <select 
                value={flightForm.numberSuphan}
                onChange={e => {
                  const updated = {...flightForm, numberSuphan: e.target.value};
                  setFlightForm(updated);
                  autoSaveFlight(updated);
                }}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm"
              >
                {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* FROM SUPHAN */}
            <div>
              <p className="text-[10px] text-gold-dark font-bold uppercase tracking-widest mb-2">
                From Suphanburi to Bangkok
              </p>
              <select 
                value={flightForm.toBangkok}
                onChange={e => {
                  const updated = {...flightForm, toBangkok: e.target.value};
                  setFlightForm(updated);
                  autoSaveFlight(updated);
                }}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm mb-2"
              >
                <option value="">Select Timetable</option>
                <option value="20/12/26 late morning">20/12/26 late morning</option>
                <option value="20/12/26 late afternoon">20/12/26 late afternoon</option>
                <option value="do not need transport">Do not need transport</option>
              </select>

              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Total Guests requesting transport</p>
              <select 
                value={flightForm.numberBangkok}
                onChange={e => {
                  const updated = {...flightForm, numberBangkok: e.target.value};
                  setFlightForm(updated);
                  autoSaveFlight(updated);
                }}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm"
              >
                {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* INSTRUCTIONS */}
            <div className="pt-2">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Please INCLUDE YOURSELF and PLUS ONES.<br />
                However, <strong>do not include guests who are directly invited and have their own app access to register themselves.</strong><br />
                Only additionally count your extra plus-ones.<br /><br />
                
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-sage-dark uppercase tracking-[0.15em] font-medium py-4">
          You can return to this page to update your details anytime.
        </p>
      </div>
      <Navigation />
    </div>
  );
};

export default RSVP;