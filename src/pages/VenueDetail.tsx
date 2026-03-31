import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowLeft, Clock, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { fetchRSVPStatus, updateHotelBooking } from '@/lib/rsvp-service';
import { toast } from 'sonner';

import venueNaka from '@/assets/naka-island-1.jpeg';
import venueTraditional from '@/assets/chomdeun-pic1.jpeg';
import venueGrand from '@/assets/venue-grand.jpg';

import nakaRoom from '@/assets/nkisland-room.jpg'
import nakaSuite from '@/assets/nkisland-suite.jpg'
import nakaGarden from '@/assets/nkisland-villa-garden.jpg'
import nakaSea from '@/assets/nkisland-villa-sea.jpg'
import nakaBeach from '@/assets/nkisland-villa-beach.jpg'

interface TimelineItem {
  time: string;
  label: string;
}

interface RoomType {
  name: string;
  priceTHB: string;
  priceEUR: string;
  note?: string; 
  image: string;
}

interface VenueData {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  longDescription: string;
  image: string;
  galleryImages: string[];
  location: string;
  mapLink: string;
  accom_description: string;
  rooms: RoomType[];
}

const venuesData: Record<string, VenueData> = {
  'naka-island': {
    title: 'The Naka Island Luxury Resort',
    subtitle: 'Exclusive Wedding',
    date: '9 December 2026',
    description: 'An intimate private island resort accessible only by speedboat.',
    longDescription:
      'Set against the stunning Andaman Sea, this secluded paradise offers pristine beaches, lush tropical gardens, and world-class luxury — the perfect backdrop for an unforgettable celebration. Accessible only by a short speedboat ride from Ao Por Marina, the island guarantees absolute privacy and an exclusive atmosphere for our most intimate celebration.',
    image: venueNaka,
    galleryImages: [venueNaka],
    location: 'Naka Yai Island, Phuket, Thailand',
    mapLink: 'https://maps.google.com/?q=The+Naka+Island+Luxury+Resort',
    accom_description: "Originally a Six Senses retreat, the resort honors its heritage of ' barefoot luxury ' , defined by space, light, and a seamless connection to the elements through its unique architecture. Each pool villa serves as a private sanctuary nestled within the island's natural contours. Accessible only by the tides, it offers a sophisticated escape where the high standard of service is felt rather than seen, providing a tranquil backdrop for our celebration and for those who find elegance in understated, high-standard hospitality.",
    rooms: [
      { name: 'Naka Guest Room', priceTHB: '12,000', priceEUR: '330', note: 'Garden view', image: nakaRoom },
      { name: '1-Bedroom Suite', priceTHB: '17,000', priceEUR: '470', note: 'Garden view', image: nakaSuite },
      { name: '1-Bedroom Pool Villa Garden', priceTHB: '24,000', priceEUR: '670', note: 'Garden view', image: nakaGarden },
      { name: '1-Bedroom Pool Villa Sea', priceTHB: '32,000', priceEUR: '890', note: 'Sea view', image: nakaSea },
      { name: '1-Bedroom Pool Villa Beach', priceTHB: '39,000', priceEUR: '1080', note: 'Beachfront access', image: nakaBeach },
    ],
  },
  'chomdeun-complex': {
    title: 'Chomdeun Complex',
    subtitle: 'Traditional Wedding',
    date: '19 December 2026 (Morning)',
    description: 'A beautiful traditional Thai venue for sacred rituals and blessings.',
    longDescription:
      'Experience the rich culture and heritage of a classic Thai wedding ceremony surrounded by family and loved ones. The morning will feature traditional Thai rituals including the water blessing ceremony, monk chanting, and the sacred thread ceremony — a deeply meaningful experience steeped in centuries of tradition.',
    image: venueTraditional,
    galleryImages: [venueTraditional],
    location: 'Suphanburi, Thailand',
    mapLink: 'https://maps.google.com/?q=Chomdeun+Complex+Suphanburi',
    accom_description: '',
    rooms: [],
  },
  'sri-uthong-grand': {
    title: 'Sri Uthong Grand Hotel',
    subtitle: 'Official Wedding Reception',
    date: '19 December 2026 (Evening)',
    description: 'The grand venue for the official wedding reception.',
    longDescription:
      'An evening of elegance and joy in the heart of Suphanburi. The grand ballroom will host a lavish dinner celebration featuring live entertainment, heartfelt speeches, and dancing the night away. This is the official reception where family and friends come together for an unforgettable evening of celebration.',
    image: venueGrand,
    galleryImages: [venueGrand],
    location: 'Suphanburi, Thailand',
    mapLink: 'https://maps.google.com/?q=Sri+Uthong+Grand+Hotel+Suphanburi',
    accom_description: 'Room reservation at the wedding hotel during your whole stay in Suphanburi will be handled directly by us as a group reservation. Please kindly let us know your interest.',
    rooms: [
      { name: 'Superior Room', priceTHB: '1,500', priceEUR: '42', note: 'Room including round trip transportation to Bangkok', image: venueGrand },
    ],
  },
};

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const venue = id ? venuesData[id] : undefined;

  const [isBooking, setIsBooking] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const dateOptions = ['17/12/26-20/12/26', '18/12/26-20/12/26'];

  useEffect(() => {
    const syncStatus = async () => {
      const data = await fetchRSVPStatus();
      if (data) {
        setIsBooking(data.is_suphan_hotel || false);
        setSelectedDates(data.suphan_date || null);
      }
    };
    if (id === 'sri-uthong-grand') syncStatus();
  }, [id]);

  const handleBookingToggle = async (wantsToBook: boolean) => {
    setIsSyncing(true);
    try {
      const dateToSave = wantsToBook ? selectedDates : null;
      await updateHotelBooking(wantsToBook, dateToSave);
      setIsBooking(wantsToBook);
      toast.success(wantsToBook ? "Booking requested!" : "Booking removed");
    } catch (err) {
      toast.error("Failed to update booking.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDateSelect = async (range: string) => {
    setSelectedDates(range);
    setIsSyncing(true);
    try {
      await updateHotelBooking(true, range);
      setIsBooking(true);
      toast.success(`Dates updated to ${range}`);
    } catch (err) {
      toast.error("Failed to save dates.");
    } finally {
      setIsSyncing(false);
    }
  };

  if (!venue) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-serif text-xl text-muted-foreground">Venue not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Hero */}
      <div className="relative w-full">
        <img src={venue.image} alt={venue.title} className="w-full h-[45vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-cream" />
        <Link to="/venues" className="absolute top-6 left-4 flex items-center gap-1.5 text-card font-sans text-xs tracking-wide bg-charcoal/40 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-charcoal/60 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All Venues
        </Link>
      </div>

      {/* Header */}
      <motion.div className="px-6 pt-6 pb-4 text-center -mt-12 relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-dark mb-2">{venue.subtitle} · {venue.date}</p>
        <h1 className="font-serif text-3xl text-foreground mb-3">{venue.title}</h1>
        <a href={venue.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-sans text-xs text-gold-dark hover:text-accent transition-colors">
          <MapPin className="w-3.5 h-3.5" /> {venue.location}
        </a>
      </motion.div>

      <div className="max-w-md mx-auto px-5 space-y-8">
        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">{venue.longDescription}</p>
        </motion.div>

        {/* Accommodation Section */}
        {(venue.rooms.length > 0 || venue.accom_description) && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <h2 className="font-serif text-xl text-foreground mb-2">Accommodation</h2>
            
            {/* NEW: Accommodation Description (renders only if text exists) */}
            {venue.accom_description && (
              <p className="font-serif italic text-muted-foreground/90 text-base md:text-lg leading-loose mb-8">
                "{venue.accom_description}"
              </p>
            )}

            {/* Special Rate Section for Naka Island */}
            {id === 'naka-island' && (
              <div className="mb-8 p-6 bg-gold/5 border border-gold/10 rounded-2xl text-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold mb-1">
                  Exclusive Wedding Guest Rate
                </p>
                <p className="font-sans text-[11px] text-muted-foreground italic mb-5">
                  Special pricing from Dec 5th - Dec 13th <br /> 
                  <strong> available until 31th August 2026 </strong>
                </p>
                
                {/* Button Container */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
                  <a 
                    href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1774579103608&key=GRP&app=resvlink&_branch_match_id=1558411020309351715&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5uYmpuaWhgbGZgYVadmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqkW1wYlpiUSYAeTPqPmAAAAA%3D" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center px-5 py-3 bg-gold text-white font-sans text-[9px] uppercase tracking-[0.15em] rounded-full hover:bg-gold-dark transition-all duration-300 shadow-sm active:scale-95 min-w-[160px]"
                  >
                    Reserve Your Stay
                  </a>
                  
                  <a 
                    href="https://www.marriott.com/en-us/hotels/pyxlc-the-naka-island-a-luxury-collection-resort-and-spa-phuket/photos/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center px-5 py-3 bg-gold text-white font-sans text-[9px] uppercase tracking-[0.15em] rounded-full hover:bg-gold-dark transition-all duration-300 shadow-sm active:scale-95 min-w-[160px]"
                  >
                    Naka Island Gallery
                  </a>
                </div>
              </div>
            )}

            {/* Sri Uthong Booking System */}
            {id === 'sri-uthong-grand' && (
              <div className="bg-white/50 border border-gold/20 rounded-xl p-5 shadow-sm space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-sans text-xs font-bold uppercase tracking-wider text-foreground">
                      Room booking?
                    </span>
                    <p className="font-sans text-[10px] text-muted-foreground italic">
                      Interest by 30th June 2026
                    </p>
                  </div>
                  <button 
                    onClick={() => handleBookingToggle(!isBooking)}
                    disabled={isSyncing}
                    className={`px-6 py-2 rounded-full font-sans text-[10px] uppercase tracking-widest transition-all shadow-sm ${
                      isBooking 
                        ? 'bg-gold text-white border-transparent' 
                        : 'border border-gold text-gold hover:bg-gold/5'
                    } ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSyncing ? 'Updating...' : isBooking ? 'Interested ✓' : "I'm Interested"}
                  </button>
                </div>

                <AnimatePresence>
                  {isBooking && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }} 
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pt-4 border-t border-gold/10 overflow-hidden"
                    >
                      <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gold-dark mb-3 font-bold">
                        Preferred Stay Period:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {dateOptions.map((range) => (
                          <button
                            key={range}
                            onClick={() => handleDateSelect(range)}
                            disabled={isSyncing}
                            className={`w-full py-3 px-4 rounded-lg font-sans text-[10px] flex justify-between items-center transition-all border ${
                              selectedDates === range 
                                ? 'bg-gold/10 border-gold text-gold-dark font-bold shadow-inner' 
                                : 'bg-white/40 border-border text-muted-foreground hover:border-gold/30'
                            }`}
                          >
                            {range}
                            {selectedDates === range && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <Check className="w-3 h-3 text-gold" />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-[9px] text-muted-foreground leading-relaxed font-sans uppercase tracking-tight">
                        <strong>Transportation</strong> <br /> 
                        Departure from bkk: <strong>12 PM</strong> on your arrival date<br /> 
                        Return to bkk: <strong>12 PM</strong> on December 20th.<br /><br />
                        * We will contact you closer to the date for confirmation.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* UPDATED: Room Price Cards with Images */}
            <div className="space-y-4">
            {venue.rooms.map((room, i) => (
              <div key={i} className="bg-white border border-border rounded-xl overflow-hidden flex shadow-sm group min-h-[110px]">
                
                {/* Room Image - Changed to 2/5 of the card */}
                <div className="w-2/5 flex-shrink-0 overflow-hidden relative">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                {/* Room Details - Changed to 3/5 of the card */}
                <div className="w-3/5 p-4 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-serif text-sm text-foreground leading-tight">{room.name}</p>
                  </div>
                  {room.note && (
                    <p className="font-sans text-[9px] uppercase tracking-widest text-muted-foreground mb-2">
                      {room.note}
                    </p>
                  )}
                  <div className="flex items-baseline gap-1.5 mt-auto">
                    <span className="font-sans text-sm font-bold text-gold-dark">฿{room.priceTHB}</span>
                    <span className="font-sans text-[10px] text-muted-foreground">/ ~€{room.priceEUR}</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
          </motion.div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default VenueDetail;
