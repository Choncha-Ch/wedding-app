import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountdownTimer from '@/components/CountdownTimer';
import Navigation from '@/components/Navigation';
import couplePortrait from '@/assets/couple-pic1.jpg';

const Index = () => {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    // 1. Get the name from localStorage
    const savedName = localStorage.getItem('guest_name');
    if (savedName) setGuestName(savedName);
    
    // 2. Snap to top immediately on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-[#FAF9F6] pb-20 relative overflow-anchor-none" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      /* ADJUSTMENT: Uniform snappy transition. 
         Whether coming from the Reveal Video or RSVP page, 
         this will now always be a clean 0.4s fade.
      */
      transition={{ duration: 0.4, ease: "easeOut" }} 
    >
      {/* Full-screen Hero Photo */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={couplePortrait}
          alt="Choncha & Timo"
          /* Removed scale animation to keep it fast and static */
          className="w-full h-full object-cover object-[center_90%] brightness-75"
          width={1024}
          height={1536}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/70" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-12 px-8 text-center z-10">
          
          {/* Top text */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} 
          >
            {guestName && (
              <p className="font-serif text-sm tracking-[0.25em] text-gold-light italic mb-2 uppercase">
                Welcome, {guestName}
              </p>
            )}
            
            <p className="font-serif text-xs tracking-[0.25em] text-white/60 italic mb-4">
              Together with their loved ones
            </p>

            <h1
              className="text-5xl md:text-7xl text-white mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: "'Great Vibes', 'Pinyon Script', cursive", fontWeight: 400 }}
            >
              Choncha
            </h1>
            <p className="text-2xl text-gold-light mb-1 drop-shadow-md" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>&</p>
            <h1
              className="text-5xl md:text-7xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: "'Great Vibes', 'Pinyon Script', cursive", fontWeight: 400 }}
            >
              Timo
            </h1>
          </motion.div>

          {/* Bottom content */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <CountdownTimer /> 
            </div>

            <p className="font-serif text-lg text-white mb-1">
              December 9th, 2026
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-6 font-light">
              The Naka Island · Phuket, Thailand
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/rsvp"
                className="px-8 py-3 rounded-full border border-white/40 text-white text-sm tracking-[0.15em] uppercase backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
              >
                RSVP
              </Link>
              <Link
                to="/activities"
                className="px-8 py-3 rounded-full border border-white/40 text-white text-sm tracking-[0.15em] uppercase backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
              >
                Events
              </Link>
            </div>

            {/* Sign Out */}
            <div className="mt-4">
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="text-[9px] uppercase tracking-[0.4em] text-white/70 hover:text-gold-light transition-all duration-300 font-sans"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Navigation />
    </motion.div>
  );
};

export default Index;
