
import React, { useState } from 'react';
import { Team, Match, NewsItem } from '../types';
import { UPCOMING_MATCHES, NEWS_DATA } from '../constants';
import { ChevronLeft, Calendar, MapPin, Clock, Shirt, User, ChevronRight, Shield, Zap, Target, AlignLeft } from 'lucide-react';
import MatchScheduleBox from './MatchScheduleBox';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';

interface TeamDetailPageProps {
  team: Team;
  onBack: () => void;
  onMatchClick: (match: Match) => void;
  onTeamClick?: (team: Team) => void;
}

// Mock Data Generators for Demo
const generateSquad = (teamName: string) => {
    return {
        gk: ['Nguyễn Văn A', 'Trần Văn B', 'Lê Văn C'],
        df: ['Phạm Văn D', 'Hoàng Văn E', 'Đỗ Văn F', 'Ngô Văn G', 'Bùi Văn H', 'Vũ Văn I', 'Đoàn Văn J', 'Lê Văn K'],
        mf: ['Đặng Văn J', 'Hồ Văn K', 'Dương Văn L', 'Lý Văn M', 'Trịnh Văn N', 'Đinh Văn O', 'Phan Văn P'],
        fw: ['Mai Văn P', 'Cao Văn Q', 'Lương Văn R', 'Hà Văn S', 'Nguyễn Văn T']
    };
};

// Reusable Component: Match Item
const MatchItem: React.FC<{ match: Match; teamName: string; onClick: (match: Match) => void }> = ({ match, teamName, onClick }) => (
    <div 
        onClick={() => onClick(match)}
        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
    >
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 w-full sm:w-auto">
             <span className="bg-gray-100 px-2 py-1 rounded">{match.date}</span>
             <span>{match.time}</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center gap-6 w-full sm:w-auto">
            <div className="flex items-center gap-3 flex-1 justify-end">
                <span className={`font-bold text-sm ${match.homeTeam === teamName ? 'text-black' : 'text-gray-600'}`}>{match.homeTeam}</span>
                <img src={match.homeFlag} className="w-6 h-4 object-cover rounded shadow-sm" alt="" />
            </div>
            <span className="font-black text-gray-300 text-xs">VS</span>
            <div className="flex items-center gap-3 flex-1 justify-start">
                <img src={match.awayFlag} className="w-6 h-4 object-cover rounded shadow-sm" alt="" />
                <span className={`font-bold text-sm ${match.awayTeam === teamName ? 'text-black' : 'text-gray-600'}`}>{match.awayTeam}</span>
            </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 w-32 justify-end truncate">
            <MapPin className="w-3 h-3" /> {match.stadium?.split(' ')[0]}
        </div>
    </div>
);

// Reusable Component: News List Item (Expanded for Single Column)
const NewsListItem: React.FC<{ item: NewsItem }> = ({ item }) => (
    <div className="flex gap-4 sm:gap-6 group cursor-pointer border-b border-gray-100 py-5 last:border-0 hover:bg-gray-50/50 transition-colors">
        <div className="w-32 h-20 sm:w-48 sm:h-28 shrink-0 overflow-hidden rounded-lg bg-gray-100 relative">
            <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase text-gray-800 shadow-sm border border-white/20">
                {item.category}
            </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-start gap-2">
            <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#9f224e] transition-colors">
                {item.title}
            </h4>
            <p className="text-sm text-gray-500 line-clamp-2 hidden sm:block leading-relaxed">{item.excerpt}</p>
            <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-auto">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-gray-400">Tác giả: Ban Thể Thao</span>
            </div>
        </div>
    </div>
);

