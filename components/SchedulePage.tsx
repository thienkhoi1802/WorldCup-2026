
import React, { useState } from 'react';
import { UPCOMING_MATCHES } from '../constants';
import { Match } from '../types';
import { ArrowLeft, X, Filter } from 'lucide-react';

interface SchedulePageProps {
  onMatchClick: (match: Match) => void;
  onBack?: () => void;
}

const SchedulePage: React.FC<SchedulePageProps> = ({ onMatchClick, onBack }) => {
  const [activeTab, setActiveTab] = useState('matches');

  // Define Stage Order
  const STAGE_ORDER = [
      'Vòng Bảng',
      'Vòng 1/32',
      'Vòng 1/16',
      'Tứ kết', 
      'Bán kết',
      'Tranh hạng 3',
      'Chung kết'
  ];

  // Helper to normalize round to stage
  const getStage = (round: string): string => {
      if (round.includes('Bảng')) return 'Vòng Bảng';
      if (round.includes('Vòng 1/32')) return 'Vòng 1/32';
      if (round.includes('Vòng 1/16')) return 'Vòng 1/16';
      if (round.includes('Tứ kết')) return 'Tứ kết';
      if (round.includes('Bán kết')) return 'Bán kết';
      if (round.includes('Tranh hạng 3')) return 'Tranh hạng 3';
      if (round.includes('Chung kết')) return 'Chung kết';
      return 'Khác';
  };

  // 1. Group by Stage
  const groupedByStage = UPCOMING_MATCHES.reduce((acc, match) => {
      const stage = getStage(match.round || '');
      if (!acc[stage]) acc[stage] = [];
      acc[stage].push(match);
      return acc;
  }, {} as Record<string, Match[]>);

  // 2. Sort Stages & Within Stage Group by Date
  const orderedStages = STAGE_ORDER.filter(stage => groupedByStage[stage]);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans">
      {/* Dark Header */}
      <div className="bg-[#111] text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 max-w-4xl mx-auto">
           <div className="flex items-center gap-4">
              {onBack && <ArrowLeft className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" onClick={onBack} />}
              <h1 className="text-lg font-bold uppercase tracking-wide">Lịch thi đấu World Cup 2026</h1>
           </div>
           <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-6">
                {['TRẬN ĐẤU', 'SƠ ĐỒ', 'CẦU THỦ', 'BẢNG XẾP HẠNG'].map((tab) => {
                    const isActive = activeTab === 'matches' && tab === 'TRẬN ĐẤU';
                    return (
                        <button
                            key={tab}
                            className={`py-4 text-sm font-bold transition-colors whitespace-nowrap border-b-4 ${isActive ? 'border-[#9f224e] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            {tab}
                        </button>
                    )
                })}
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-8 pb-20">
         
         {orderedStages.map((stage) => {
             const matchesInStage = groupedByStage[stage];
             
             // Group by Date inside Stage
             const matchesByDate = matchesInStage.reduce((acc, match) => {
                 if (!acc[match.date]) acc[match.date] = [];
                 acc[match.date].push(match);
                 return acc;
             }, {} as Record<string, Match[]>);

             // Sort Dates
             const sortedDates = Object.keys(matchesByDate).sort((a, b) => {
                const [d1, m1] = a.split('/').map(Number);
                const [d2, m2] = b.split('/').map(Number);
                return m1 - m2 || d1 - d2;
             });

             return (
                 <div key={stage} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     {/* Stage Header */}
                     <div className="flex items-center gap-3 mb-4 mt-6">
                         <div className="h-6 w-1.5 bg-[#9f224e] rounded-full"></div>
                         <h2 className="text-xl font-black text-gray-900 uppercase font-serif tracking-tight">{stage}</h2>
                         <div className="h-px bg-gray-300 flex-1 ml-2 opacity-50"></div>
                     </div>

                     <div className="space-y-6">
                        {sortedDates.map((date) => (
                            <div key={date}>
                                <div className="sticky top-[110px] z-20 bg-[#f0f2f5]/95 backdrop-blur-sm py-2 mb-2 px-1 border-b border-gray-200/50 w-full flex justify-start">
                                    <span className="text-[#9f224e] text-xs font-bold uppercase tracking-wider bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                                        Ngày {date}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {matchesByDate[date].sort((a,b) => a.time.localeCompare(b.time)).map((match) => (
                                        <div 
                                            key={match.id} 
                                            onClick={() => onMatchClick(match)}
                                            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[#9f224e] transition-all cursor-pointer overflow-hidden group flex flex-col"
                                        >
                                            {/* Header: Venue & Round */}
                                            <div className="bg-gray-50 px-3 py-1.5 flex justify-between items-center text-[10px] text-gray-500 border-b border-gray-100">
                                                <span className="font-bold text-gray-700">{match.round}</span>
                                                <span className="truncate max-w-[120px]">{match.stadium}</span>
                                            </div>

                                            {/* Body: Matchup */}
                                            <div className="p-3 flex items-center justify-between">
                                                {/* Home */}
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <img src={match.homeFlag} className="w-8 h-6 object-cover shadow-sm rounded-[2px]" alt={match.homeTeam}/>
                                                    <span className="text-sm font-bold text-gray-900 truncate">{match.homeTeam}</span>
                                                </div>

                                                {/* Time/Score */}
                                                <div className="px-3 text-center min-w-[60px]">
                                                    <div className="bg-[#1a1a1a] text-white text-xs font-bold px-2 py-1 rounded group-hover:bg-[#9f224e] transition-colors">
                                                        {match.time}
                                                    </div>
                                                </div>

                                                {/* Away */}
                                                <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
                                                    <span className="text-sm font-bold text-gray-900 truncate">{match.awayTeam}</span>
                                                    <img src={match.awayFlag} className="w-8 h-6 object-cover shadow-sm rounded-[2px]" alt={match.awayTeam}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>
             )
         })}
      </div>
    </div>
  );
};

export default SchedulePage;
