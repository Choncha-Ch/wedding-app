import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { events } from '@/lib/events';
import { getAcceptedEvents } from '@/lib/storage';

const dates = Array.from({ length: 16 }, (_, i) => {
  const d = new Date(2026, 11, 5 + i);
  return {
    day: d.getDate(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    full: `${d.getDate()} Dec 2026`,
  };
});

const Calendar = () => {
  const [accepted] = useState(getAcceptedEvents());

  const getEventsForDay = (day: number) => {
    return events.filter(e => {
      const match = e.date.match(/(\d+)\s+Dec/);
      return match && parseInt(match[1]) === day;
    }).filter(e => e.isWedding || accepted.includes(e.id));
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-6 pt-10 pb-6 text-center">
        <CalendarDays className="w-8 h-8 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Your Calendar</h1>
        <p className="font-sans text-xs tracking-[0.15em] text-muted-foreground uppercase">
          December 5 – 20, 2026
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-1">
        {dates.map((date, i) => {
          const dayEvents = getEventsForDay(date.day);
          return (
            <motion.div
              key={date.day}
              className="flex gap-4 py-3 border-b border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <div className="w-14 text-center flex-shrink-0">
                <div className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                  {date.weekday}
                </div>
                <div className="font-serif text-2xl text-foreground">{date.day}</div>
              </div>
              <div className="flex-1 space-y-1.5 pt-1">
                {dayEvents.length > 0 ? (
                  dayEvents.map(ev => (
                    <div
                      key={ev.id}
                      className={`px-3 py-2 rounded-md text-xs font-sans ${
                        ev.isWedding
                          ? 'bg-primary/15 text-foreground border border-gold/30'
                          : 'bg-sage/15 text-foreground'
                      }`}
                    >
                      <span className="font-medium">{ev.time}</span> · {ev.title}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground font-sans italic pt-1">Free day</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Navigation />
    </div>
  );
};

export default Calendar;
