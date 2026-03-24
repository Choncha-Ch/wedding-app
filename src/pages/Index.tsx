import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountdownTimer from '@/components/CountdownTimer';
import Navigation from '@/components/Navigation';
import couplePortrait from '@/assets/couple-portrait.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream pb-20 relative">
      {/* Full-screen Hero Photo */}
      <div className="relative w-full h-screen">
        <img
          src={couplePortrait}
          alt="Choncha & Timo"
          className="w-full h-full object-cover object-top"
          width={1024}
          height={1536}
        />
        {/* Subtle gradient - top and bottom only */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        {/* Top text */}
        <motion.div
          className="absolute top-12 left-0 right-0 text-center z-10 px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="font-serif text-sm tracking-[0.25em] text-white/80 italic mb-4">
            Together with their loved ones
          </p>

          <h1
            className="text-5xl md:text-7xl text-white mb-1 drop-shadow-lg"
            style={{ fontFamily: "'Great Vibes', 'Pinyon Script', cursive", fontWeight: 400 }}
          >
            Choncha
          </h1>
          <p className="text-2xl text-gold-light mb-1" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>&</p>
          <h1
            className="text-5xl md:text-7xl text-white drop-shadow-lg"
            style={{ fontFamily: "'Great Vibes', 'Pinyon Script', cursive", fontWeight: 400 }}
          >
            Timo
          </h1>
        </motion.div>

        {/* Bottom content */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center z-10 px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="w-16 h-px bg-gold-light mx-auto mb-4" />

          <p className="font-serif text-lg text-white mb-1">
            December 9th, 2026
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-6" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            The Naka Island · Phuket, Thailand
          </p>

          <CountdownTimer />

          <div className="mt-6 space-y-2">
            <p className="font-serif text-sm text-white/70 italic">
              A celebration of love across two cities
            </p>
            <p className="text-xs text-white/50 tracking-wide" style={{ fontFamily: "'Lato', sans-serif" }}>
              Phuket · Suphanburi · December 2026
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/rsvp"
              className="px-8 py-3 rounded-full border border-white/40 text-white text-sm tracking-[0.15em] uppercase backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
            >
              RSVP
            </Link>
            <Link
              to="/activities"
              className="px-8 py-3 rounded-full border border-white/40 text-white text-sm tracking-[0.15em] uppercase backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
            >
              Events
            </Link>
          </div>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
