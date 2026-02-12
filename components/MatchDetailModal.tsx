import React, { useState } from 'react';
import { X, Calendar, MapPin, Share2 } from 'lucide-react';
import { Match } from '../types';
import { MATCH_STATS_MOCK, MATCH_EVENTS_MOCK, MATCH_LINEUPS_MOCK } from '../constants';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
}

const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'stats' | 'lineups'>('stats');

  if (!match) return null;

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-in fade-in zoom-in duration-200">
        
        {/* HEADER: Match Scoreboard */}
        <div className="bg-[#1a1a1a] text-white relative p-6 shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
                <Calendar className="w-3 h-3" />
                {match.date} • {match.round}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <MapPin className="w-3 h-3" />
                {match.stadium || 'Sân vận động quốc gia'}
            </div>
          </div>

          <div className="flex justify-between items-center px-4">
             {/* Home Team */}
             <div className="flex flex-col items-center gap-3 w-1/3">
                <img src={match.homeFlag} alt={match.homeTeam} className="w-16 h-12 object-cover shadow-lg rounded" />
                <span className="text-lg font-bold text-center leading-tight">{match.homeTeam}</span>
             </div>

             {/* Score / Time */}
             <div className="flex flex-col items-center gap-1 w-1/3">
                {match.status === 'finished' ? (
                    <div className="text-4xl font-black tracking-tighter bg-white/10 px-4 py-1 rounded-lg backdrop-blur-md border border-white/10">
                        {match.score}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold font-mono">{match.time}</span>
                        <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider mt-1 animate-pulse">Sắp diễn ra</span>
                    </div>
                )}
             </div>

             {/* Away Team */}
             <div className="flex flex-col items-center gap-3 w-1/3">
                <img src={match.awayFlag} alt={match.awayTeam} className="w-16 h-12 object-cover shadow-lg rounded" />
                <span className="text-lg font-bold text-center leading-tight">{match.awayTeam}</span>
             </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-tight transition-colors ${activeTab === 'events' ? 'bg-white text-[#9f224e] border-b-2 border-[#9f224e]' : 'text-gray-500 hover:text-black'}`}
          >
            Diễn biến
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-tight transition-colors ${activeTab === 'stats' ? 'bg-white text-[#9f224e] border-b-2 border-[#9f224e]' : 'text-gray-500 hover:text-black'}`}
          >
            Thống kê
          </button>
          <button 
            onClick={() => setActiveTab('lineups')}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-tight transition-colors ${activeTab === 'lineups' ? 'bg-white text-[#9f224e] border-b-2 border-[#9f224e]' : 'text-gray-500 hover:text-black'}`}
          >
            Đội hình
          </button>
        </div>

        {/* BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
            {activeTab === 'stats' && (
                <div className="space-y-6">
                    {/* Possession */}
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                            <span>{MATCH_STATS_MOCK.possession[0]}%</span>
                            <span className="uppercase">Kiểm soát bóng</span>
                            <span>{MATCH_STATS_MOCK.possession[1]}%</span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                            <div className="bg-[#9f224e]" style={{ width: `${MATCH_STATS_MOCK.possession[0]}%` }}></div>
                            <div className="bg-gray-800" style={{ width: `${MATCH_STATS_MOCK.possession[1]}%` }}></div>
                        </div>
                    </div>

                    {/* Shots */}
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                            <span>{MATCH_STATS_MOCK.shots[0]} ({MATCH_STATS_MOCK.shotsOnTarget[0]})</span>
                            <span className="uppercase">Dứt điểm (Trúng đích)</span>
                            <span>{MATCH_STATS_MOCK.shots[1]} ({MATCH_STATS_MOCK.shotsOnTarget[1]})</span>
                        </div>
                         <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                            <div className="bg-[#9f224e]" style={{ width: `${(MATCH_STATS_MOCK.shots[0] / (MATCH_STATS_MOCK.shots[0] + MATCH_STATS_MOCK.shots[1])) * 100}%` }}></div>
                            <div className="bg-gray-800 flex-1"></div>
                        </div>
                    </div>
                     {/* Passes */}
                     <div>
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                            <span>{MATCH_STATS_MOCK.passes[0]}</span>
                            <span className="uppercase">Đường chuyền</span>
                            <span>{MATCH_STATS_MOCK.passes[1]}</span>
                        </div>
                         <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                            <div className="bg-[#9f224e]" style={{ width: `${(MATCH_STATS_MOCK.passes[0] / (MATCH_STATS_MOCK.passes[0] + MATCH_STATS_MOCK.passes[1])) * 100}%` }}></div>
                            <div className="bg-gray-800 flex-1"></div>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-center">
                        <p className="text-xs text-yellow-800 font-medium">Dữ liệu được cập nhật theo thời gian thực từ FIFA Data Hub</p>
                    </div>
                </div>
            )}

            {activeTab === 'events' && (
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
                    <div className="space-y-6">
                        {MATCH_EVENTS_MOCK.map((event, idx) => (
                            <div key={idx} className={`flex items-center ${event.team === 'home' ? 'justify-end md:pr-8 flex-row-reverse md:flex-row' : 'justify-start md:pl-8'} relative`}>
                                <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 z-10`}>
                                    {event.time}
                                </div>
                                <div className={`w-[calc(50%-2rem)] flex ${event.team === 'home' ? 'justify-end text-right' : 'justify-start text-left'}`}>
                                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 max-w-[180px]">
                                        <div className="text-sm font-bold text-gray-900">{event.player}</div>
                                        <div className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1">
                                            {event.type === 'goal' && '⚽ Bàn thắng'}
                                            {event.type === 'card-yellow' && <span className="w-3 h-4 bg-yellow-400 rounded-sm inline-block"></span>}
                                            {event.type === 'card-red' && <span className="w-3 h-4 bg-red-600 rounded-sm inline-block"></span>}
                                            {event.type === 'sub' && '🔄 Thay người'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'lineups' && (
                <div className="flex gap-4">
                    <div className="flex-1">
                        <h4 className="text-center font-bold text-[#9f224e] mb-4 text-sm uppercase">{match.homeTeam}</h4>
                        <ul className="space-y-2">
                            {MATCH_LINEUPS_MOCK.home.map((player, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-white rounded border border-gray-100 shadow-sm">
                                    <span className="w-5 text-center text-xs font-bold text-gray-400">{i + 1}</span>
                                    {player}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-center font-bold text-gray-900 mb-4 text-sm uppercase">{match.awayTeam}</h4>
                         <ul className="space-y-2">
                            {MATCH_LINEUPS_MOCK.away.map((player, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-white rounded border border-gray-100 shadow-sm">
                                    <span className="w-5 text-center text-xs font-bold text-gray-400">{i + 12}</span>
                                    {player}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
        
        {/* FOOTER ACTIONS */}
        <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
             <button className="flex items-center gap-2 text-gray-600 hover:text-black text-sm font-medium">
                <Share2 className="w-4 h-4" /> Chia sẻ
             </button>
             <button className="bg-[#9f224e] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#851b40] transition-colors">
                Xem tường thuật chi tiết &rarr;
             </button>
        </div>

      </div>
    </div>
  );
};

export default MatchDetailModal;