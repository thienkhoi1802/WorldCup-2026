
import React from 'react';
import { UPCOMING_MATCHES } from '../constants';
import { Match } from '../types';
import { ChevronRight, Calendar } from 'lucide-react';

interface UpcomingTickerProps {
  onMatchClick?: (match: Match) => void;
}

const UpcomingTicker: React.FC<UpcomingTickerProps> = ({ onMatchClick }) => {
  const matches = UPCOMING_MATCHES.slice(0, 6);

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
        <h3 className="font-bold text-[#9f224e] uppercase text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Lịch thi đấu sắp tới
        </h3>
        <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors uppercase">
            Xem tất cả <ChevronRight className="w-3 h-3" />
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-gray-200 bg-white shadow-sm rounded-sm overflow-hidden">
         {matches.map((match) => (
             <div 
                key={match.id} 
                onClick={() => onMatchClick && onMatchClick(match)}
                className="flex flex-col gap-3 p-4 border-r border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group relative"
             >
                 {/* Date & Time */}
                 <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {match.date.split(',')[1]?.trim().slice(0, 5)}
                     </span>
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${match.status === 'live' ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600'}`}>
                         {match.status === 'live' ? 'LIVE' : match.time}
                     </span>
                 </div>
                 
                 {/* Teams */}
                 <div className="space-y-2">
                     <div className="flex items-center justify-between gap-2">
                         <div className="flex items-center gap-2 min-w-0">
                            <img src={match.homeFlag} className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm" alt={match.homeTeam} />
                            <span className="text-xs font-bold text-gray-900 truncate group-hover:text-[#9f224e] transition-colors">{match.homeTeam}</span>
                         </div>
                         <span className="text-xs font-bold text-gray-900">{match.score ? match.score.split('-')[0] : '-'}</span>
                     </div>

                     <div className="flex items-center justify-between gap-2">
                         <div className="flex items-center gap-2 min-w-0">
                            <img src={match.awayFlag} className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm" alt={match.awayTeam} />
                            <span className="text-xs font-bold text-gray-900 truncate group-hover:text-[#9f224e] transition-colors">{match.awayTeam}</span>
                         </div>
                         <span className="text-xs font-bold text-gray-900">{match.score ? match.score.split('-')[1] : '-'}</span>
                     </div>
                 </div>

                 {/* Group / Stadium */}
                 <div className="mt-auto pt-2 border-t border-dashed border-gray-100">
                    <span className="text-[9px] font-bold text-gray-400 uppercase truncate block">
                        {match.round}
                    </span>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};

export default UpcomingTicker;
