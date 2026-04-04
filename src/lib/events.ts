import beachClubImg from '../assets/beach-club.jpg';
import dinnerImg from '../assets/dinner.jpeg';
import cruiseImg from '../assets/cruise.jpeg';
import sundownerImg from '../assets/sundowner.jpeg';
import weddingDayImg from '../assets/couple-pic1.jpg';
import boatPartyImg from '../assets/boat-party.jpeg';
import afterPartyImg from '../assets/after-after-party.jpeg';
import outfitRentalImg from '../assets/couple-pic3.jpg';
import ayutthayaImg from '../assets/ayutthaya.jpeg';
import traditionalWeddingImg from '../assets/thai-couple.jpg';
import officialWeddingImg from '../assets/couple-pic2.jpg';

export interface TimelineItem {
  time: string;
  label: string;
}

export interface EventColor {
  name: string;
  hex: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  imageUrl?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCode?: string;
  priceTHB?: string;
  priceEUR?: string;
  mapLink?: string;
  isWedding?: boolean;
  timeline?: TimelineItem[];
  colors?: EventColor[];
  highlightLines?: string[]; 
}

export const events: WeddingEvent[] = [
  {
    id: 'beach-club',
    title: 'Beach Club Evening',
    imageUrl: beachClubImg,
    date: '5 Dec 2026',
    time: '8:00 PM',
    location: 'MAYA Beach Club',
    description: 'Join us for a relaxed evening at Maya Beach Club, where the golden hour meets the shore. With chilled beats, a gentle sea breeze, and a stylish yet laid-back atmosphere, it\'s the perfect place to unwind. Whether you\'re lounging by the pool or sipping a cocktail on the sand, we look forward to a beautiful night of beachside and little party vibes together.',
    dressCode: 'Smart Casual / Beach Chic',
    priceTHB: '2,000',
    priceEUR: '55',
    mapLink: 'https://maps.google.com/?q=MAYA+Beach+Club+Phuket',
  },
  {
    id: 'dinner',
    title: 'Get Together Dinner',
    imageUrl: dinnerImg,
    date: '6 Dec 2026',
    time: '7:00 PM',
    location: 'The Black Ginger',
    description: 'We propose our first gathering at The Black Ginger, located within The Slate. This award-winning restaurant is a masterpiece of Thai architecture, accessible only by a short, enchanted raft ride across a moonlit lagoon. It will be an evening of authentic Phuket flavors and a stunning introduction to our wedding week in an unforgettable, mystical setting. DO NOT MISS!',
    dressCode: 'Smart Elegant',
    priceTHB: '2,000',
    priceEUR: '55',
    mapLink: 'https://maps.google.com/?q=The+Black+Ginger+Phuket',
    highlightLines: [
        "Bill Bensley\n’s award-winning masterpiece: 2025 Best Most Luxurious Ambience in Asia",
        "The authentic guardian of Phuket\n’s heritage, awarded the Michelin Guide Bib Gourmand."
    ],
  },
  {
    id: 'cruise',
    title: 'Phang Nga Bay Day Cruise',
    imageUrl: cruiseImg,
    date: '7 Dec 2026',
    time: '8:00 AM',
    location: 'Private Cruise',
    description: 'Embark with us on a Private Cruise through the breathtaking wonders of the Andaman Sea. We will spend the day exploring the hidden emerald waters of the famous Hong Lagoon before heading to Phang Nga Bay. As the day draws to a close, we\'ll toast to the sunset from the deck, surrounded by the towering limestone karsts that make this region world-famous.',
    dressCode: 'Swimwear / Casual',
    priceTHB: '3,500',
    priceEUR: '97',
    mapLink: 'https://maps.google.com/?q=Phang+Nga+Bay+Phuket',
    highlightLines: [
        "Discover emerald waters and ancient caves in a UNESCO site of Phang Nga Bay",
        "Iconic limestone towers in James Bond"
    ],
  },
  {
    id: 'sundowner',
    title: 'Sundowner Cocktail Hour',
    imageUrl: sundownerImg,
    date: '8 Dec 2026',
    time: '5:00 PM',
    location: 'Z Bar',
    description: 'Before the big day arrives, let\'s take a moment to breathe and enjoy the view. We absolutely recommend a Sundowner Cocktail at Z Bar, perched on the edge of The Naka Island. With a refreshing drink in hand and a panoramic view of the sunset, it\'s the perfect, serene setting to relax and mingle before our wedding celebration begins.',
    dressCode: 'Resort Chic',
    priceTHB: '1,000',
    priceEUR: '28',
    mapLink: 'https://maps.google.com/?q=Z+Bar+Phuket',
    highlightLines: [
        "Uniting all island guests to unwind & relax together over sunset before we say I do"
    ],
  },
  {
    id: 'wedding-day',
    title: 'Exclusive Wedding Day',
    imageUrl: weddingDayImg,
    date: '9 Dec 2026',
    time: '3:00 PM',
    location: 'The Naka Island Luxury Resort',
    description: 'A journey to the main celebration begins with a short, scenic speedboat ride across the emerald waters to The Naka Island, an exclusive sanctuary where time seems to stand still. We invite you to join us on this private island for a refined, intimate celebration of our love. Surrounded by the gentle whisper of the Andaman Sea and the luxury of this secluded resort, we look forward to sharing an unforgettable evening of elegance and connection with our closest family and friends.',
    dressCode: 'Formal / Black Tie Optional',
    isWedding: true,
    mapLink: 'https://maps.google.com/?q=The+Naka+Island+Luxury+Resort',
    highlightLines: [
        "A five-minute boat crossing to a private island",
        "Timeless elegance at the original Six Senses",
        "Authentic cuisine curated by a Thai Royal Chef"
    ],
    colors: [
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Tiffany Blue', hex: '#0ABAB5' }
    ],
    timeline: [
      { time: '3:00 PM', label: 'The Speed boat leaves Ao Po Marina' },
      { time: '3:10 PM', label: 'Guest arrival at The Naka Island' },
      { time: '3:30 PM', label: 'Welcome drinks at ceremony venue' },
      { time: '4:15 PM', label: 'Wedding ceremony' },
      { time: '5:30 PM', label: 'Sunset pre-dinner drink hour' },
      { time: '7:00 PM', label: 'Reception dinner' },
      { time: '8:30 PM', label: 'Champagne & toasts' },
      { time: '9:00 PM', label: 'First dance & celebration' },
      { time: '11:00 PM', label: 'Indoor party with DJ' },
      { time: '3:00 AM', label: 'Celebration draws to a close' },
    ],
  },
  {
    id: 'boat-party',
    title: 'Boat Party',
    imageUrl: boatPartyImg,
    date: '11 Dec 2026',
    time: '4:00 PM',
    location: 'YONA Boat Party',
    description: 'Prepare for an afternoon of effortless glamour as we take the celebration to the sea. We will be spending an afternoon aboard YONA, the world\'s most iconic floating beach club. Expect a refined yet high-energy atmosphere with 360-degree ocean views, a stylish pool, and sunset beats. It is the perfect way to continue our festivities in the heart of the Andaman Sea—don\'t forget your most chic swimwear!',
    dressCode: 'Party / Swimwear',
    priceTHB: '2,000 - 6,000',
    priceEUR: '55 - 165',
    mapLink: 'https://maps.google.com/?q=YONA+boat+party+Phuket',
    highlightLines: [
        "Experience the world\n’s first floating beach club oasis with 360° views of the Andaman Sea",
        "Effortless poolside glamour with sunset beats"
    ],
  },
  {
    id: 'after-party',
    title: 'After After Party',
    imageUrl: afterPartyImg,
    date: '11 Dec 2026',
    time: '11:00 PM',
    location: 'Illuzion Nightclub',
    description: 'We\'ll keep the energy alive at Illuzion, one of the world\'s top-ranked nightclubs. Experience an electrifying night of high-end entertainment, state-of-the-art sound, and an atmosphere like no other in the heart of Patong. We\'ve reserved a space for our group to celebrate in style—get ready for an unforgettable night of music and dancing as we toast to the new Mr. & Mrs.!',
    dressCode: 'Party',
    priceTHB: '3,000',
    priceEUR: '85',
    mapLink: 'https://maps.google.com/?q=Illuzion+Nightclub+Phuket',
    highlightLines: [
        "Dance at the world\n’s #9 ranked nightclub",
        "Exclusive balcony views of reserved VIP zone",
        "Toast to the Mr. & Mrs."
    ],
  },
  {
    id: 'outfit-rental',
    title: 'Traditional Outfit Rental',
    imageUrl: outfitRentalImg,
    date: '17 Dec 2026',
    time: '3:00 PM',
    location: 'Costume Rental Shop',
    description: 'To celebrate in true local style, we have selected a Dusky Purple theme for our traditional attire. We have arranged for a premium Thai outfit rental service to help you find the perfect ensemble. Whether you prefer a classic Silk Chut Thai or a modern interpretation, our stylists will ensure you look and feel your best in our signature wedding color.',
    dressCode: 'Casual',
    priceTHB: '500',
    priceEUR: '13',
    highlightLines: [
        "Bespoke Thai costume service for authentic participation in the Tradtional Wedding"
    ],
  },
  {
    id: 'ayutthaya',
    title: 'Ayutthaya Day Trip',
    imageUrl: ayutthayaImg,
    date: '18 Dec 2026',
    time: '8:00 AM',
    location: 'Ayutthaya',
    description: 'Step back in time with a journey to the ancient capital of Ayutthaya. Explore the majestic ruins and golden temples that define Thailand’s rich history. For a truly memorable experience, we highly recommend the optional Thai Costume rental—there is no better way to capture the elegance of the temples than in traditional dress. It is a beautiful opportunity for timeless photos in a historic setting.',
    dressCode: 'Comfortable / Traditional Thai',
    priceTHB: '1,000',
    priceEUR: '28',
    mapLink: 'https://maps.google.com/?q=Ayutthaya+Historical+Park',
  },
  {
    id: 'traditional-wedding',
    title: 'Traditional Wedding Day',
    imageUrl: traditionalWeddingImg,
    date: '19 Dec 2026',
    time: '9:00 AM',
    location: 'Chomdeun Complex, Suphanburi',
    description: 'Join us for a morning steeped in heritage as we begin our life together with a Traditional Thai Wedding Ceremony. Experience the vibrant Khan Maak (Engagement Procession), where the groom and his family parade with music and offerings to \'negotiate\' for the bride\'s hand. This joyful, culture-filled ceremony is the heart of our celebration and a beautiful tribute to our roots.',
    dressCode: 'Traditional Thai / Formal',
    isWedding: true,
    mapLink: 'https://maps.google.com/?q=Chomdeun+Complex+Suphanburi',
    highlightLines: [
        "Architectural grace in a heritage teak manor",
        "Experience a joyful Khan Maak procession, an authentic rituals steeped in Thai wedding"
    ],
    colors: [
      { name: 'Dusky Purple', hex: '#99649A' }
    ],
    timeline: [
      { time: '9:00 AM', label: 'Monk blessing ceremony' },
      { time: '9:59 AM', label: 'Khan Mhaak wedding parade' },
      { time: '10:59 AM', label: 'Water blessing ceremony' },
      { time: '12:00 PM', label: 'Traditional Thai lunch' },
    ],
  },
  {
    id: 'official-wedding',
    title: 'Official Wedding Day',
    imageUrl: officialWeddingImg,
    date: '19 Dec 2026',
    time: '5:00 PM',
    location: 'Sri Uthong Grand Hotel, Suphanburi',
    description: 'Following our traditional ceremonies, we invite you to our Official Wedding Celebration. This will be an evening filled with an abundance of Thai food, drinks, and music as we toast to our future together. We look forward to sharing this lively, large-scale celebration with our friends, family, and the many guests joining us—in true Thai fashion! Come prepared to mingle, dance, and truly become \'one of the Thais\' for the night. We can\'t wait to celebrate with all of you',
    dressCode: 'Formal / Black Tie Optional',
    isWedding: true,
    mapLink: 'https://maps.google.com/?q=Sri+Uthong+Grand+Hotel+Suphanburi',
    highlightLines: [
        "A grand celebration, Thai official wedding"
    ],
    colors: [
      { name: 'Burgundy Red', hex: '#800020' },
      { name: 'Olive Green', hex: '#808000' }
    ],
    timeline: [
      { time: '5:00 PM', label: 'Doors open & Guest arrival' },
      { time: '5:30 PM', label: 'Photoshooting with wedding couple' },
      { time: '6:30 PM', label: 'Grand entrance of the couple' },
      { time: '7:00 PM', label: 'Dinner service begins' },
      { time: '7:30 PM', label: 'Speeches & toasts' },
      { time: '8:00 PM', label: 'Cake cutting ceremony' },
      { time: '8:30 PM', label: 'First dance & open floor' },
      { time: '9:00 PM', label: 'Dancing & Celebration' },
      { time: '11:00 PM', label: 'Celebration draws to a close' },
    ],
  },
];
