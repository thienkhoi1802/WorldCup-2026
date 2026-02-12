import React from 'react';
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
    onSearchClick?: () => void;
    onNavigateHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, onNavigateHome }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 shadow-sm relative z-20">
      <div className="max-w-[1140px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
           {/* Mobile Menu Trigger */}
           <button className="md:hidden text-gray-600 hover:text-black">
              <Menu className="w-6 h-6" />
           </button>

          <div className="flex flex-col cursor-pointer group" onClick={onNavigateHome}>
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-[#9f224e] rounded flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm transform -skew-x-6 group-hover:rotate-3 transition-transform">
                WC26
              </div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 font-serif group-hover:text-[#9f224e] transition-colors">World Cup 2026</h1>
            </div>
            <p className="hidden md:block text-xs text-gray-500 mt-1 font-bold tracking-widest uppercase">
              Cổng thông tin bóng đá số 1 Việt Nam
            </p>
          </div>
        </div>
        
        {/* Right Side: Search & Countdown */}
        <div className="flex items-center gap-6">
            {/* Search Icon */}
            <button 
                onClick={onSearchClick}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black transition-colors"
                title="Tìm kiếm (Ctrl+K)"
            >
                <Search className="w-4 h-4" />
            </button>

            {/* Countdown Timer */}
            <div className="flex flex-col items-end">
                <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Kick-off Countdown</span>
                <div className="flex gap-1.5 text-center">
                    <div className="bg-[#1a1a1a] text-white rounded px-1.5 py-1 min-w-[32px] md:min-w-[40px]">
                        <span className="block text-sm md:text-lg font-bold leading-none font-mono">354</span>
                        <span className="text-[8px] text-gray-400 uppercase">Ngày</span>
                    </div>
                    <div className="bg-gray-100 text-gray-900 rounded px-1.5 py-1 min-w-[32px] md:min-w-[40px] border border-gray-200">
                        <span className="block text-sm md:text-lg font-bold leading-none font-mono">12</span>
                        <span className="text-[8px] text-gray-500 uppercase">Giờ</span>
                    </div>
                     <div className="hidden md:block bg-gray-100 text-gray-900 rounded px-1.5 py-1 min-w-[40px] border border-gray-200">
                        <span className="block text-lg font-bold leading-none font-mono">45</span>
                        <span className="text-[8px] text-gray-500 uppercase">Phút</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;