
import React, { useState, useEffect } from 'react';

interface WorldCupBannerProps {
  onViewMatches: () => void;
}

const WorldCupBanner: React.FC<WorldCupBannerProps> = ({ onViewMatches }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 118, hours: 13, mins: 18, secs: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#2b59ff] text-white py-5">
      <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
            <h2 className="text-xl font-black uppercase">FIFA WORLD CUP 2026™</h2>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-4 font-black text-3xl">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
          </div>
          <button onClick={onViewMatches} className="bg-black px-10 py-3 rounded-full font-black">Xem lịch đấu</button>
        </div>
      </div>
    </div>
  );
};

export default WorldCupBanner;
