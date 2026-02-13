
import React, { useState } from 'react';
import { Match, Team } from '../types';
import { UPCOMING_MATCHES, WC_GROUPS_MOCK, MATCH_STATS_MOCK, NEWS_DATA } from '../constants';
import { ArrowLeft, Clock, MapPin, Share2, BarChart2 } from 'lucide-react';
import MatchScheduleBox from './MatchScheduleBox';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';
import NewsFeed from './NewsFeed';

interface MatchDetailPageProps {
  match: Match;
  onBack: () => void;
  onMatchClick: (match: Match) => void;
  onTeamClick?: (team: Team) => void;
}

const MatchDetailPage: React.FC<MatchDetailPageProps> = ({ match, onBack, onMatchClick, onTeamClick }) => {
  // Lấy chữ cái bảng đấu từ chuỗi "Bảng A" -> "A". Nếu không phải vòng bảng (VD: Tứ kết), fallback về mặc định hoặc logic khác.
  // Ở đây giả sử nếu là vòng bảng sẽ hiển thị lịch và BXH của bảng đó.
  const groupLetter = match.round?.startsWith('Bảng ') ? match.round.replace('Bảng ', '').trim() : undefined;
  
  // Lấy 20 tin tức để hiển thị
  const matchNews = NEWS_DATA.slice(0, 20);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
      {/* HEADER: SCOREBOARD */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between">
              <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#9f224e] font-bold text-xs uppercase transition-colors"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
                  {match.date} • {match.round} • {match.stadium}
              </div>
          </div>
          
          <div className="pb-8 pt-2 bg-gradient-to-b from-white to-gray-50/50">
            <div className="max-w-[800px] mx-auto px-4">
                <div className="flex items-center justify-between gap-4 md:gap-12">
                    {/* Home Team */}
                    <div className="flex-1 flex flex-col items-center gap-3">
                        <img src={match.homeFlag} alt={match.homeTeam} className="w-16 h-10 md:w-20 md:h-14 object-cover shadow-md rounded-[2px] border border-gray-200" />
                        <span className="text-xl md:text-3xl font-black uppercase text-center text-gray-900 leading-none">{match.homeTeam}</span>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center">
                        <div className="bg-[#1a1a1a] text-white px-6 py-2 rounded-lg text-4xl md:text-5xl font-black tracking-tighter shadow-lg mb-2">
                            {match.status === 'finished' ? match.score : match.time}
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${match.status === 'finished' ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700 animate-pulse'}`}>
                            {match.status === 'finished' ? 'Kết thúc' : 'Sắp diễn ra'}
                        </span>
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex flex-col items-center gap-3">
                        <img src={match.awayFlag} alt={match.awayTeam} className="w-16 h-10 md:w-20 md:h-14 object-cover shadow-md rounded-[2px] border border-gray-200" />
                        <span className="text-xl md:text-3xl font-black uppercase text-center text-gray-900 leading-none">{match.awayTeam}</span>
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1100px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
            
            {/* COLUMN 1: MAIN CONTENT (760px) */}
            <div className="min-w-0 space-y-8">
                
                {/* 1. OVERVIEW / STATS */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="font-black text-gray-900 text-lg uppercase font-serif flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-[#9f224e]" /> Thống kê trận đấu
                        </h3>
                        <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">Demo Data</span>
                    </div>
                    
                    <div className="p-6 space-y-8">
                         {/* Possession */}
                        <div>
                            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                                <span>{MATCH_STATS_MOCK.possession[0]}%</span>
                                <span className="uppercase text-xs text-gray-400 tracking-widest">Kiểm soát bóng</span>
                                <span>{MATCH_STATS_MOCK.possession[1]}%</span>
                            </div>
                            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                                <div className="bg-[#9f224e]" style={{ width: `${MATCH_STATS_MOCK.possession[0]}%` }}></div>
                                <div className="bg-gray-800" style={{ width: `${MATCH_STATS_MOCK.possession[1]}%` }}></div>
                            </div>
                        </div>

                        {/* Shots */}
                        <div>
                            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                                <span>{MATCH_STATS_MOCK.shots[0]} <span className="text-gray-400 text-xs font-normal">({MATCH_STATS_MOCK.shotsOnTarget[0]})</span></span>
                                <span className="uppercase text-xs text-gray-400 tracking-widest">Dứt điểm (Trúng đích)</span>
                                <span>{MATCH_STATS_MOCK.shots[1]} <span className="text-gray-400 text-xs font-normal">({MATCH_STATS_MOCK.shotsOnTarget[1]})</span></span>
                            </div>
                            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                                <div className="bg-[#9f224e]" style={{ width: `${(MATCH_STATS_MOCK.shots[0] / (MATCH_STATS_MOCK.shots[0] + MATCH_STATS_MOCK.shots[1])) * 100}%` }}></div>
                                <div className="bg-gray-800 flex-1"></div>
                            </div>
                        </div>

                         {/* Passes */}
                         <div>
                            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                                <span>{MATCH_STATS_MOCK.passes[0]}</span>
                                <span className="uppercase text-xs text-gray-400 tracking-widest">Đường chuyền</span>
                                <span>{MATCH_STATS_MOCK.passes[1]}</span>
                            </div>
                            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                                <div className="bg-[#9f224e]" style={{ width: `${(MATCH_STATS_MOCK.passes[0] / (MATCH_STATS_MOCK.passes[0] + MATCH_STATS_MOCK.passes[1])) * 100}%` }}></div>
                                <div className="bg-gray-800 flex-1"></div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-50">
                             <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                                 <div className="text-2xl font-black text-gray-900">{MATCH_STATS_MOCK.corners[0]}</div>
                                 <div className="text-[10px] uppercase font-bold text-gray-400">Phạt góc</div>
                             </div>
                             <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                                 <div className="text-2xl font-black text-gray-900">{MATCH_STATS_MOCK.fouls[0]}</div>
                                 <div className="text-[10px] uppercase font-bold text-gray-400">Phạm lỗi</div>
                             </div>
                             <div className="flex-1 bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                                 <div className="text-2xl font-black text-gray-900">0</div>
                                 <div className="text-[10px] uppercase font-bold text-gray-400">Thẻ đỏ</div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 2. NEWS LIST (20 ITEMS) */}
                <NewsFeed 
                    newsItems={matchNews} 
                    title="Tin tức bên lề & Nhận định" 
                    hasPagination={true} 
                    itemsPerPage={5} 
                />

            </div>

            {/* COLUMN 2: SIDEBAR (300px) */}
            <aside className="w-full flex flex-col gap-6">
                {/* 1. Schedule Box - Pass groupLetter to filter matches */}
                <MatchScheduleBox onMatchClick={onMatchClick} filterGroup={groupLetter} />
                
                {/* 2. Standings for THIS group */}
                <StandingsWidget 
                    onTeamClick={onTeamClick} 
                    initialGroup={groupLetter} 
                />
                
                {/* 3. Poll */}
                <PollWidget />
            </aside>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
