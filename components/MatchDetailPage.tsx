
import React, { useState } from 'react';
import { Match } from '../types';
import { UPCOMING_MATCHES, WC_GROUPS_MOCK } from '../constants';
import { ArrowLeft, Clock } from 'lucide-react';

// Import Widgets for Sidebar
import MatchScheduleBox from './MatchScheduleBox';
import PollWidget from './PollWidget';

interface MatchDetailPageProps {
  match: Match;
  onBack: () => void;
  onMatchClick: (match: Match) => void;
}

// Generate Mock News Items for the Overview Tab
const OVERVIEW_NEWS_LIST = Array.from({ length: 15 }).map((_, i) => ({
  id: `ov-news-${i}`,
  title: [
    "Nhận định chuyên sâu: Cuộc đối đầu không khoan nhượng tại vòng bảng",
    "HLV trưởng công bố đội hình ra sân: Bất ngờ lớn ở hàng tiền vệ",
    "Cổ động viên nhuộm đỏ các con phố quanh sân vận động trước giờ G",
    "Phân tích chiến thuật: Điểm yếu chí mạng đối thủ có thể khai thác",
    "Siêu sao đội bạn dính chấn thương nhẹ, bỏ ngỏ khả năng ra sân",
    "Trọng tài FIFA nổi tiếng sẽ bắt chính trận đấu tâm điểm này",
    "Lịch sử đối đầu: Lợi thế đang nghiêng về phía đội chủ nhà",
    "Góc nhìn chuyên gia: 'Đây sẽ là trận đấu định đoạt tấm vé đi tiếp'",
    "Giá vé chợ đen tăng phi mã khi sức nóng trận đấu lên tới đỉnh điểm",
    "Bên lề sân cỏ: Những bóng hồng xinh đẹp tiếp lửa cho cầu thủ"
  ][i % 10] + ` (Tin cập nhật #${i + 1})`,
  excerpt: "Cập nhật những thông tin nóng hổi nhất, phân tích chuyên môn và không khí bên lề trước thềm trận đấu quan trọng tại World Cup 2026.",
  image: `https://picsum.photos/300/200?random=${i + 150}`,
  time: `${Math.floor(Math.random() * 24) + 1} giờ trước`,
  category: ['Tiêu điểm', 'Bên lề', 'Phân tích', 'Tin nóng'][i % 4],
}));

