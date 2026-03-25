import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import venueNaka from '@/assets/naka-island-1.jpeg';
import venueTraditional from '@/assets/chomdeun-pic1.jpeg';
import venueGrand from '@/assets/venue-grand.jpg';

const venues = [
  {
    id: 'naka-island',
    title: 'The Naka Island Luxury Resort',
    subtitle: 'Exclusive Wedding · 9 Dec 2026',
    image: venueNaka,
    location: 'Naka Yai Island, Phuket',
  },
  {
    id: 'chomdeun-complex',
    title: 'Chomdeun Complex',
    subtitle: 'Traditional Wedding · 19 Dec 2026 (Morning)',
    image: venueTraditional,
    location: 'Suphanburi, Thailand',
  },
  {
    id: 'sri-uthong-grand',
    title: 'Sri Uthong Grand Hotel',
    subtitle: 'Official Reception · 19 Dec 2026 (Evening)',
    image: venueGrand,
    location: 'Suphanburi, Thailand',
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

      <div className="max-w-md mx-auto px-4 space-y-5">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/venues/${venue.id}`}
              className="block bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group"
            >
              <img
                src={venue.image}
                alt={venue.title}
                className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
                width={1024}
                height={768}
              />
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-dark mb-1">
                    {venue.subtitle}
                  </p>
                  <h3 className="font-serif text-lg text-foreground mb-1">{venue.title}</h3>
                  <span className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {venue.location}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gold-dark flex-shrink-0" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default Venues;
