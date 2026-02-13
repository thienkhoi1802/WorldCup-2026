
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
    onSearchClick?: () => void;
    onNavigateHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, onNavigateHome }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 118,
    hours: 13,
    mins: 17,
    secs: 17
  });

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
    <header className="bg-white border-b border-gray-100 py-3 md:py-4">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={onNavigateHome}>
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/2026_FIFA_World_Cup_logo.svg/440px-2026_FIFA_World_Cup_logo.svg.png" 
                alt="FIFA World Cup 2026" 
                className="w-full h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                   e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/10602/10602939.png";
                }}
             />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg md:text-2xl font-black leading-none tracking-tighter uppercase font-sans text-gray-900 group-hover:text-[#9f224e] transition-colors">
              FIFA World Cup 2026™
            </h1>
            <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-[0.2em] group-hover:text-gray-600 transition-colors">
              North America
            </p>
          </div>
        </div>

        {/* Right Section: Countdown + Search */}
        <div className="flex items-center gap-6 xl:gap-8">
          
          {/* Countdown Display - Modern & Light */}
          <div className="hidden lg:flex items-center gap-5">
            {[
               { val: timeLeft.days, label: 'DAYS' },
               { val: timeLeft.hours, label: 'HOURS' },
               { val: timeLeft.mins, label: 'MINS' }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <span className="text-xl font-black leading-none text-gray-900 font-mono tabular-nums">{item.val}</span>
                    <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider mt-0.5">{item.label}</span>
                </div>
            ))}
          </div>

          {/* Vertical Separator */}
          <div className="h-8 w-px bg-gray-100 hidden lg:block"></div>

          {/* Search Bar - Minimalist Pill Style */}
          <div 
            onClick={onSearchClick}
            className="flex items-center gap-3 bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all px-4 py-2.5 rounded-full cursor-pointer w-48 xl:w-64 group"
          >
            <Search className="w-4 h-4 text-gray-400 group-hover:text-[#9f224e]" />
            <span className="text-[13px] text-gray-400 font-medium truncate group-hover:text-gray-800">Tìm kiếm...</span>
            <span className="ml-auto text-[10px] font-bold text-gray-300 hidden xl:inline group-hover:text-gray-400">⌘K</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
