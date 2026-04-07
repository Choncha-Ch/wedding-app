import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, HelpCircle, ChevronDown, Map, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';

// Image Imports
import phuketSouthImg from '@/assets/phuketSouthImg.jpeg';
import khaoLakImg from '@/assets/khaoLakImg.jpeg';
import krabiImg from '@/assets/krabiImg.jpeg';
import kohYaoImg from '@/assets/kohYaoImg.jpeg';
import khaoSokImg from '@/assets/khaoSokImg.jpg';
import lantaImg from '@/assets/koh-lanta.jpeg';
import chiangMaiImg from '@/assets/chiangMaiImg.jpeg';

interface DestinationDetail {
  name: string;
  image: string;
  overall: string;
  recommendations: {
    title: string;
    description: string;
  }[];
  luxuryRetreats: string[]; 
  budgetFriendly: string[]; 
}

const hotelRecs = [
  {
    dates: '5th – 7th Dec',
    name: 'The Slate, Nai Yang Beach, Phuket',
    description: 'With 2025 Global Best Luxury Art Hotel & Best Luxury Design in Thailand awards, we recommend The Slate for its unique design that impressively blends Phuket\'s history with Thai architecture providing an authentic and intimate experience. Yet nestled within a Thai village, it offers a serene and local atmosphere unlike other more commercial beaches. Best of all, it is conveniently close to our wedding location!',
  },
  {
    dates: '8th – 10th Dec',
    name: 'The Naka Island, Luxury Resort (Wedding Location)',
    description: 'To fully immerse yourselves in the intimate and exclusive atmosphere of our celebration, we would love for you to stay with us on the private island. However, should you prefer to stay on the Phuket mainland, we have arranged a 24-hour speedboat shuttle for your convenience. The journey is only a 5-minute breeze, so you can return to the mainland whenever you wish, no matter how late the night takes us.',
  },
  {
    dates: '10th - 11th Dec',
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

const travelDestinations: DestinationDetail[] = [
  {
    name: 'Southern Phuket',
    image: phuketSouthImg,
    overall: 'The island\’s most picturesque corner, offering a blend of dramatic cliff views and pristine coastal enclaves. It is the ideal base for those seeking high-end dining and sunset vistas away from the central bustle.',
    recommendations: [
      { 
        title: 'Nai Harn Beach', 
        description: 'Framed by lush green hills, this crescent-shaped bay is widely considered Phuket’s most beautiful beach for its crystal-clear water. It maintains a serene, uncrowded atmosphere perfect for a sophisticated beach day or a sunset picnic by the lagoon.' 
      },
      { 
        title: 'Kata Noi Beach', 
        description: 'A secluded sanctuary of soft white sand that feels worlds away from the busier neighboring tourist hubs. It is home to some of the island’s most exclusive resorts, offering a quiet luxury experience with excellent sunset cocktails.' 
      },
      { 
        title: 'Karon Beach', 
        description: 'This expansive shoreline is famous for its unique "singing sand" that squeaks underfoot due to high silica content. Its vast size ensures you can always find a private spot, while the nearby viewpoint offers the iconic three-bay vista.' 
      }
    ],
    luxuryRetreats: ['The Nai Harn', 'The Shore at Katathani, Kata Noi', 'Avista Grand Phuket Karon'],
    budgetFriendly: ['Katathani Resort, Kata Noi', 'The SIS Kata', 'Stay Wellbeing & Lifestyle Resort, Nai Harn', 'Baan Krathing Phuket Resort, Nai Harn']
  },
  {
    name: 'Khao Lak',
    image: khaoLakImg,
    overall: 'A series of quiet villages and long, golden sand beaches. Ideal for nature lovers and the primary gateway to Thailand\’s most elite diving sites.',
    recommendations: [
      { 
        title: 'Similan Islands', 
        description: 'A breathtaking archipelago featuring the iconic "Sail Rock" and some of the clearest neon-blue waters in Asia. As a protected National Park with limited seasonal access, it offers an exclusive world-class snorkeling experience.' 
      },
      { 
        title: 'Surin Islands', 
        description: 'Famed for being the home of the Moken "Sea Gypsies," these islands boast some of the healthiest coral reefs in the Andaman Sea. It is the ultimate destination for those seeking an untouched, primitive island experience far from the crowds.' 
      }
    ],
    luxuryRetreats: ['Devasom Khao Lak', 'JW Marriott Khao Lak', 'The Little Shore Khao Lak', 'Grand Mercure Khao Lak Bangsak'],
    budgetFriendly: ['Bangsak Village', 'The Waters Khao Lak', 'The Sands Khao Lak']
  },
  {
    name: 'Krabi',
    image: krabiImg,
    overall: 'Famous for its limestone cliffs and world-renowned bays. A paradise for island hoppers and climbers looking for the quintessential Thai landscape.',
    recommendations: [
      { 
        title: 'Railay Beach', 
        description: 'Accessible only by boat, this peninsula is cut off from the mainland by soaring limestone cliffs that glow gold at sunset. It is a car-free paradise where you can explore mystical caves and walk between stunning East and West bays.' 
      },
      { 
        title: 'Phi Phi Island', 
        description: 'The crown jewel of the Andaman, known for the stunning Maya Bay and dramatic vertical cliffs rising directly from the sea. Beyond the lively main pier, the northern beaches offer secluded luxury accessible only by private boat.' 
      },
      { 
        title: 'Racha Island', 
        description: 'Located south of Phuket, this island features powdery white sand and turquoise bays with unmatched water clarity. It offers a much slower pace of life, perfect for a peaceful day trip or a romantic overnight stay.' 
      }
    ],
    luxuryRetreats: ['Rayavadee Railey Beach', 'Phulay Bay a Ritz-Carlton Reserve', 'Banyan Tree Krabi', 'SAii Phi Phi Island Village', 'The Racha, Racha Island'],
    budgetFriendly: ['Venice Villa Resort, Ao Nam Mao Bay', 'Avatar Resort Railey Beach', 'Railey Phutawan Resort', 'Avani Cliff Resort, Ao Nang Bay']
  },
  {
    name: 'Koh Yao Islands',
    image: kohYaoImg,
    overall: 'Step back in time on these twin islands that remain remarkably untouched by mass tourism. They offer a rare glimpse into traditional Thai island life with a backdrop of Phang Nga Bay\’s iconic scenery.',
    recommendations: [
      { 
        title: 'Phang Nga Bay', 
        description: 'This geological wonder is filled with hundreds of limestone islets and hidden "hongs" accessible only by kayak. Navigating these emerald waters at sunrise offers one of the most serene and ethereal experiences in Thailand.' 
      },
      { 
        title: 'Leam Haad (Koh Yao Yai)', 
        description: 'This famous photography spot features a long, curving white sandbar that stretches deep into the sea at low tide. It provides a rare "desert island" feel with 360-degree views of the surrounding turquoise shallows.' 
      }
    ],
    luxuryRetreats: ['Six Senses Koh Yao Noi', 'TreeHouse Villas', 'Koh Yao Island Resort', 'Santhiya Koh Yao Yai'],
    budgetFriendly: ['Paradise Koh Yao', 'Cape Kudu Hotel', 'Koh Yao Yai Village', 'Kunna House']
  }, 
  {
    name: 'Koh Lanta Island',
    image: lantaImg,
    overall: 'Escape to Koh Lanta, where golden sunsets meet a laid-back island soul. Ditch the crowds for pristine beaches, lush jungles, and a world-class diving scene that feels like your own private paradise.',
    recommendations: [
      {
        title: 'Lanta Old Town',
        description: 'This historic village on the east coast features charming wooden stilt houses perched directly over the turquoise sea. It is the perfect spot to discover local handicrafts and enjoy fresh seafood in a peaceful, traditional atmosphere.'
      },
      {
        title: 'Tung Yee Peng Sunrise Boat Tour',
        description: 'Experience the magic of the morning as you glide through tranquil mangrove forests in a traditional wooden gondola. Witness the sky transform into a palette of gold while spotting wild macaques and enjoying a quiet breakfast on the water.'
      },
      {
        title: 'Snorkeling at Koh Rok & Koh Haa',
        description: 'These protected twin islands are world-famous for their crystal-clear visibility and vibrant coral reefs teeming with tropical fish. A speedboat tour to these sites offers some of the best underwater experiences in Thailand, far from the mainland crowds.'
      }
    ],
    luxuryRetreats: ['Pimalai Resort & Spa', 'Layana Resort & Spa'],
    budgetFriendly: ['SriLanta Resort and Spa', 'Navareeya House Seaview']
  }, 
  {
    name: 'Khao Sok',
    image: khaoSokImg,
    overall: 'One of the world\'s oldest rainforests, featuring a massive man-made lake surrounded by prehistoric jungle. It is a destination for those who want to disconnect from the world and reconnect with nature.',
    recommendations: [
      { 
        title: 'Cheow Lan Lake', 
        description: 'A vast reservoir featuring towering limestone peaks that rise 900 meters straight out of the emerald water. Staying in a floating raft house allows you to wake up to the mist rolling over the prehistoric jungle.' 
      },
      { 
        title: 'Khao Sok National Park', 
        description: 'This ancient rainforest is home to rare wildlife like wild elephants and the giant Rafflesia flower. You can explore the jungle via guided trekking or take a peaceful bamboo raft safari down the scenic Sok River.' 
      }
    ],
    luxuryRetreats: ['Khaosok Boutique Camps', '500 Rai Floating Resort', 'Elephant Hills'],
    budgetFriendly: ['Keeree Tara Raft House', 'Phutawan Raft House']
  },
  {
    name: 'Chiang Mai',
    image: chiangMaiImg,
    overall: 'The cultural heart of the North, where ancient city walls meet a vibrant modern arts scene. It offers a cooler climate and a sophisticated blend of mountain adventure and spiritual heritage.',
    recommendations: [
      { 
        title: 'Doi Inthanon', 
        description: 'The highest peak in Thailand, offering refreshing cool weather and stunning views from the Twin Royal Pagodas. The mountain features beautiful nature trails and spectacular waterfalls cascading through the cloud forest.' 
      },
      { 
        title: 'Old Town', 
        description: 'Enclosed by ancient walls, this labyrinth is filled with historic temples, boutique craft shops, and legendary Sunday markets. Walking these streets offers a deep dive into Lanna history and the best traditional Northern cuisine.' 
      },
      { 
        title: 'Golden Temple (Doi Suthep)', 
        description: 'Perched high on a mountain overlooking the city, this is a masterpiece of Lanna architecture and a sacred site. The panoramic views from the terrace at sunset, accompanied by evening chanting, provide a deeply spiritual experience.' 
      }
    ],
    luxuryRetreats: ['Four Seasons Chiang Mai', 'Veranda High Resort', 'Ping Pura Riverside', 'Raya Heritage'],
    budgetFriendly: ['Nampiangdin Boutique Hotel', 'Rim Ping Village', 'Buri Gallery House']
  }
];

const faqs = [
  { q: 'How do I get to Phuket?', a: 'We recommend to fly directly into Phuket International Airport (HKT). Direct flights are available from major cities in Asia and European hubs too.' },
  { q: 'How do I get to Suphanburi?', a: 'Suphanburi is approximately 2 hours north of Bangkok by car. We will arrange group transport from Bangkok for guests on 17th and 18th December at 12:00 o\'clock and a return trip to Bangkok on 20th December at 12:00 o\'clock.' },
  { q: 'What are transportations in Phuket and Suphanburi', a: 'There are taxis on online platform called "Grab". It is like Uber but Asian version. In Suphanburi, there are local taxis or tuktuk too but less common as it is not a touristic province.' },
  { q: 'Do I need a visa for Thailand?', a: 'Most nationalities can enter Thailand visa-free for 30-60 days. Please check with your local Thai embassy.' },
  { q: 'What is the weather like in December?', a: 'Expect warm temperatures around 28-32°C with low humidity and plenty of sunshine.' },
  { q: 'What currency should I bring?', a: 'Thai Baht (THB). Credit cards are accepted at hotels/restaurants with a possible 3% additional charge (please check before paying), but carry cash for local markets. There is also a possibility to connect your bank with Thai PrompPay, where you can simply scan the price QR code for paying like a real Thai. Please carefully research about this option.' },
];

const Travel = () => {
  const [openHotel, setOpenHotel] = useState<number | null>(null);
  const [openTravel, setOpenTravel] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-6 text-center">
        <Plane className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Travel & Info</h1>
        <p className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Your Guide to Thailand
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-10">
        
        {/* SECTION 1: Where to Stay */}
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

          <div className="bg-gold-50 border border-gold-100 rounded-lg p-4 mb-6 flex gap-3 shadow-sm">
            <div>
              <p className="font-sans text-xs text-gold-dark leading-relaxed font-medium">
                <strong>For your onward travels:</strong>
              </p>  
              <p className="font-sans text-xs text-gold-dark leading-relaxed font-medium">
                In December, the Gulf of Thailand (Koh Samui, Koh Phangan, Koh Tao) experiences its peak thunderstorm season, in contrast to Andaman Sea (Phuket, Krabi, Phang Nga). Please review the weather carefully before planning your trip.
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
                      className="px-5 py-5 overflow-hidden"
                    >
                      <div className="font-sans text-[13px] text-muted-foreground space-y-6 leading-relaxed">
                        
                        <p className="italic text-foreground/80 border-l-2 border-gold/40 pl-3">
                          {dest.overall}
                        </p>

                        <div className="space-y-3">
                          <p className="font-bold text-foreground text-xs uppercase tracking-wider">Recommended places to visit:</p>
                          <div className="space-y-2">
                            {dest.recommendations.map((rec, idx) => (
                              <div key={idx}>
                                <span className="font-bold text-foreground/90">{rec.title}:</span> {rec.description}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border/40">
                          <p className="font-bold text-gold-dark text-xs uppercase tracking-wider mb-2">Suggested Luxury Retreats:</p>
                          <ul className="space-y-1">
                            {dest.luxuryRetreats.map((hotel, idx) => (
                              <li key={idx} className="text-foreground/80">• {hotel}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2">
                          <p className="font-bold text-gold-dark text-xs uppercase tracking-wider mb-2">More Budget Friendly:</p>
                          <ul className="space-y-1">
                            {dest.budgetFriendly.map((hotel, idx) => (
                              <li key={idx} className="text-foreground/80">• {hotel}</li>
                            ))}
                          </ul>
                        </div>

                      </div>
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
