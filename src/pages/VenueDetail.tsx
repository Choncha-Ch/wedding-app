import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import venueNaka from '@/assets/naka-island-1.jpeg';
import venueTraditional from '@/assets/chomdeun-pic1.jpeg';
import venueGrand from '@/assets/venue-grand.jpg';

interface TimelineItem {
  time: string;
  label: string;
}

interface RoomType {
  name: string;
  priceTHB: string;
  priceEUR: string;
  note?: string;
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
  timeline: TimelineItem[];
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
    timeline: [
      { time: '3:00 PM', label: 'Guest arrival & welcome drinks' },
      { time: '4:00 PM', label: 'Wedding ceremony on the beach' },
      { time: '5:00 PM', label: 'Sunset cocktail hour' },
      { time: '6:30 PM', label: 'Reception dinner' },
      { time: '8:30 PM', label: 'Cake cutting & toasts' },
      { time: '9:00 PM', label: 'Dancing & celebration' },
      { time: '3:00 AM', label: 'Event concludes' },
    ],
    rooms: [
      { name: 'Tropical Villa', priceTHB: '12,000', priceEUR: '320', note: 'Garden view' },
      { name: 'Beachfront Villa', priceTHB: '18,000', priceEUR: '480', note: 'Direct beach access' },
      { name: 'Pool Villa', priceTHB: '25,000', priceEUR: '670', note: 'Private pool & ocean view' },
      { name: 'Royal Horizon Pool Suite', priceTHB: '35,000', priceEUR: '940', note: 'Premium suite with panoramic views' },
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
    timeline: [
      { time: '9:00 AM', label: 'Monk blessing ceremony' },
      { time: '9:30 AM', label: 'Water pouring ceremony' },
      { time: '10:00 AM', label: 'Sacred thread ceremony' },
      { time: '10:30 AM', label: 'Traditional procession' },
      { time: '11:00 AM', label: 'Family blessing & photos' },
      { time: '12:00 PM', label: 'Traditional Thai lunch' },
    ],
    rooms: [
      { name: 'Sri Uthong Grand Hotel', priceTHB: '2,500', priceEUR: '67', note: 'Recommended nearby hotel' },
    ],
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
    timeline: [
      { time: '5:00 PM', label: 'Doors open & welcome drinks' },
      { time: '6:00 PM', label: 'Grand entrance of the couple' },
      { time: '6:30 PM', label: 'Dinner service begins' },
      { time: '7:30 PM', label: 'Speeches & toasts' },
      { time: '8:00 PM', label: 'Cake cutting ceremony' },
      { time: '8:30 PM', label: 'First dance & open floor' },
      { time: '11:00 PM', label: 'Event concludes' },
    ],
    rooms: [
      { name: 'Superior Room', priceTHB: '1,800', priceEUR: '48', note: 'Standard room' },
      { name: 'Deluxe Room', priceTHB: '2,500', priceEUR: '67', note: 'Upgraded amenities' },
      { name: 'Suite', priceTHB: '4,500', priceEUR: '120', note: 'Premium suite' },
    ],
  },
};

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const venue = id ? venuesData[id] : undefined;

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
        <img
          src={venue.image}
          alt={venue.title}
          className="w-full h-[45vh] object-cover"
          width={1024}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-cream" />
        <Link
          to="/venues"
          className="absolute top-6 left-4 flex items-center gap-1.5 text-card font-sans text-xs tracking-wide bg-charcoal/40 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-charcoal/60 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Venues
        </Link>
      </div>

      {/* Header */}
      <motion.div
        className="px-6 pt-6 pb-4 text-center -mt-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-dark mb-2">
          {venue.subtitle} · {venue.date}
        </p>
        <h1 className="font-serif text-3xl text-foreground mb-3">{venue.title}</h1>
        <a
          href={venue.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-xs text-gold-dark hover:text-accent transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          {venue.location}
        </a>
      </motion.div>

      <div className="max-w-md mx-auto px-5 space-y-8">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {venue.longDescription}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-xl text-foreground">Schedule</h2>
          </div>
          <div className="relative pl-6 border-l border-gold-light/60">
            {venue.timeline.map((item, i) => (
              <div key={i} className="relative pb-5 last:pb-0">
                <div className="absolute -left-[calc(1.5rem+4.5px)] top-1 w-2.5 h-2.5 rounded-full bg-gold border-2 border-cream" />
                <p className="font-sans text-[11px] tracking-wider text-gold-dark uppercase mb-0.5">
                  {item.time}
                </p>
                <p className="font-serif text-sm text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Room Prices */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-serif text-xl text-foreground mb-4">Accommodation</h2>
          <div className="space-y-3">
            {venue.rooms.map((room, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-serif text-sm text-foreground">{room.name}</p>
                  {room.note && (
                    <p className="font-sans text-[10px] text-muted-foreground mt-0.5">{room.note}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-sans text-sm font-medium text-foreground">฿{room.priceTHB}</p>
                  <p className="font-sans text-[10px] text-muted-foreground">~€{room.priceEUR}/night</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default VenueDetail;
