import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, HelpCircle, ChevronDown, Map, AlertTriangle, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';

// Image Imports
import phuketSouthImg from '@/assets/phuketSouthImg.jpeg';
import khaoLakImg from '@/assets/khaoLakImg.jpeg';
import krabiImg from '@/assets/krabiImg.jpeg';
import kohYaoImg from '@/assets/kohYaoImg.jpeg';
import khaoSokImg from '@/assets/khaoSokImg.jpg';
import chiangMaiImg from '@/assets/chiangMaiImg.jpeg';

const hotelRecs = [
  {
    dates: '5th – 7th Dec',
    name: 'The Slate, Nai Yang Beach, Phuket',
    description: 'We recommend The Slate for its unique design that impressively blends Phuket\'s history with Thai architecture providing an authentic and intimate experience. Yet nestled within a Thai village, it offers a serene and local atmosphere unlike other more commercial beaches. Best of all, it is conveniently close to our wedding location!',
  },
  {
    dates: '8th – 10th Dec',
    name: 'The Naka Island, Luxury Resort (Wedding Location)',
    description: 'To fully immerse yourselves in the intimate and exclusive atmosphere of our celebration, we would love for you to stay with us on the private island. However, should you prefer to stay on the Phuket mainland, we have arranged a 24-hour speedboat shuttle for your convenience. The journey is only a 5-minute breeze, so you can return to the mainland whenever you wish, no matter how late the night takes us.',
  },
  {
    dates: '10th Dec',
    name: 'The Naka Island or Southern Phuket',
    description: 'We will be staying on the island a little longer to soak in the memories and recover from the festivities. If you are ready to kick off the next leg of your journey, we suggest heading toward Patong or Southern Phuket. We will be reuniting there the following day for a boat party!',
  },
  {
    dates: '11th – 12th Dec',
    name: 'Patong Beach',
    description: 'For the liveliest experience, we recommend booking a hotel in Patong Beach within walking distance of both the Yona boat pier and Illuzion Nightclub. Patong traffic is infamously horrible, so staying where you can reach on foot is a major win.',
  },
  {
    dates: '17th – 20th Dec',
    name: 'Sri Uthong Grand Hotel, Suphanburi',
    description: 'For our time in Suphanburi, we recommend staying with us at the wedding hotel. As it is a small town, boutique luxury options are limited. We will be handling the group reservation ourselves. Just let us know if you would like to join us!',
  },
];

const travelDestinations = [
  {
    name: 'Southern Phuket',
    image: phuketSouthImg,
    description: 'Home to the iconic Promthep Cape and Rawai Beach. Perfect for those who want a mix of local seafood markets, exotic beaches like Nai Harn. The location is also easier for southern island hopping like Phi Phi island or Racha island. Recommended hotels are The Nai Harn & The Shore Katathani.'
  },
  {
    name: 'Khao Lak',
    image: khaoLakImg,
    description: 'A series of quiet villages and long, golden sand beaches. Ideal for nature lovers and the main gateway to the world-class diving and snorkeling at the Similan Islands and Surin Island. Recommended hotel is Devasom Khao Lak.'
  },
  {
    name: 'Krabi',
    image: krabiImg,
    description: 'Famous for its limestone cliffs and Railay Beach. A must-visit for rock climbers and island hoppers looking to explore the Phi Phi islands, Hong lagoon or the "Four Islands" tour. Recommended hotels are Rayavadee, Phulay Bay a Ritz-Carlton Reserve & Banyan Tree Krabi.'
  },
  {
    name: 'Koh Yao Islands',
    image: kohYaoImg,
    description: 'Step back in time on Koh Yao Noi or Koh Yao Yai. These islands offer a peaceful escape with traditional fishing villages, rice paddies, and stunning views of Phang Nga Bay. Recommended hotels are Six Senses Koh Yao Noi, TreeHouse Villas & Santhiya Koh Yao Yai.'
  }, 
  {
    name: 'Khao Sok',
    image: khaoSokImg,
    description: 'For a true escape into nature, we recommend Khao Sok National Park. This breathtaking destination offers the best of both worlds: adventurous trekking through one of the world\'s oldest rainforests and total relaxation on a floating hut atop the immense, emerald waters of Cheow Lan Dam. It is an unforgettable experience. Recommended hotels are Khaosok Boutique Camps, Phutawan Raft House & Keeree Tara Raft House.'
  },
  {
    name: 'Chiang Mai',
    image: chiangMaiImg,
    description: 'The cultural heart of the North. Explore hundreds of ancient temples, incredible night markets, and lush mountains. Perfect for cooler weather and elephant sanctuaries. Recommended hotel is Four Seasons Chiangmai & Veranda High Resort.'
  }
];

const faqs = [
  { q: 'How do I get to Phuket?', a: 'We recommend to fly directly into Phuket International Airport (HKT). Direct flights are available from major cities in Asia and European hubs too.' },
  { q: 'How do I get to Suphanburi?', a: 'Suphanburi is approximately 2 hours north of Bangkok by car. We will arrange group transport from Bangkok for guests.' },
  { q: 'Do I need a visa for Thailand?', a: 'Most nationalities can enter Thailand visa-free for 30-60 days. Please check with your local Thai embassy.' },
  { q: 'What is the weather like in December?', a: 'Expect warm temperatures around 28-32°C with low humidity and plenty of sunshine.' },
  { q: 'What currency should I bring?', a: 'Thai Baht (THB). Credit cards are accepted at hotels/restaurants, but carry cash for markets.' },
];

const Travel = () => {
  const [openHotel, setOpenHotel] = useState<number | null>(null);
  const [openTravel, setOpenTravel] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 text-center">
        <Plane className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Travel & Info</h1>
        <p className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Your Guide to Thailand
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-10">
        
        {/* SECTION 1: Where to Stay (Collapsible) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Hotel className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-foreground">Where to Stay</h2>
          </div>
          <div className="space-y-3">
            {hotelRecs.map((hotel, i) => (
              <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setOpenHotel(openHotel === i ? null : i)}
                  className="w-full px-4 py-4 text-left flex justify-between items-center"
                >
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gold-dark mb-1">{hotel.dates}</p>
                    <h3 className="font-serif text-sm text-foreground">{hotel.name}</h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openHotel === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openHotel === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 overflow-hidden"
                    >
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                        {hotel.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Where to Travel (New Section) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-foreground">Where to Travel</h2>
          </div>

          {/* Warning Box */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 flex gap-3 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <p className="font-sans text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Safety Warning</p>
              <p className="font-sans text-xs text-red-800 leading-relaxed font-medium">
                <strong>DO NOT CROSS BORDERS.</strong> <br /> 
                While Thailand remains a very safe and beautiful destination, we kindly ask our guests to avoid traveling across the borders, especially to Cambodia or Myanmar due to an alarming number of human trafficking cases linked to scam operations along these border regions. 
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {travelDestinations.map((dest, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenTravel(openTravel === i ? null : i)}
                  className="w-full text-left"
                >
                  <div className="relative h-32 w-full">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <h3 className="font-serif text-white text-lg drop-shadow-md">{dest.name}</h3>
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30">
                        <ChevronDown className={`w-4 h-4 text-white transition-transform ${openTravel === i ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {openTravel === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 py-4 overflow-hidden"
                    >
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed italic border-l-2 border-gold pl-3">
                        {dest.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FAQ */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-foreground">FAQ</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left"
                >
                  <span className="font-sans text-sm text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-3 overflow-hidden"
                    >
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/30">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Navigation />
    </div>
  );
};

export default Travel;
