import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitterEffect from './GlitterEffect';
import waxSeal from '@/assets/wax-seal.png';

interface Props {
  onComplete: () => void;
}

const EnvelopeEntrance = ({ onComplete }: Props) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showGlitter, setShowGlitter] = useState(false);

  const handleTap = () => {
    if (isOpening) return;
    setIsOpening(true);
    setShowGlitter(true);
    setTimeout(() => onComplete(), 2200);
  };

  return (
    <AnimatePresence>
      {!isOpening || true ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'hsl(40, 20%, 92%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        >
          <GlitterEffect active={showGlitter} />

          {/* Envelope body */}
          <div className="relative w-[90vw] max-w-[400px] aspect-[3/4]">
            {/* Envelope back */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(40, 25%, 95%) 0%, hsl(38, 20%, 90%) 50%, hsl(40, 25%, 93%) 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 5px 20px rgba(0,0,0,0.08)',
              }}
            />

            {/* Bottom flap */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '55%',
                clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
                background: 'linear-gradient(180deg, hsl(40, 22%, 92%) 0%, hsl(38, 20%, 88%) 100%)',
              }}
            />

            {/* Left flap */}
            <div
              className="absolute top-0 left-0 bottom-0"
              style={{
                width: '52%',
                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                background: 'linear-gradient(90deg, hsl(40, 20%, 91%) 0%, hsl(38, 22%, 89%) 100%)',
              }}
            />

            {/* Right flap */}
            <div
              className="absolute top-0 right-0 bottom-0"
              style={{
                width: '52%',
                clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                background: 'linear-gradient(-90deg, hsl(40, 20%, 91%) 0%, hsl(38, 22%, 89%) 100%)',
              }}
            />

            {/* Top flap (V-flap) - this animates open */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                height: '55%',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: 'linear-gradient(180deg, hsl(38, 22%, 93%) 0%, hsl(40, 25%, 90%) 100%)',
                transformStyle: 'preserve-3d',
                zIndex: 10,
              }}
              animate={isOpening ? { rotateX: -180, opacity: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Wax seal */}
            <motion.button
              className="absolute z-20 cursor-pointer"
              style={{
                top: '42%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90px',
                height: '90px',
              }}
              onClick={handleTap}
              whileHover={!isOpening ? { scale: 1.08 } : {}}
              whileTap={!isOpening ? { scale: 0.95 } : {}}
              animate={isOpening ? { scale: 1.3, opacity: 0, y: -50 } : {}}
              transition={isOpening ? { duration: 0.8 } : { type: 'spring' }}
            >
              <img
                src={waxSeal}
                alt="C | T Wax Seal"
                className="w-full h-full object-contain animate-pulse-glow"
                width={90}
                height={90}
              />
            </motion.button>

            {/* Tap hint */}
            {!isOpening && (
              <motion.p
                className="absolute bottom-8 left-0 right-0 text-center font-serif text-sm tracking-[0.2em] text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                TAP TO OPEN
              </motion.p>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EnvelopeEntrance;
