import React from 'react';
import { NewsItem, Match } from '../types';
import { Clock, MapPin, ChevronRight, PlayCircle } from 'lucide-react';

interface HomeHeroProps {
  news: NewsItem;
  match: Match;
  onMatchClick: (match: Match) => void;
}

const HomeHero: React.FC<HomeHeroProps> = ({ news, match, onMatchClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. FEATURED NEWS (Left - 8 cols) */}
      <div className="md:col-span-8 group cursor-pointer relative rounded-xl overflow-hidden h-[400px] shadow-sm">
        <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            <span className="inline-block bg-[#9f224e] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider rounded mb-3 shadow-md">
                {news.category}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white font-serif leading-tight mb-3 group-hover:text-gray-200 transition-colors drop-shadow-md">
                {news.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-2xl mb-4 hidden md:block">
                {news.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {news.time}</span>
                <span className="flex items-center gap-1 text-white"><PlayCircle className="w-3 h-3" /> Xem Video</span>
            </div>
        </div>
      </div>

      {/* 2. MATCH CENTER (Right - 4 cols) */}
      <div className="md:col-span-4 flex flex-col h-full gap-4">
         {/* Live/Next Match Card */}
         <div className="flex-1 bg-[#1a1a1a] rounded-xl overflow-hidden relative border border-gray-800 shadow-md flex flex-col">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-transparent"></div>
            
            <div className="relative z-10 p-4 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Trận tâm điểm</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono border border-gray-600 px-1.5 rounded">{match.date}</span>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-4">
                <div className="flex items-center justify-between w-full mb-4 px-2">
                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <img src={match.homeFlag} className="w-14 h-10 object-cover rounded shadow-lg" />
                        <span className="text-sm font-bold text-white text-center leading-tight">{match.homeTeam}</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1 w-1/3">
                        <span className="text-3xl font-black text-white font-mono">{match.time}</span>
                        <span className="text-[9px] text-gray-400 uppercase">Giờ địa phương</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <img src={match.awayFlag} className="w-14 h-10 object-cover rounded shadow-lg" />
                        <span className="text-sm font-bold text-white text-center leading-tight">{match.awayTeam}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-6">
                    <MapPin className="w-3 h-3" />
                    {match.stadium}
                </div>

                <button 
                    onClick={() => onMatchClick(match)}
                    className="w-full bg-[#9f224e] hover:bg-[#851b40] text-white text-xs font-bold py-3 rounded-lg uppercase tracking-wide transition-all shadow-lg hover:shadow-red-900/50 flex items-center justify-center gap-2"
                >
                    Chi tiết trận đấu <ChevronRight className="w-3 h-3" />
                </button>
            </div>
         </div>

         {/* Mini Promo / Trending */}
         <div className="h-[100px] bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-4 flex items-center justify-between relative overflow-hidden group cursor-pointer">
             <div className="relative z-10">
                 <span className="text-[10px] font-bold text-blue-200 uppercase mb-1 block">Khám phá</span>
                 <h3 className="text-white font-bold leading-tight text-sm">Áo đấu chính thức<br/>World Cup 2026</h3>
             </div>
             <img src="https://picsum.photos/100/100?random=99" className="absolute right-0 bottom-0 w-24 h-24 object-contain opacity-80 group-hover:scale-110 transition-transform origin-bottom-right" />
         </div>
      </div>
    </div>
  );
};

export default HomeHero;