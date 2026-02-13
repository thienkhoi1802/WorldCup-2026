
import React, { useState, useRef } from 'react';
import { WC_GROUPS_MOCK, ALL_TEAMS, UPCOMING_MATCHES } from '../constants';
import { Search, Trophy, Info, ChevronRight, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Team } from '../types';
import MatchScheduleBox from './MatchScheduleBox';
import PollWidget from './PollWidget';
import TriviaWidget from './TriviaWidget';

interface StandingsPageProps {
    onBack?: () => void;
    onTeamClick?: (team: Team) => void;
}

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const GroupCard: React.FC<{ group: string; onTeamClick?: (team: Team) => void }> = ({ group, onTeamClick }) => {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const standings = WC_GROUPS_MOCK[group];
    const matches = UPCOMING_MATCHES.filter(m => m.round === `Bảng ${group}`);

    const handleTeamClick = (teamName: string) => {
        const teamObj = ALL_TEAMS.find(t => t.name === teamName);
        if (teamObj && onTeamClick) {
            onTeamClick(teamObj);
        }
    };

    return (
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden animate-in fade-in duration-500">
            {/* Header Card */}
            <div className="bg-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black uppercase font-serif tracking-tight text-gray-900">Bảng {group}</h2>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Vòng bảng</span>
                </div>
            </div>

            {/* Content Area: STANDINGS TABLE (Always Visible) */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-50/50 text-[10px] text-gray-400 font-bold uppercase border-y border-gray-100">
                        <tr>
                            <th className="pl-6 pr-2 py-3 w-12 text-center">VT</th>
                            <th className="px-2 py-3">Đội tuyển</th>
                            <th className="px-2 py-3 text-center">TR</th>
                            <th className="px-2 py-3 text-center">HS</th>
                            <th className="px-2 py-3 text-center font-black text-gray-900">ĐIỂM</th>
                            <th className="px-6 py-3 text-center hidden sm:table-cell">PHONG ĐỘ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {standings.map((row, idx) => {
                            const isTBD = row.team.includes('Thắng') || row.team.includes('nhánh') || row.team.includes('/');
                            const isQualified = idx < 2;
                            const teamExists = ALL_TEAMS.some(t => t.name === row.team);

                            return (
                                <tr key={row.team} className="h-14 hover:bg-gray-50/50 transition-colors group">
                                    <td className="pl-6 pr-2 py-3 text-center">
                                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-black ${isQualified ? 'bg-green-100 text-green-700' : 'text-gray-400'}`}>
                                            {idx + 1}
                                        </span>
                                    </td>
                                    <td className="px-2 py-3">
                                        <div 
                                            onClick={() => !isTBD && handleTeamClick(row.team)}
                                            className={`flex items-center gap-3 ${!isTBD && teamExists ? 'cursor-pointer hover:opacity-80' : ''}`}
                                        >
                                            {isTBD ? (
                                                <div className="w-6 h-4 bg-gray-100 border border-gray-200 rounded-[2px] flex items-center justify-center">
                                                    <Trophy className="w-3 h-3 text-gray-300" />
                                                </div>
                                            ) : (
                                                <img src={row.flag} className="w-6 h-4 object-cover rounded-[1px] shadow-sm border border-gray-100" alt={row.team} />
                                            )}
                                            <span className={`font-bold truncate max-w-[150px] ${isTBD ? 'text-gray-400 font-medium italic' : 'text-gray-800 group-hover:text-[#9f224e] transition-colors'}`}>
                                                {row.team}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-2 py-3 text-center text-gray-500 font-medium">{row.played}</td>
                                    <td className="px-2 py-3 text-center text-gray-400 font-medium">{row.gd}</td>
                                    <td className="px-2 py-3 text-center font-black text-gray-900">{row.points}</td>
                                    <td className="px-6 py-3 hidden sm:table-cell">
                                        <div className="flex gap-1.5 justify-center">
                                            {row.form.map((f, i) => (
                                                <span key={i} className="w-2 h-2 rounded-full bg-gray-200"></span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Next Round Indicator */}
            <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-200"></span>
                    Vòng tiếp theo
                </div>
            </div>

            {/* COLLAPSIBLE SCHEDULE SECTION */}
            <div className="border-t border-gray-100">
                <button 
                    onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                    className="w-full flex items-center justify-between px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors group text-left"
                >
                    <div className="flex items-center gap-2">
                         <Calendar className="w-4 h-4 text-[#9f224e]" />
                         <span className="text-xs font-bold text-gray-700 uppercase group-hover:text-[#9f224e]">
                             Lịch thi đấu Bảng {group} ({matches.length})
                         </span>
                    </div>
                    {isScheduleOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {isScheduleOpen && (
                    <div className="bg-gray-50/50 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                        {matches.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {matches.map(match => (
                                    <div key={match.id} className="px-6 py-3 hover:bg-white transition-colors flex flex-col sm:flex-row items-center gap-4">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase sm:w-24 shrink-0">
                                            {match.date.split(',')[1]}
                                        </div>
                                        
                                        <div className="flex-1 w-full grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                                            <div 
                                                onClick={() => handleTeamClick(match.homeTeam)}
                                                className="flex items-center justify-end gap-3 cursor-pointer group/home"
                                            >
                                                <span className="text-sm font-bold text-gray-900 group-hover/home:text-[#9f224e] transition-colors text-right">{match.homeTeam}</span>
                                                <img src={match.homeFlag} className="w-6 h-4 object-cover rounded-[1px] shadow-sm" alt="" />
                                            </div>
                                            
                                            <div className="bg-white border border-gray-200 text-gray-900 text-[10px] font-black px-2 py-1 rounded min-w-[50px] text-center shadow-sm">
                                                {match.score || match.time}
                                            </div>
                                            
                                            <div 
                                                onClick={() => handleTeamClick(match.awayTeam)}
                                                className="flex items-center justify-start gap-3 cursor-pointer group/away"
                                            >
                                                <img src={match.awayFlag} className="w-6 h-4 object-cover rounded-[1px] shadow-sm" alt="" />
                                                <span className="text-sm font-bold text-gray-900 group-hover/away:text-[#9f224e] transition-colors text-left">{match.awayTeam}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-400 text-xs italic">
                                Chưa có lịch thi đấu chi tiết.
                            </div>
                        )}
                         <div className="px-6 py-3 bg-gray-100/50 border-t border-gray-100 text-center">
                            <button className="text-[10px] font-bold text-gray-500 hover:text-[#9f224e] uppercase flex items-center justify-center gap-1 mx-auto">
                                Xem chi tiết trận đấu <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const StandingsPage: React.FC<StandingsPageProps> = ({ onBack, onTeamClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToGroup = (group: string) => {
    setActiveFilter(group);
    if (group === 'ALL') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const element = groupRefs.current[group];
    if (element) {
      const offset = 120; // Khoảng cách trừ hao cho header và filter bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredGroups = GROUPS.filter(group => {
    if (!searchQuery) return true;
    return WC_GROUPS_MOCK[group].some(row => 
        row.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
        <div className="max-w-[1100px] mx-auto px-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* CỘT TRÁI: 760px */}
                <div className="min-w-0">
                    
                    {/* Tiêu đề trang */}
                    <div className="bg-white rounded-t-xl border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                    <Trophy className="w-7 h-7 text-[#9f224e]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 font-serif">Bảng xếp hạng</h1>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-0.5">FIFA World Cup 2026™ • 12 Bảng đấu</p>
                                </div>
                            </div>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Tìm đội tuyển..." 
                                    value={searchQuery} 
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9f224e]/20" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* BỘ LỌC NHANH - STICKY */}
                    <div className="sticky top-0 z-40 bg-white border-x border-b border-gray-200 shadow-sm">
                        <div className="flex items-center px-4 py-3 overflow-x-auto no-scrollbar gap-1">
                            <button 
                                onClick={() => scrollToGroup('ALL')}
                                className={`px-4 py-2 text-[11px] font-black uppercase transition-all rounded-md whitespace-nowrap ${activeFilter === 'ALL' ? 'bg-[#9f224e] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                Tất cả
                            </button>
                            <div className="w-px h-4 bg-gray-200 mx-2"></div>
                            {GROUPS.map(g => (
                                <button 
                                    key={g}
                                    onClick={() => scrollToGroup(g)}
                                    className={`w-9 h-9 flex items-center justify-center text-[11px] font-black uppercase transition-all rounded-md shrink-0 ${activeFilter === g ? 'bg-[#9f224e] text-white shadow-sm scale-110' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Danh sách các bảng */}
                    <div className="mt-6 space-y-6">
                        {filteredGroups.map(group => (
                            <div key={group} ref={el => { groupRefs.current[group] = el }}>
                                <GroupCard group={group} onTeamClick={onTeamClick} />
                            </div>
                        ))}
                    </div>

                    {/* PHẦN CHÚ THÍCH TIẾNG VIỆT */}
                    <div className="mt-8 p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Info className="w-5 h-5 text-[#9f224e]" />
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight font-serif">Chú thích & Thể thức</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-[#9f224e] pl-3">Thông số trận đấu</h5>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">TR</strong> <span className="text-gray-500">Số trận đã đấu</span></div>
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">T</strong> <span className="text-gray-500">Thắng</span></div>
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">H</strong> <span className="text-gray-500">Hòa</span></div>
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">B</strong> <span className="text-gray-500">Bại</span></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-[#9f224e] pl-3">Bàn thắng & Điểm số</h5>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">BT</strong> <span className="text-gray-500">Bàn thắng</span></div>
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">BB</strong> <span className="text-gray-500">Bàn bại</span></div>
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900">HS</strong> <span className="text-gray-500">Hiệu số</span></div>
                                    <div className="flex items-center gap-4 text-xs"><strong className="w-8 text-gray-900 font-black">Điểm</strong> <span className="text-gray-500">Điểm số (Thắng 3, Hòa 1)</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-gray-400 uppercase">Phong độ:</span>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Thắng</div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span> Hòa</div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Bại</div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span> Chưa đấu</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                             <p className="text-[11px] text-gray-500 leading-relaxed">
                                <strong>Thể thức:</strong> 48 đội chia thành 12 bảng. 2 đội dẫn đầu mỗi bảng và 8 đội hạng ba có thành tích tốt nhất sẽ giành quyền vào vòng 32 đội. Thứ tự ưu tiên xếp hạng: 1. Điểm, 2. Hiệu số bàn thắng, 3. Tổng số bàn thắng.
                             </p>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: 300px */}
                <aside className="w-full flex flex-col gap-6">
                    <MatchScheduleBox />
                    <PollWidget />
                    <TriviaWidget />
                </aside>
            </div>
        </div>
    </div>
  );
};

export default StandingsPage;
