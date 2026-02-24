
import React, { useState } from 'react';
import { Team, Match, NewsItem } from '../types';
import { UPCOMING_MATCHES, NEWS_DATA, WC_GROUPS_MOCK } from '../constants';
import { ChevronLeft, Calendar, MapPin, Clock, Shirt, User, ChevronRight, Shield, Zap, Target, AlignLeft, Globe, Trophy, Hash, Users } from 'lucide-react';
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

// Helper to find group
const findTeamGroup = (teamName: string) => {
    for (const [group, teams] of Object.entries(WC_GROUPS_MOCK)) {
        if (teams.some(t => t.team === teamName)) return group;
    }
    return null;
};

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

// Reusable Component: Match Item for Fixtures Tab (Simple version)
const FixtureItem: React.FC<{ match: Match; teamName: string; onClick: (match: Match) => void }> = ({ match, teamName, onClick }) => (
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
  
  // Rich Data Calculation
  const groupName = findTeamGroup(team.name);
  const participationCount = team.participations || Math.floor(Math.random() * 10) + 2;

  // Determine text color based on background
  const hasBlackText = team.displayColor?.includes('text-black');
  const textColorClass = hasBlackText ? 'text-gray-900' : 'text-white';
  const subTextColorClass = hasBlackText ? 'text-gray-700' : 'text-white/80';
  const pillBgClass = hasBlackText ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20';

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
        <div className="max-w-[1100px] mx-auto px-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* Main Content */}
                <div className="min-w-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    
                    {/* RICH HERO HEADER */}
                    <div className={`${team.displayColor || 'bg-gray-900'} relative p-6 sm:p-8 flex flex-col gap-6 overflow-hidden`}>
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none mix-blend-overlay"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                        {/* Top Action Row */}
                        <div className="flex justify-between items-start relative z-10">
                            <button onClick={onBack} className={`flex items-center gap-1 ${subTextColorClass} hover:${textColorClass} transition-all text-xs font-bold uppercase ${pillBgClass} px-3 py-1.5 rounded-full backdrop-blur-sm`}>
                                <ChevronLeft className="w-4 h-4" /> Quay lại
                            </button>
                        </div>
                        
                        {/* Main Info Row */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 relative z-10">
                            {/* Flag */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-1 rounded-xl shadow-xl shrink-0 rotate-1 transform transition-transform hover:rotate-0">
                                <img src={team.flag} alt={team.name} className="w-full h-full object-cover rounded-lg" />
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 min-w-0">
                                <h1 className={`text-4xl sm:text-5xl font-black ${textColorClass} font-serif tracking-tight leading-none mb-4`}>
                                    {team.name}
                                </h1>
                                
                                {/* Stats Grid - Improved UX */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {/* Ranking */}
                                    <div className={`flex flex-col p-2 rounded-lg ${pillBgClass} backdrop-blur-md`}>
                                        <span className={`text-[10px] uppercase font-bold ${subTextColorClass} mb-0.5 flex items-center gap-1`}><Hash className="w-3 h-3"/> BXH FIFA</span>
                                        <span className={`text-lg font-black ${textColorClass}`}>{team.ranking ? `#${team.ranking}` : '--'}</span>
                                    </div>
                                    
                                    {/* Group */}
                                    <div className={`flex flex-col p-2 rounded-lg ${pillBgClass} backdrop-blur-md`}>
                                        <span className={`text-[10px] uppercase font-bold ${subTextColorClass} mb-0.5 flex items-center gap-1`}><Shield className="w-3 h-3"/> Bảng đấu</span>
                                        <span className={`text-lg font-black ${textColorClass}`}>{groupName ? `Bảng ${groupName}` : 'Chưa xếp'}</span>
                                    </div>

                                    {/* Region */}
                                    <div className={`flex flex-col p-2 rounded-lg ${pillBgClass} backdrop-blur-md`}>
                                        <span className={`text-[10px] uppercase font-bold ${subTextColorClass} mb-0.5 flex items-center gap-1`}><Globe className="w-3 h-3"/> Khu vực</span>
                                        <span className={`text-lg font-black ${textColorClass}`}>{team.region}</span>
                                    </div>

                                     {/* Coach/Info */}
                                     <div className={`flex flex-col p-2 rounded-lg ${pillBgClass} backdrop-blur-md`}>
                                        <span className={`text-[10px] uppercase font-bold ${subTextColorClass} mb-0.5 flex items-center gap-1`}><Users className="w-3 h-3"/> Tham dự</span>
                                        <span className={`text-lg font-black ${textColorClass}`}>{participationCount} lần</span>
                                    </div>
                                </div>
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
                                
                                {/* Section 1: Upcoming Matches (Updated UI) */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-black text-lg text-gray-900 uppercase font-serif flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-[#9f224e]" /> Lịch thi đấu gần nhất
                                        </h3>
                                        <button onClick={() => setActiveTab('fixtures')} className="text-xs font-bold text-gray-500 hover:text-[#9f224e] flex items-center gap-1 transition-colors">
                                            Xem tất cả <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {teamMatches.length > 0 ? (
                                            teamMatches.slice(0, 3).map(m => (
                                                <div 
                                                    key={m.id}
                                                    onClick={() => onMatchClick(m)}
                                                    className="flex flex-col md:flex-row items-center border border-gray-200 rounded-lg overflow-hidden hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all group bg-white"
                                                >
                                                    {/* Date Time Block */}
                                                    <div className="w-full md:w-48 bg-gray-100/80 p-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-1 text-gray-700 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                                                        <span className="text-xs font-bold text-gray-500">{m.date}</span>
                                                        <span className="text-xl font-black text-gray-900">{m.time}</span>
                                                    </div>

                                                    {/* Match Info */}
                                                    <div className="flex-1 p-4 w-full">
                                                        <div className="flex items-center justify-center gap-4 md:gap-8">
                                                            {/* Home */}
                                                            <div className="flex items-center gap-3 flex-1 justify-end">
                                                                <span className={`font-bold text-sm md:text-base ${m.homeTeam === team.name ? 'text-black' : 'text-gray-600'}`}>{m.homeTeam}</span>
                                                                <img src={m.homeFlag} className="w-8 h-6 object-cover rounded shadow-sm" alt="" />
                                                            </div>
                                                            
                                                            {/* VS */}
                                                            <span className="font-black text-gray-300 text-lg italic">VS</span>

                                                            {/* Away */}
                                                            <div className="flex items-center gap-3 flex-1 justify-start">
                                                                <img src={m.awayFlag} className="w-8 h-6 object-cover rounded shadow-sm" alt="" />
                                                                <span className={`font-bold text-sm md:text-base ${m.awayTeam === team.name ? 'text-black' : 'text-gray-600'}`}>{m.awayTeam}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stadium (Right side) */}
                                                    <div className="w-full md:w-40 px-4 py-3 md:py-0 flex items-center justify-center md:justify-end text-xs text-gray-400 border-t md:border-t-0 md:border-l border-gray-50 bg-gray-50/30 h-full">
                                                        <MapPin className="w-3.5 h-3.5 mr-1" />
                                                        <span className="truncate">{m.stadium?.split(' ')[0]}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-gray-400 italic bg-gray-50 rounded-lg">
                                                Chưa có lịch thi đấu sắp tới.
                                            </div>
                                        )}
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
                                        teamMatches.map(m => <FixtureItem key={m.id} match={m} teamName={team.name} onClick={onMatchClick} />)
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
