import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import venueNaka from '@/assets/venue-naka.jpg';
import venueTraditional from '@/assets/venue-traditional.jpg';
import venueGrand from '@/assets/venue-grand.jpg';

const venues = [
  {
    title: 'The Naka Island Luxury Resort',
    subtitle: 'Exclusive Wedding · 9 Dec 2026',
    description: 'An intimate private island resort accessible only by speedboat. Set against the stunning Andaman Sea, this secluded paradise offers pristine beaches, lush tropical gardens, and world-class luxury — the perfect backdrop for an unforgettable celebration.',
    image: venueNaka,
    location: 'Naka Yai Island, Phuket, Thailand',
    mapLink: 'https://maps.google.com/?q=The+Naka+Island+Luxury+Resort',
  },
  {
    title: 'Chomdeun Complex',
    subtitle: 'Traditional Wedding · 19 Dec 2026 (Morning)',
    description: 'A beautiful traditional Thai venue where sacred rituals and blessings will take place. Experience the rich culture and heritage of a classic Thai wedding ceremony surrounded by family and loved ones.',
    image: venueTraditional,
    location: 'Suphanburi, Thailand',
    mapLink: 'https://maps.google.com/?q=Chomdeun+Complex+Suphanburi',
  },
  {
    title: 'Sri Uthong Grand Hotel',
    subtitle: 'Official Wedding Reception · 19 Dec 2026 (Evening)',
    description: 'The grand venue for the official wedding reception featuring a lavish dinner celebration, entertainment, and dancing the night away. An evening of elegance and joy in the heart of Suphanburi.',
    image: venueGrand,
    location: 'Suphanburi, Thailand',
    mapLink: 'https://maps.google.com/?q=Sri+Uthong+Grand+Hotel+Suphanburi',
  },
];

const Venues = () => {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-6 text-center">
        <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Wedding Venues</h1>
        <p className="font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
          Three celebrations, two cities
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-6">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.title}
            className="bg-card rounded-lg overflow-hidden shadow-sm border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <img
              src={venue.image}
              alt={venue.title}
              className="w-full h-48 object-cover"
              loading="lazy"
              width={1024}
              height={768}
            />
            <div className="p-5">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-dark mb-1">
                {venue.subtitle}
              </p>
              <h3 className="font-serif text-xl text-foreground mb-3">{venue.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                {venue.description}
              </p>
              <a
                href={venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-xs tracking-wide text-gold-dark hover:text-accent transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {venue.location}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default Venues;
