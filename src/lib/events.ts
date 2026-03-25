import beachClubImg from '../assets/beach-club.jpg';
import dinnerImg from '../assets/dinner.jpeg';
import cruiseImg from '../assets/cruise.jpeg';
import sundownerImg from '../assets/sundowner.jpeg';
import weddingDayImg from '../assets/couple-pic1.jpg';
import boatPartyImg from '../assets/boat-party.jpeg';
import afterPartyImg from '../assets/after-after-party.jpeg';
import outfitRentalImg from '../assets/couple-pic3.jpg';
import ayutthayaImg from '../assets/ayutthaya.jpeg';
import traditionalWeddingImg from '../assets/couple-pic3.jpg';
import officialWeddingImg from '../assets/couple-pic2.jpg';

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
}

export const events: WeddingEvent[] = [
  {
    id: 'beach-club',
    title: 'Beach Club Evening',
    imageUrl: beachClubImg,
    date: '5 Dec 2026',
    time: '8:00 PM',
    location: 'MAYA Beach Club',
    description: 'Start our time in Phuket enjoying the show and fun, chill vibe with fire, music & sand.',
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
    description: 'Experience an extraordinary night with award-winning Thai food set over a candle-lit, glowing lagoon.',
    dressCode: 'Smart Elegant',
    priceTHB: '2,000',
    priceEUR: '55',
    mapLink: 'https://maps.google.com/?q=The+Black+Ginger+Phuket',
  },
  {
    id: 'cruise',
    title: 'Phang Nga Bay Day Cruise',
    imageUrl: cruiseImg,
    date: '7 Dec 2026',
    time: '8:00 AM',
    location: 'Private Cruise',
    description: 'Enjoy the sunshine, crystal-clear water, and the underwater world before watching the sunset over a unique limestone bay.',
    dressCode: 'Swimwear / Casual',
    priceTHB: '3,500',
    priceEUR: '97',
    mapLink: 'https://maps.google.com/?q=Phang+Nga+Bay+Phuket',
  },
  {
    id: 'sundowner',
    title: 'Sundowner Cocktail Hour',
    imageUrl: sundownerImg,
    date: '8 Dec 2026',
    time: '5:00 PM',
    location: 'Z Bar',
    description: 'Relax over sundowner cocktails with friends at a bar known for the most dramatic sunset.',
    dressCode: 'Resort Chic',
    priceTHB: '1,000',
    priceEUR: '28',
    mapLink: 'https://maps.google.com/?q=Z+Bar+Phuket',
  },
  {
    id: 'wedding-day',
    title: 'Wedding Day',
    imageUrl: weddingDayImg,
    date: '9 Dec 2026',
    time: '3:00 PM',
    location: 'The Naka Island Luxury Resort',
    description: 'The main event! Join us as Choncha & Timo tie the knot in an intimate island ceremony.',
    dressCode: 'Formal / Black Tie Optional',
    isWedding: true,
    mapLink: 'https://maps.google.com/?q=The+Naka+Island+Luxury+Resort',
  },
  {
    id: 'boat-party',
    title: 'Boat Party',
    imageUrl: boatPartyImg,
    date: '11 Dec 2026',
    time: '4:00 PM',
    location: 'YONA Boat Party',
    description: 'After a rest day, we will slowly start our fun time floating in the Andaman Ocean.',
    dressCode: 'Party / Swimwear',
    priceTHB: '2,000 - 6,000',
    priceEUR: '55 - 165',
    mapLink: 'https://maps.google.com/?q=YONA+boat+party+Phuket',
  },
  {
    id: 'after-party',
    title: 'After After Party',
    imageUrl: afterPartyImg,
    date: '11 Dec 2026',
    time: '11:00 PM',
    location: 'Illuzion Nightclub',
    description: 'Continue our party in full swing at a world-famous club on Bangla Road.',
    dressCode: 'Party',
    priceTHB: '3,000',
    priceEUR: '85',
    mapLink: 'https://maps.google.com/?q=Illuzion+Nightclub+Phuket',
  },
  {
    id: 'outfit-rental',
    title: 'Traditional Outfit Rental',
    imageUrl: outfitRentalImg,
    date: '17 Dec 2026',
    time: '2:00 PM',
    location: 'Costume Rental Shop',
    description: 'Visit a costume rental shop to try on traditional Thai outfits for the morning wedding.',
    dressCode: 'Casual',
    priceTHB: '500',
    priceEUR: '13',
  },
  {
    id: 'ayutthaya',
    title: 'Ayutthaya Day Trip',
    imageUrl: ayutthayaImg,
    date: '18 Dec 2026',
    time: '8:00 AM',
    location: 'Ayutthaya',
    description: 'Take a day trip to the ancient capital of Thailand and visit the temples in traditional Thai costumes (if you wish).',
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
    description: 'A beautiful traditional Thai wedding ceremony with all the sacred rituals and blessings.',
    dressCode: 'Traditional Thai / Formal',
    isWedding: true,
    mapLink: 'https://maps.google.com/?q=Chomdeun+Complex+Suphanburi',
  },
  {
    id: 'official-wedding',
    title: 'Official Wedding Day',
    imageUrl: officialWeddingImg,
    date: '19 Dec 2026',
    time: '5:00 PM',
    location: 'Sri Uthong Grand Hotel, Suphanburi',
    description: 'The grand official wedding reception and celebration with dinner, drinks, and dancing.',
    dressCode: 'Formal / Black Tie Optional',
    isWedding: true,
    mapLink: 'https://maps.google.com/?q=Sri+Uthong+Grand+Hotel+Suphanburi',
  },
];
