import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, HelpCircle, ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';

const hotelRecs = [
  {
    dates: '5th – 7th Dec',
    name: 'The Slate, Nai Yang Beach, Phuket',
    description: 'We recommend The Slate for its unique design that impressively blends Phuket\'s history with Thai architecture providing an authentic and intimate experience. Yet nestled within a Thai village, it offers a serene and local atmosphere unlike other more commercial beaches. Best of all, it is conveniently close to our wedding location!',
  },
  {
    dates: '8th – 10th Dec',
    name: 'The Naka Island, Luxury Resort (Wedding Location)',
    description: 'We would suggest the guests to stay on the private island to experience the full intimate and exclusive atmosphere. However, if the hotel does not satisfy your preference, we do provide a speedboat for 24 HR so that you may remain on the mainland Phuket and take the speedboat anytime you would like to return no matter how late. The boat journey would take only 5 minutes so still convenient. We would recommend to stay in the northern part of Phuket or remain in Nai Yang Beach as the travelling time from Ao Por Marina is only 15-20 minutes by car.',
  },
  {
    dates: '10th Dec',
    name: 'The Naka Island or Southern Phuket',
    description: 'We would remain on the island to recover from the wedding night. However, if you would like to continue with your traveling plan first, we would recommend to head to the southern part of Phuket or in Patong Beach as the next day we will spend our time for the boat party and a night out in Patong area.',
  },
  {
    dates: '11th – 12th Dec',
    name: 'Patong Beach',
    description: 'We would recommend to book a hotel in Patong Beach within a walking distance to both Yona Boat party pier and Illuzion Nightclub as the traffic in Patong is notoriously known for being as bad as in Bangkok.',
  },
  {
    dates: '17th – 20th Dec',
    name: 'Sri Uthong Grand Hotel, Suphanburi',
    description: 'We would recommend staying at the wedding location in Suphanburi. As it is a small town, there are not many options for luxury hospitality. We would survey who would like to stay at this hotel then book it together so no need to worry about making the reservation yet at this point.',
  },
];

const faqs = [
  {
    q: 'How do I get to Phuket?',
    a: 'Fly into Phuket International Airport (HKT). Direct flights are available from most major cities in Asia and many European hubs.',
  },
  {
    q: 'How do I get to Suphanburi?',
    a: 'Suphanburi is approximately 2 hours north of Bangkok by car. We will arrange group transport from Bangkok for guests.',
  },
  {
    q: 'Do I need a visa for Thailand?',
    a: 'Most nationalities can enter Thailand visa-free for 30-60 days. Please check with your local Thai embassy for specific requirements.',
  },
  {
    q: 'What is the weather like in December?',
    a: 'December is part of the dry season in Thailand. Expect warm temperatures around 28-32°C with low humidity and plenty of sunshine.',
  },
  {
    q: 'What currency should I bring?',
    a: 'Thai Baht (THB) is the local currency. Credit cards are widely accepted at hotels and restaurants. ATMs are readily available.',
  },
];

const Travel = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-6 text-center">
        <Plane className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Travel & Info</h1>
        <p className="font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
          Everything you need to know
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-8">
        {/* Hotel Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Hotel className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-foreground">Where to Stay</h2>
          </div>

          <div className="space-y-3">
            {hotelRecs.map((hotel, i) => (
              <motion.div
                key={hotel.dates}
                className="bg-card rounded-lg p-4 border border-border"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-dark mb-1">
                  {hotel.dates}
                </p>
                <h3 className="font-serif text-base text-foreground mb-2">{hotel.name}</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {hotel.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-foreground">FAQ</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card rounded-lg border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left"
                >
                  <span className="font-sans text-sm text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    className="px-4 pb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
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