const TeamDetailPage: React.FC<TeamDetailPageProps> = ({ team, onBack, onMatchClick, onTeamClick }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'squad' | 'fixtures' | 'news'>('overview');
  
  // Data Filtering
  const teamMatches = UPCOMING_MATCHES.filter(m => m.homeTeam === team.name || m.awayTeam === team.name);
  
  // Ensure we have enough news for demo
  let rawTeamNews = NEWS_DATA.filter(n => n.title.toLowerCase().includes(team.name.toLowerCase()));
  if (rawTeamNews.length < 30) {
      rawTeamNews = [...rawTeamNews, ...NEWS_DATA.filter(n => !n.title.toLowerCase().includes(team.name.toLowerCase()))];
  }
  
  const overviewNews = rawTeamNews.slice(0, 20);
  const fullNews = rawTeamNews.slice(0, 30);
  const squad = generateSquad(team.name);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
        <div className="max-w-[1100px] mx-auto px-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* Main Content */}
                <div className="min-w-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    
                    {/* Hero Header */}
                    <div className={`${team.displayColor || 'bg-gray-900'} relative h-48 sm:h-56 p-6 flex flex-col justify-between overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <button onClick={onBack} className="self-start flex items-center gap-1 text-white/80 hover:text-white transition-all text-xs font-bold uppercase bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm relative z-10">
                            <ChevronLeft className="w-4 h-4" /> Quay lại danh sách
                        </button>
                        
                        <div className="flex items-end gap-5 relative z-10">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-1 rounded-lg shadow-xl">
                                <img src={team.flag} alt={team.name} className="w-full h-full object-cover rounded-[2px]" />
                            </div>
                            <div className="mb-1">
                                <div className="flex items-center gap-2 mb-1">
                                     <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md uppercase tracking-wider">
                                        {team.region}
                                     </span>
                                     {team.isQualified && (
                                         <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                            Đã có vé
                                         </span>
                                     )}
                                </div>
                                <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight leading-none">
                                    {team.name}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-gray-200 bg-white sticky top-0 z-20 overflow-x-auto no-scrollbar shadow-sm">
                        {[
                            { id: 'overview', label: 'Tổng quan' }, 
                            { id: 'squad', label: 'Đội hình' }, 
                            { id: 'fixtures', label: 'Lịch thi đấu' }, 
                            { id: 'news', label: 'Tin tức' }
                        ].map(tab => (
                            <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id as any)} 
                                className={`px-6 py-4 text-xs font-bold uppercase transition-colors whitespace-nowrap border-b-2 ${
                                    activeTab === tab.id 
                                    ? 'text-[#9f224e] border-[#9f224e] bg-gray-50/50' 
                                    : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 bg-white min-h-[500px]">
                        
                        {/* 1. TONG QUAN */}
                        {activeTab === 'overview' && (
                            <div className="space-y-10 animate-in fade-in duration-300">
                                
                                {/* Section 1: Upcoming Matches */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-black text-lg text-gray-900 uppercase font-serif flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-[#9f224e]" /> Lịch thi đấu gần nhất
                                        </h3>
                                        <button onClick={() => setActiveTab('fixtures')} className="text-xs font-bold text-gray-500 hover:text-[#9f224e] flex items-center gap-1">
                                            Xem tất cả <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {teamMatches.length > 0 ? (
                                            teamMatches.slice(0, 3).map(m => <MatchItem key={m.id} match={m} teamName={team.name} onClick={onMatchClick} />)
                                        ) : (
                                            <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500 text-sm italic">
                                                Chưa có lịch thi đấu sắp tới.
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Section 2: Styled Squad Overview */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-black text-lg text-gray-900 uppercase font-serif flex items-center gap-2">
                                            <Shirt className="w-5 h-5 text-[#9f224e]" /> Đội hình chủ chốt
                                        </h3>
                                        <button onClick={() => setActiveTab('squad')} className="text-xs font-bold text-gray-500 hover:text-[#9f224e] flex items-center gap-1">
                                            Chi tiết <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {/* GK */}
                                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-yellow-400 hover:shadow-md transition-all">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                                            <div className="flex items-center gap-2 mb-3 pl-2">
                                                <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                                                    <Shield className="w-4 h-4 text-yellow-600" />
                                                </div>
                                                <h4 className="text-xs font-black uppercase text-gray-700">Thủ môn</h4>
                                            </div>
                                            <ul className="pl-2 space-y-2">
                                                {squad.gk.slice(0, 3).map((p, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                                        <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center font-mono">1</span>
                                                        <span className="truncate">{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* DF */}
                                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-400 hover:shadow-md transition-all">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                                            <div className="flex items-center gap-2 mb-3 pl-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <Shield className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <h4 className="text-xs font-black uppercase text-gray-700">Hậu vệ</h4>
                                            </div>
                                            <ul className="pl-2 space-y-2">
                                                {squad.df.slice(0, 3).map((p, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                                        <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center font-mono">{i + 2}</span>
                                                        <span className="truncate">{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* MF */}
                                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-400 hover:shadow-md transition-all">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                                            <div className="flex items-center gap-2 mb-3 pl-2">
                                                 <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                                    <AlignLeft className="w-4 h-4 text-green-600" />
                                                </div>
                                                <h4 className="text-xs font-black uppercase text-gray-700">Tiền vệ</h4>
                                            </div>
                                            <ul className="pl-2 space-y-2">
                                                {squad.mf.slice(0, 3).map((p, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                                        <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center font-mono">{i + 6}</span>
                                                        <span className="truncate">{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* FW */}
                                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-red-400 hover:shadow-md transition-all">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                                            <div className="flex items-center gap-2 mb-3 pl-2">
                                                 <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                                    <Target className="w-4 h-4 text-red-600" />
                                                </div>
                                                <h4 className="text-xs font-black uppercase text-gray-700">Tiền đạo</h4>
                                            </div>
                                            <ul className="pl-2 space-y-2">
                                                {squad.fw.slice(0, 3).map((p, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                                        <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center font-mono">{i + 9}</span>
                                                        <span className="truncate">{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 3: News Items (Single Column) */}
                                <section>
                                    <div className="flex items-center justify-between mb-4 pt-6 border-t border-gray-100">
                                        <h3 className="font-black text-lg text-gray-900 uppercase font-serif">Tin tức mới nhất</h3>
                                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full">{overviewNews.length} tin</span>
                                    </div>
                                    <div className="flex flex-col">
                                        {overviewNews.map(n => <NewsListItem key={n.id} item={n} />)}
                                    </div>
                                    <div className="mt-8 text-center">
                                        <button onClick={() => setActiveTab('news')} className="px-8 py-3 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600 font-bold text-xs uppercase rounded-full transition-all shadow-sm">
                                            Xem tất cả tin tức
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* 2. DOI HINH (FULL) - Improved UI */}
                        {activeTab === 'squad' && (
                            <div className="animate-in fade-in duration-300">
                                <h3 className="font-black text-xl text-gray-900 uppercase font-serif mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-[#9f224e]" /> Danh sách cầu thủ đăng ký
                                </h3>
                                
                                <div className="space-y-10">
                                    {[
                                        { title: 'Thủ môn', icon: <Shield className="w-5 h-5"/>, color: 'text-yellow-600', bg: 'bg-yellow-50', players: squad.gk },
                                        { title: 'Hậu vệ', icon: <Shield className="w-5 h-5"/>, color: 'text-blue-600', bg: 'bg-blue-50', players: squad.df },
                                        { title: 'Tiền vệ', icon: <AlignLeft className="w-5 h-5"/>, color: 'text-green-600', bg: 'bg-green-50', players: squad.mf },
                                        { title: 'Tiền đạo', icon: <Target className="w-5 h-5"/>, color: 'text-red-600', bg: 'bg-red-50', players: squad.fw }
                                    ].map((group) => (
                                        <div key={group.title}>
                                            <div className={`flex items-center gap-3 mb-4 p-3 rounded-lg ${group.bg} border border-transparent`}>
                                                <div className={`${group.color}`}>{group.icon}</div>
                                                <h4 className={`text-sm font-black uppercase ${group.color}`}>{group.title}</h4>
                                                <span className="ml-auto bg-white/50 px-2 py-0.5 rounded text-xs font-bold text-gray-600">{group.players.length}</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {group.players.map((name, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all group">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold group-hover:bg-[#9f224e] group-hover:text-white transition-colors relative overflow-hidden">
                                                            <User className="w-6 h-6 relative z-10" />
                                                            {/* Pattern decoration */}
                                                            <div className="absolute inset-0 bg-white/10 rotate-45 transform translate-y-1/2"></div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-bold text-gray-900 text-base truncate">{name}</div>
                                                            <div className="text-xs text-gray-500 font-medium">CLB: Chưa cập nhật</div>
                                                        </div>
                                                        <div className="text-xl font-black text-gray-100 font-mono group-hover:text-gray-200 transition-colors">
                                                            {Math.floor(Math.random() * 20) + 1}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. LICH THI DAU (FULL) */}
                        {activeTab === 'fixtures' && (
                            <div className="animate-in fade-in duration-300">
                                <h3 className="font-black text-xl text-gray-900 uppercase font-serif mb-6 flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-[#9f224e]" /> Lịch thi đấu toàn giải
                                </h3>
                                <div className="space-y-4">
                                    {teamMatches.length > 0 ? (
                                        teamMatches.map(m => <MatchItem key={m.id} match={m} teamName={team.name} onClick={onMatchClick} />)
                                    ) : (
                                        <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p className="text-sm font-medium">Chưa có dữ liệu lịch thi đấu.</p>
                                        </div>
                                    )}
                                    
                                    {/* Mock Past Matches to fill space if needed */}
                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                                        <div className="relative flex justify-center"><span className="bg-white px-3 text-xs font-bold text-gray-400 uppercase">Trận đấu đã qua (Demo)</span></div>
                                    </div>
                                    {[1, 2, 3].map(i => (
                                         <div key={`past-${i}`} className="bg-gray-50 border border-gray-100 rounded-lg p-4 opacity-70 grayscale flex flex-col sm:flex-row items-center justify-between gap-4">
                                             <div className="flex items-center gap-2 text-xs font-bold text-gray-400 w-full sm:w-auto"><span className="bg-gray-200 px-2 py-1 rounded">01/01</span><span>Kết thúc</span></div>
                                             <div className="flex-1 flex items-center justify-center gap-6 w-full sm:w-auto">
                                                 <div className="flex items-center gap-3 flex-1 justify-end"><span className="font-bold text-sm text-gray-600">{team.name}</span><img src={team.flag} className="w-6 h-4 object-cover rounded shadow-sm" alt="" /></div>
                                                 <span className="font-black text-gray-800 text-sm bg-white border border-gray-200 px-2 py-1 rounded">2 - 0</span>
                                                 <div className="flex items-center gap-3 flex-1 justify-start"><span className="w-6 h-4 bg-gray-300 rounded block"></span><span className="font-bold text-sm text-gray-600">Đối thủ Demo</span></div>
                                             </div>
                                             <div className="hidden sm:block w-32"></div>
                                         </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 4. TIN TUC (30 ITEMS) */}
                        {activeTab === 'news' && (
                            <div className="animate-in fade-in duration-300">
                                <h3 className="font-black text-xl text-gray-900 uppercase font-serif mb-6 flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-[#9f224e]" /> Kho lưu trữ tin tức
                                </h3>
                                <div className="space-y-0">
                                    {fullNews.map(n => <NewsListItem key={n.id} item={n} />)}
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                    <p className="text-gray-400 text-sm mb-4">Bạn đã xem hết danh sách 30 tin tức mới nhất.</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Sidebar Column */}
                <aside className="w-full flex flex-col gap-6">
                    <MatchScheduleBox />
                    <StandingsWidget onTeamClick={onTeamClick} />
                    <PollWidget />
                </aside>
            </div>
        </div>
    </div>
  );
};

export default TeamDetailPage;
