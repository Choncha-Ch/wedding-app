import { NavLink } from 'react-router-dom';
import { Home, Heart, CalendarDays, MapPin, Plane, PartyPopper } from 'lucide-react';

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/rsvp', icon: Heart, label: 'RSVP' },
  { to: '/activities', icon: PartyPopper, label: 'Events' },
  { to: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { to: '/venues', icon: MapPin, label: 'Venues' },
  { to: '/travel', icon: Plane, label: 'Travel' },
];

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-cream/95 backdrop-blur-md safe-area-pb">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2 transition-colors ${
                isActive ? 'text-gold-dark' : 'text-muted-foreground'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-sans tracking-wide">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
