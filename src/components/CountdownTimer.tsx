import { useState, useEffect } from 'react';

const WEDDING_DATE = new Date('2026-12-09T15:00:00+07:00');

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="font-serif text-3xl md:text-4xl text-foreground font-light">
            {String(value).padStart(2, '0')}
          </div>
          <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
