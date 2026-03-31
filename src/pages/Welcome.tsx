import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { verifyGuestCode } from '@/lib/rsvp-service';
import { toast } from 'sonner';

// Assets
import welcomeVideo from '@/assets/welcome_bg.mp4'; 
import revealVideo from '@/assets/hotel-reveal.mp4'; 
import weddingSeal from '@/assets/wedding-seal.png';

const Welcome = () => {
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Ref to manually trigger the video play if the browser stalls
  const revealVideoRef = useRef<HTMLVideoElement>(null);

  const enterApp = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  // Logic to handle verification and the subsequent delay
  const performVerification = useCallback(async (inputCode: string) => {
    if (loading || isVerified) return;
    setLoading(true);
    try {
      const result = await verifyGuestCode(inputCode.toUpperCase().trim());
      if (result.success && result.data) {
        setGuestName(result.data.guest_name);
        localStorage.setItem('guest_name', result.data.guest_name);
        setIsVerified(true);
        
        // Luxury timing: Show the personalized welcome for 3.8s
        setTimeout(() => {
          setShowReveal(true);
        }, 3800);
      } else {
        toast.error("Invalid code.");
        setCode(''); 
      }
    } catch (err) {
      toast.error("Connection error.");
    } finally {
      setLoading(false);
    }
  }, [loading, isVerified]);

  useEffect(() => {
    if (code.length === 6) performVerification(code);
  }, [code, performVerification]);

  // FORCE PLAY EFFECT: This is the fix for the "frozen" first frame
  useEffect(() => {
    if (showReveal && revealVideoRef.current) {
      const playPromise = revealVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented, retrying with mute...", error);
          // If it fails, we force mute and try again
          if (revealVideoRef.current) {
            revealVideoRef.current.muted = true;
            revealVideoRef.current.play();
          }
        });
      }
    }
  }, [showReveal]);

  // Luxury easing curve for the greeting wash-in
  const luxuryEase = [0.25, 1, 0.5, 1]; 

  return (
    <div className="relative min-h-screen w-full bg-black">
      <AnimatePresence mode="wait">
        {!showReveal ? (
          <motion.div 
            key="welcome-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }} 
            className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-black"
          >
            {/* Background Video 1 */}
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
              <source src={welcomeVideo} type="video/mp4" />
            </video>
            
            <div className="relative z-10 pt-15 flex flex-col items-center text-center px-8">
              <img src={weddingSeal} className="w-32 h-32 md:w-44 md:h-44 mb-10 opacity-90" alt="Seal" />
              
              <AnimatePresence mode="wait">
                {!isVerified ? (
                  <motion.div 
                    key="input-form" 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Thicker, Luxury Spaced Heading */}
                    <p className="text-gold text-[12px] md:text-sm uppercase tracking-[0.4em] font-medium mb-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] filter brightness-110">
                      Enter Secret Code
                    </p>
                    <input 
                      value={code} 
                      autoFocus
                      maxLength={6}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className="bg-transparent border-b-2 border-gold/60 text-center text-4xl font-serif text-gold tracking-[0.4em] outline-none w-full max-w-[280px] pb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] transition-all focus:border-gold" 
                      placeholder="••••••"
                    />
                  </motion.div>
                ) : (
                  /* Slow, Luxury Greeting Fade-In */
                  <motion.div 
                    key="welcome-greeting" 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1.8,  
                      ease: luxuryEase as any,
                      delay: 0.2     
                    }}
                  >
                    <h2 className="text-4xl md:text-5xl text-white font-serif leading-tight mb-4">
                      Welcome <br /> 
                      <span className="block mt-2 italic text-gold-light">{guestName}</span>
                    </h2>
                    <p className="text-gold italic font-serif text-xl tracking-wide">
                      You are wholeheartedly invited
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Reveal Video 2 - Forced Autoplay with Ref */}
            <video 
              ref={revealVideoRef}
              autoPlay 
              muted 
              playsInline 
              onEnded={enterApp} 
              className="w-full h-full object-cover"
              preload="auto"
            >
              <source src={revealVideo} type="video/mp4" />
            </video>
            
           <button 
            onClick={enterApp} 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 text-[8px] uppercase tracking-[0.5em] transition-all duration-500 z-[70]"
          >
            Skip Reveal
          </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;