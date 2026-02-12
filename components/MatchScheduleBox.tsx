
import React, { useState } from 'react';
import { UPCOMING_MATCHES } from '../constants';
import { Match } from '../types';

interface MatchScheduleBoxProps {
    onMatchClick?: (match: Match) => void;
}

const MatchScheduleBox: React.FC<MatchScheduleBoxProps> = ({ onMatchClick }) => {
  const [activeTab, setActiveTab] = useState<'12/06' | '13/06' | '14/06'>('12/06');

  // Filter matches based on specific dates from new dataset
  const getMatches = () => {
    return UPCOMING_MATCHES.filter(m => m.date === activeTab);
  };

  const matches = getMatches();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-[400px]">
      <div className="bg-[#9f224e] px-4 py-3 flex items-center justify-between shrink-0">
        <h3 className="text-white font-bold text-sm uppercase font-serif tracking-wide">Lịch thi đấu WC 2026</h3>
        <a href="#" className="text-xs text-white/80 hover:text-white font-medium border border-white/30 px-2 py-0.5 rounded">Chi tiết</a>
      </div>

      {/* TABS */}
      <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
         <button 
            onClick={() => setActiveTab('12/06')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-tight text-center transition-colors ${activeTab === '12/06' ? 'bg-white text-[#9f224e] border-b-2 border-[#9f224e]' : 'text-gray-500 hover:text-gray-700'}`}
         >
            12/06
         </button>
         <button 
            onClick={() => setActiveTab('13/06')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-tight text-center transition-colors ${activeTab === '13/06' ? 'bg-white text-[#9f224e] border-b-2 border-[#9f224e]' : 'text-gray-500 hover:text-gray-700'}`}
         >
            13/06
         </button>
         <button 
            onClick={() => setActiveTab('14/06')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-tight text-center transition-colors ${activeTab === '14/06' ? 'bg-white text-[#9f224e] border-b-2 border-[#9f224e]' : 'text-gray-500 hover:text-gray-700'}`}
         >
            14/06
         </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
        {matches.length > 0 ? (
          <div className="flex flex-col gap-0 divide-y divide-gray-100">
            {matches.map((match) => (
              <div 
                key={match.id} 
                onClick={() => onMatchClick && onMatchClick(match)}
                className="py-4 px-4 hover:bg-gray-50 transition-colors cursor-pointer group"
               >
                <div className="flex justify-between items-center mb-3">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{match.round}</span>
                   {match.status === 'finished' ? (
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">FT</span>
                   ) : (
                       <span className="text-[10px] font-bold text-white bg-black px-1.5 py-0.5 rounded">{match.time}</span>
                   )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center gap-1 w-4/12">
                    <img src={match.homeFlag} alt={match.homeTeam} className="w-8 h-6 object-cover shadow-sm rounded-[2px]" />
                    <span className="text-[12px] font-bold text-gray-900 text-center leading-tight">{match.homeTeam}</span>
                  </div>
                  
                  <div className="w-3/12 text-center pt-1">
                      {match.status === 'finished' ? (
                          <div className="text-xl font-black text-gray-800 tracking-tighter bg-gray-100 rounded px-1">{match.score}</div>
                      ) : (
                          <div className="text-sm font-black text-gray-300 font-serif italic">VS</div>
                      )}
                  </div>
                  
                  <div className="flex flex-col items-center gap-1 w-4/12">
                    <img src={match.awayFlag} alt={match.awayTeam} className="w-8 h-6 object-cover shadow-sm rounded-[2px]" />
                    <span className="text-[12px] font-bold text-gray-900 text-center leading-tight">{match.awayTeam}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
            <span className="text-2xl mb-2">📅</span>
            <p className="text-sm">Không có trận đấu nào</p>
          </div>
        )}
      </div>
      
      {activeTab === '12/06' && (
         <div className="bg-green-50 border-t border-green-100 p-2 text-center">
            <span className="text-[10px] text-green-700 font-bold flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                Khai mạc World Cup 2026
            </span>
         </div>
      )}
    </div>
  );
};

export default MatchScheduleBox;