const MatchDetailPage: React.FC<MatchDetailPageProps> = ({ match, onBack, onMatchClick }) => {
  // 1. DATA PROCESSING
  const groupLetter = match.round?.replace('Bảng ', '').trim() || 'A';
  const groupStandings = WC_GROUPS_MOCK[groupLetter] || [];
  const relatedMatches = UPCOMING_MATCHES.filter(m => m.round === match.round && m.id !== match.id).slice(0, 4);

  // Helper Components for Sidebar (Compact Design)
  const SidebarStandings = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-gray-900 font-serif">
                BXH Bảng {groupLetter}
            </h3>
             <span className="text-[10px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded animate-pulse">Live</span>
        </div>
        <table className="w-full text-xs text-left">
            <thead className="bg-white text-gray-500 font-bold uppercase border-b border-gray-100">
                <tr>
                    <th className="px-2 py-2 text-center">#</th>
                    <th className="px-2 py-2">Đội</th>
                    <th className="px-1 py-2 text-center" title="Trận">Tr</th>
                    <th className="px-1 py-2 text-center" title="Hiệu số">HS</th>
                    <th className="px-2 py-2 text-center font-black text-gray-900">Đ</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {groupStandings.map((row) => (
                    <tr key={row.team} className={`hover:bg-gray-50 ${row.team === match.homeTeam || row.team === match.awayTeam ? 'bg-blue-50/50' : ''}`}>
                        <td className="px-2 py-2 text-center font-bold text-gray-400">{row.rank}</td>
                        <td className="px-2 py-2 flex items-center gap-2">
                            <img src={row.flag} alt={row.team} className="w-4 h-3 object-cover shadow-sm rounded-sm border border-gray-200" />
                            <span className={`font-bold truncate max-w-[80px] ${row.team === match.homeTeam || row.team === match.awayTeam ? 'text-black' : 'text-gray-700'}`}>{row.team}</span>
                        </td>
                        <td className="px-1 py-2 text-center text-gray-600">{row.played}</td>
                        <td className="px-1 py-2 text-center text-gray-600">{row.gd}</td>
                        <td className="px-2 py-2 text-center font-black text-black">{row.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );

  const SidebarRelatedMatches = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-bold uppercase text-gray-900 font-serif">
                Cùng Bảng {groupLetter}
            </h3>
        </div>
        <div className="flex flex-col">
            {relatedMatches.length > 0 ? relatedMatches.map(m => (
                <div 
                    key={m.id} 
                    onClick={() => onMatchClick(m)}
                    className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-1.5 py-0.5 rounded">{m.date} {m.time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                             <span className="text-xs font-bold text-gray-900 truncate max-w-[80px]">{m.homeTeam}</span>
                             <img src={m.homeFlag} className="w-5 h-3.5 object-cover rounded shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 mx-1">VS</span>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                             <img src={m.awayFlag} className="w-5 h-3.5 object-cover rounded shadow-sm" />
                             <span className="text-xs font-bold text-gray-900 truncate max-w-[80px] text-right">{m.awayTeam}</span>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="p-4 text-center text-xs text-gray-400 italic">
                    Không có trận đấu khác.
                </div>
            )}
        </div>
    </div>
  );

  const NewsSection = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-1 h-6 bg-[#9f224e]"></div>
            <h3 className="text-xl font-bold uppercase text-gray-900 font-serif">Tin tức bên lề</h3>
        </div>
        
        <div className="flex flex-col gap-6">
            {OVERVIEW_NEWS_LIST.map((news) => (
                <article key={news.id} className="flex gap-5 group cursor-pointer border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="w-[200px] h-[125px] shrink-0 overflow-hidden rounded-md relative bg-gray-100">
                        <img 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                    </div>
                    
                    <div className="flex flex-col justify-between py-1">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-bold uppercase text-[#9f224e] bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                    {news.category}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#9f224e] transition-colors mb-2 line-clamp-2">
                                {news.title}
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                {news.excerpt}
                            </p>
                        </div>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-auto">
                            <Clock className="w-3 h-3" /> {news.time}
                        </span>
                    </div>
                </article>
            ))}
        </div>
        <div className="mt-6 pt-4 text-center">
             <button className="px-6 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold rounded-full transition-colors border border-gray-200">
                 Xem thêm tin khác
             </button>
        </div>
    </div>
  );

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* 1. HEADER SECTION (White Background) */}
      <div className="bg-white shadow-sm border-b border-gray-200">
          {/* Navigation Bar */}
          <div className="max-w-[1140px] mx-auto px-4 py-4 flex items-center justify-between">
              <button 
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#9f224e] font-bold text-xs uppercase tracking-widest transition-colors"
              >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MATCH CENTRE</div>
          </div>

          {/* Match Scoreboard */}
          <div className="pb-8">
            <div className="max-w-[760px] mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-6">
                    {/* Home Team */}
                    <div className="flex items-center gap-6 justify-end text-right w-full md:w-auto flex-1">
                        <span className="text-3xl md:text-5xl font-black text-gray-900 font-serif uppercase tracking-tighter hidden md:block">{match.homeTeam}</span>
                        <img src={match.homeFlag} alt={match.homeTeam} className="w-16 h-10 md:w-24 md:h-16 object-cover shadow-sm rounded-sm border border-gray-100" />
                        <span className="text-xl font-bold text-gray-900 md:hidden">{match.homeTeam}</span>
                    </div>

                    {/* Score / Time */}
                    <div className="flex flex-col items-center justify-center min-w-[140px] relative z-10">
                        {match.status === 'finished' ? (
                            <div className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                                {match.score}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-none mb-2">{match.time}</span>
                                <span className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">Sắp diễn ra</span>
                            </div>
                        )}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-6 justify-start text-left w-full md:w-auto flex-1">
                        <img src={match.awayFlag} alt={match.awayTeam} className="w-16 h-10 md:w-24 md:h-16 object-cover shadow-sm rounded-sm border border-gray-100" />
                        <span className="text-3xl md:text-5xl font-black text-gray-900 font-serif uppercase tracking-tighter hidden md:block">{match.awayTeam}</span>
                        <span className="text-xl font-bold text-gray-900 md:hidden">{match.awayTeam}</span>
                    </div>
                </div>
            </div>

            {/* Info Bar */}
            <div className="bg-[#f8f9fa] border-y border-gray-100 py-4 mt-4">
                 <div className="max-w-[760px] mx-auto px-4 flex flex-wrap justify-center gap-y-4 gap-x-12 text-xs text-gray-600 font-medium text-center">
                     <div className="flex flex-col items-center gap-1">
                         <span className="uppercase text-[9px] font-bold text-gray-400 tracking-wider">Giải đấu</span>
                         <span className="font-bold text-gray-900">FIFA World Cup 2026™</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                         <span className="uppercase text-[9px] font-bold text-gray-400 tracking-wider">Khởi tranh</span>
                         <span className="font-bold text-gray-900">{match.date}, {match.time}</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                         <span className="uppercase text-[9px] font-bold text-gray-400 tracking-wider">Địa điểm</span>
                         <span className="font-bold text-gray-900">{match.stadium || 'Sân vận động quốc gia'}</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                         <span className="uppercase text-[9px] font-bold text-gray-400 tracking-wider">Vòng đấu</span>
                         <span className="font-bold text-gray-900">{match.round}</span>
                     </div>
                 </div>
            </div>
          </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-[1140px] mx-auto px-4 py-8 pb-24">
        {/* Layout: Left Content (760px) - Right Sidebar (300px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 justify-between">
            
            {/* --- LEFT COLUMN: 760px Content --- */}
            <div className="min-w-0">
                <NewsSection />
            </div>

            {/* --- RIGHT COLUMN: 300px Sidebar --- */}
            <aside className="flex flex-col gap-6 w-full lg:w-[300px]">
                {/* 1. Specific Standings for this Group */}
                <SidebarStandings />

                {/* 2. Related Matches in this Group */}
                <SidebarRelatedMatches />

                {/* 3. Global Match Schedule (Optional, can be kept for navigation) */}
                <MatchScheduleBox onMatchClick={onMatchClick} />
                
                {/* 4. Poll Widget */}
                <PollWidget />

                {/* Ad Placeholder */}
                <div className="bg-white border border-gray-200 w-full h-[300px] flex flex-col items-center justify-center text-gray-400 text-sm rounded-lg relative overflow-hidden shadow-sm">
                    <span className="z-10 bg-gray-100 px-3 py-1 rounded shadow-sm text-xs font-bold">Quảng cáo</span>
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                </div>
            </aside>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
