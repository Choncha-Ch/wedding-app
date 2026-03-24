import { motion } from 'framer-motion';
import CountdownTimer from '@/components/CountdownTimer';
import Navigation from '@/components/Navigation';
import couplePortrait from '@/assets/couple-portrait.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Hero Photo */}
      <div className="relative w-full deckle-edge">
        <img
          src={couplePortrait}
          alt="Choncha & Timo"
          className="w-full h-[60vh] object-cover object-top"
          width={1024}
          height={1536}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/80" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-8 pt-8 pb-12 text-center -mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-serif text-sm tracking-[0.25em] text-muted-foreground italic mb-4">
          Together with their families
        </p>

        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground tracking-wide mb-2">
          CHONCHA
        </h1>
        <p className="font-serif text-2xl text-gold-dark mb-2">&</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground tracking-wide mb-6">
          TIMO
        </h1>

        <div className="w-16 h-px bg-gold mx-auto mb-6" />

        <p className="font-serif text-lg text-foreground mb-1">
          December 9th, 2026
        </p>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
          The Naka Island · Phuket, Thailand
        </p>

        <CountdownTimer />

        <div className="mt-10 space-y-2">
          <p className="font-serif text-sm text-muted-foreground italic">
            A celebration of love across two cities
          </p>
          <p className="font-sans text-xs text-muted-foreground tracking-wide">
            Phuket · Suphanburi · December 2026
          </p>
        </div>
      </motion.div>

      <Navigation />
    </div>
  );
};

export default Index;
