
import React, { useState, useEffect } from 'react';
import { Search, Heart, X, ChevronRight, Bell, MapPin, Newspaper,  Plus, Trash2, Check, ArrowRight, Clock, Trophy, TrendingUp, Activity, BarChart3, Shield, Star } from 'lucide-react';
import { ALL_TEAMS, NEWS_DATA, UPCOMING_MATCHES } from '../constants';
import { Team, Match } from '../types';

interface MyTeamWidgetProps {
    onMatchClick?: (match: Match) => void;
    onTeamClick?: (team: Team) => void;
}

const MyTeamWidget: React.FC<MyTeamWidgetProps> = ({ onMatchClick, onTeamClick }) => {
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
        const saved = localStorage.getItem('wc26_fav_teams');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                setMyTeams(parsed);
                setActiveTeamId(parsed[0].id);
            } else {
                setIsAddingMode(true); // Auto open add mode if no teams
            }
        } else {
            setIsAddingMode(true);
        }
    } catch (e) {
        console.error("Failed to parse saved teams", e);
    }
  }, []);

  const saveTeams = (teams: Team[]) => {
      setMyTeams(teams);
      localStorage.setItem('wc26_fav_teams', JSON.stringify(teams));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsSearchFocused(true);
  };

  const addTeam = (team: Team) => {
    if (!myTeams.find(t => t.id === team.id)) {
        const newTeams = [...myTeams, team];
        saveTeams(newTeams);
    }
    setActiveTeamId(team.id);
    setIsAddingMode(false);
    setQuery('');
    setIsSearchFocused(false);
  };

  const removeTeam = (e: React.MouseEvent, teamId: string) => {
    e.stopPropagation(); 
    const newTeams = myTeams.filter(t => t.id !== teamId);
    saveTeams(newTeams);
    
    if (activeTeamId === teamId) {
        if (newTeams.length > 0) {
            setActiveTeamId(newTeams[0].id);
        } else {
            setActiveTeamId(null);
            setIsAddingMode(true); 
        }
    }
  };

  const handleTeamClick = (teamName: string) => {
      if (!onTeamClick) return;
      const team = ALL_TEAMS.find(t => t.name === teamName);
      if (team) onTeamClick(team);
  };

  const filteredTeams = ALL_TEAMS.filter(team => 
    team.name.toLowerCase().includes(query.toLowerCase())
  );

  // Top 8 Teams for Quick Selection (Expanded)
  const TOP_8_SUGGESTIONS = [
      ALL_TEAMS.find(t => t.name === 'Việt Nam'),
      ALL_TEAMS.find(t => t.name === 'Anh'),
      ALL_TEAMS.find(t => t.name === 'Brasil'),
      ALL_TEAMS.find(t => t.name === 'Argentina'),
      ALL_TEAMS.find(t => t.name === 'Đức'),
      ALL_TEAMS.find(t => t.name === 'Pháp'),
      ALL_TEAMS.find(t => t.name === 'Bồ Đào Nha'),
      ALL_TEAMS.find(t => t.name === 'Tây Ban Nha'),
  ].filter(Boolean) as Team[];

  const activeTeam = myTeams.find(t => t.id === activeTeamId);
  const showEmptyState = myTeams.length === 0;

  // UI Theme Helpers
  const getTeamColorClass = (team?: Team) => {
      if (!team) return 'text-[#9f224e]';
      if (team.displayColor?.includes('red')) return 'text-red-700';
      if (team.displayColor?.includes('blue')) return 'text-blue-700';
      if (team.displayColor?.includes('green')) return 'text-green-700';
      if (team.displayColor?.includes('yellow')) return 'text-yellow-700';
      return 'text-[#9f224e]'; 
  };
  
  const getTeamBgClass = (team?: Team) => {
      if (!team) return 'bg-[#9f224e]';
      if (team.displayColor?.includes('red')) return 'bg-red-600';
      if (team.displayColor?.includes('blue')) return 'bg-blue-600';
      if (team.displayColor?.includes('green')) return 'bg-green-600';
      if (team.displayColor?.includes('yellow')) return 'bg-yellow-500';
      if (team.displayColor?.includes('orange')) return 'bg-orange-500';
      return 'bg-[#9f224e]';
  };

  // --- COMPONENT: EMPTY / ADD STATE ---
  const AddTeamInterface = () => (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9f224e]/20 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#9f224e]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 z-10">
            
            {/* Header Text */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-black text-gray-900 font-serif uppercase tracking-tight flex items-center justify-center gap-2 mb-1">
                    <Heart className="w-5 h-5 text-[#9f224e] fill-[#9f224e]" /> Chọn đội bóng yêu thích
                </h3>
                <p className="text-gray-500 text-xs font-medium">Theo dõi để nhận thông báo lịch thi đấu và tin tức độc quyền.</p>
            </div>

            {/* 1. TOP 8 TEAMS GRID (4x2 Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-8">
                {TOP_8_SUGGESTIONS.map(team => {
                    const isSelected = myTeams.some(t => t.id === team.id);
                    return (
                        <button 
                            key={team.id}
                            onClick={() => !isSelected && addTeam(team)}
                            disabled={isSelected}
                            className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 group relative
                                ${isSelected 
                                    ? 'bg-gray-50 border-gray-100 opacity-60 grayscale cursor-default' 
                                    : 'bg-white border-gray-200 hover:border-[#9f224e] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                                }
                            `}
                        >
                            <div className="w-12 h-8 mb-2 shadow-sm rounded overflow-hidden border border-gray-100 relative">
                                <img src={team.flag} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt={team.name} />
                            </div>
                            
                            <span className={`text-xs font-bold truncate w-full text-center mb-2 ${isSelected ? 'text-gray-400' : 'text-gray-900 group-hover:text-[#9f224e]'}`}>
                                {team.name}
                            </span>
                            
                            {/* Follow Button within Card */}
                            <div className={`w-full py-1.5 rounded-full text-[9px] font-bold uppercase flex items-center justify-center gap-1 transition-colors ${
                                isSelected 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'bg-[#9f224e]/5 text-[#9f224e] group-hover:bg-[#9f224e] group-hover:text-white'
                            }`}>
                                {isSelected ? <Check className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                                {isSelected ? 'Đã chọn' : 'Theo dõi'}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* 2. SEARCH BAR (Below Grid) */}
            <div className="w-full max-w-md relative z-20">
                <div className="relative group">
                    <input 
                        type="text" 
                        value={query}
                        onChange={handleSearch}
                        onFocus={() => setIsSearchFocused(true)}
                        placeholder="Tìm kiếm đội tuyển khác..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#9f224e] focus:ring-4 focus:ring-[#9f224e]/5 transition-all shadow-sm hover:shadow-md hover:border-gray-300"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-hover:text-[#9f224e] transition-colors" />
                    
                    {/* Search Dropdown */}
                    {isSearchFocused && query.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-[200px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map(team => {
                                    const isSelected = myTeams.some(t => t.id === team.id);
                                    return (
                                        <div 
                                            key={team.id} 
                                            onClick={() => !isSelected && addTeam(team)} 
                                            className={`flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${isSelected ? 'opacity-50 cursor-default' : ''}`}
                                        >
                                            <img src={team.flag} className="w-6 h-4 object-cover rounded shadow-sm" />
                                            <span className="text-sm font-bold text-gray-800">{team.name}</span>
                                            {isSelected ? <Check className="w-4 h-4 ml-auto text-green-600" /> : <Plus className="w-4 h-4 ml-auto text-gray-300" />}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="px-4 py-4 text-xs text-center text-gray-400">Không tìm thấy kết quả</div>
                            )}
                        </div>
                    )}
                </div>
                <div className="text-center mt-3">
                    <span className="text-[10px] text-gray-400 font-medium">
                        Tìm kiếm trong 48 đội tuyển tham dự World Cup 2026
                    </span>
                </div>
            </div>

        </div>
    </div>
  );

  // --- PREPARE DATA ---
  let relatedNews: any[] = [];
  let teamMatches: Match[] = [];
  let nextMatch: Match | null = null;
  const accentColor = getTeamColorClass(activeTeam);
  const accentBg = getTeamBgClass(activeTeam);

  const homeWinProb = 44; 
  const awayWinProb = 41;

  if (activeTeam) {
    relatedNews = NEWS_DATA.filter(news => news.title.toLowerCase().includes(activeTeam.name.toLowerCase()));
    if (relatedNews.length < 4) {
        relatedNews = [...relatedNews, ...NEWS_DATA.filter(n => !n.title.toLowerCase().includes(activeTeam.name.toLowerCase())).slice(0, 4 - relatedNews.length)];
    }
    
    teamMatches = UPCOMING_MATCHES.filter(m => m.homeTeam === activeTeam.name || m.awayTeam === activeTeam.name);
    
    if (teamMatches.length > 0) {
        nextMatch = teamMatches[0];
    } else {
         nextMatch = {
            id: `mock-${activeTeam.id}`,
            homeTeam: activeTeam.name,
            homeFlag: activeTeam.flag,
            awayTeam: 'Maroc',
            awayFlag: 'https://flagcdn.com/w40/ma.png',
            time: '05:00',
            date: 'Chủ Nhật, 14/06/2026',
            round: 'Bảng C',
            status: 'upcoming',
            stadium: 'MetLife Stadium'
        };
    }
  }

  // --- RENDER MAIN WIDGET ---
  return (
    <div className="max-w-[1100px] mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 h-[460px] flex flex-col transition-all duration-300"> {/* FIXED HEIGHT 460PX */}
        
        {/* HEADER: TITLE + TABS */}
        <div className="shrink-0 bg-white border-b border-gray-200">
             {/* Title Row */}
             <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#9f224e] fill-[#9f224e]" />
                    <h3 className="text-[#9f224e] font-black text-lg uppercase font-serif tracking-tight">Đội bóng tôi yêu</h3>
                </div>
                {!showEmptyState && !isAddingMode && (
                    <div className="flex items-center gap-2">
                        <span className="flex w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Live Updates</span>
                    </div>
                )}
            </div>

            {/* Tabs Row - Scrollable if many teams */}
            <div className="flex items-center px-2 gap-1 overflow-x-auto no-scrollbar bg-gray-50/50">
                {myTeams.map(team => {
                    const isActive = team.id === activeTeamId && !isAddingMode;
                    return (
                        <button
                            key={team.id}
                            onClick={() => { setActiveTeamId(team.id); setIsAddingMode(false); }}
                            className={`group relative flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-all min-w-fit border-b-2 ${
                                isActive 
                                ? `bg-white text-gray-900 border-[#9f224e] shadow-sm rounded-t-lg` 
                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-t-lg'
                            }`}
                        >
                            <img src={team.flag} className={`w-5 h-3.5 object-cover rounded-[1px] shadow-sm ${isActive ? '' : 'opacity-80 grayscale-[0.5]'}`} />
                            <span className="whitespace-nowrap">{team.name}</span>
                            
                            {/* Hover Remove */}
                            <div 
                                onClick={(e) => removeTeam(e, team.id)}
                                className="w-4 h-4 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ml-1"
                            >
                                <X className="w-2.5 h-2.5" />
                            </div>
                        </button>
                    );
                })}
                
                {/* Show Add Button if there are teams, otherwise the whole body is the add interface */}
                {!showEmptyState && (
                    <button 
                        onClick={() => setIsAddingMode(true)}
                        className={`flex items-center justify-center w-9 h-9 ml-1 rounded-t-lg transition-colors ${isAddingMode ? 'bg-[#9f224e] text-white shadow-sm' : 'text-gray-400 hover:bg-gray-200 hover:text-black'}`}
                        title="Thêm đội bóng"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 min-h-0 relative">
            {isAddingMode || showEmptyState ? (
                <AddTeamInterface />
            ) : activeTeam && nextMatch ? (
                <div className="flex flex-col md:flex-row h-full">
                    
                    {/* LEFT: NEWS FEED (3 Column Grid) */}
                    <div className="flex-1 flex flex-col min-w-0 border-r border-gray-100 bg-white">
                        <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between bg-white shrink-0">
                            <h4 className={`font-black text-sm uppercase flex items-center gap-2 tracking-widest ${accentColor}`}>
                                <Newspaper className="w-4 h-4"/> Tin mới về {activeTeam.name}
                            </h4>
                            <button 
                                onClick={() => onTeamClick && onTeamClick(activeTeam)}
                                className="text-[10px] font-bold text-gray-400 hover:text-[#9f224e] flex items-center gap-1 transition-colors uppercase"
                            >
                                Xem tất cả <ChevronRight className="w-3 h-3"/>
                            </button>
                        </div>

                        {/* Grid 3 Items - Columns */}
                        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 h-full">
                                {relatedNews.slice(0, 3).map((news, idx) => (
                                    <div key={news.id} className="group cursor-pointer flex flex-col gap-3 h-full">
                                        <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 relative shadow-sm border border-gray-100">
                                            <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            {idx === 0 && <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">MỚI</span>}
                                        </div>
                                        <div className="flex flex-col flex-1 gap-1.5">
                                            <h5 className="text-[15px] md:text-[16px] font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-[#9f224e] transition-colors">
                                                {news.title}
                                            </h5>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mt-auto">
                                                <span className="truncate">{news.time}</span>
                                                <span className="w-0.5 h-2 bg-gray-300"></span>
                                                <span className="uppercase tracking-wide text-gray-500">{news.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: NEXT MATCH SPOTLIGHT (Visual Upgrade) */}
                    <div className="w-full md:w-[360px] bg-gray-50 flex flex-col relative shrink-0">
                         {/* Header */}
                         <div className="px-5 py-3 border-b border-gray-200 bg-white shrink-0">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#d8a709]">
                                <Trophy className="w-4 h-4" /> Trận đấu tiếp theo
                            </div>
                         </div>
                        
                         {/* Match Content */}
                         <div className="flex-1 p-6 flex flex-col justify-center relative overflow-hidden">
                             {/* Background Decoration */}
                             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                             
                             {/* Teams Row */}
                             <div className="flex items-center justify-between mb-6 relative z-10">
                                 {/* Home */}
                                 <div 
                                    className="flex flex-col items-center gap-2 group cursor-pointer"
                                    onClick={() => handleTeamClick(nextMatch!.homeTeam)}
                                 >
                                     <div className="relative">
                                         <img src={nextMatch.homeFlag} className="w-16 h-11 object-cover rounded shadow-md border border-white group-hover:scale-110 transition-transform duration-300" />
                                         <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                             <Shield className="w-3 h-3 text-gray-400" />
                                         </div>
                                     </div>
                                     <span className="text-sm font-black uppercase text-gray-900 tracking-tight">{nextMatch.homeTeam}</span>
                                     <div className="flex gap-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                     </div>
                                 </div>

                                 {/* VS */}
                                 <div className="flex flex-col items-center gap-1">
                                    <span className="text-gray-300 font-black text-xl italic">VS</span>
                                    <span className="text-[9px] font-bold text-gray-400 bg-gray-200 px-1.5 rounded uppercase">{nextMatch.round?.replace('Bảng', '')}</span>
                                 </div>

                                 {/* Away */}
                                 <div 
                                    className="flex flex-col items-center gap-2 group cursor-pointer"
                                    onClick={() => handleTeamClick(nextMatch!.awayTeam)}
                                 >
                                     <div className="relative">
                                         <img src={nextMatch.awayFlag} className="w-16 h-11 object-cover rounded shadow-md border border-white group-hover:scale-110 transition-transform duration-300" />
                                     </div>
                                     <span className="text-sm font-black uppercase text-gray-900 tracking-tight">{nextMatch.awayTeam}</span>
                                     <div className="flex gap-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                     </div>
                                 </div>
                             </div>

                             {/* Time Ticket */}
                             <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-5 text-center relative group cursor-pointer hover:border-[#d8a709] transition-colors">
                                 <div className="absolute top-1 right-2 flex gap-1">
                                     <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#d8a709]"></span>
                                     <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#d8a709]"></span>
                                     <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#d8a709]"></span>
                                 </div>
                                 <div className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-1">
                                     {nextMatch.time}
                                 </div>
                                 <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                                     {nextMatch.date}
                                 </div>
                             </div>

                             {/* Win Prob */}
                             <div className="mb-6">
                                 <div className="flex justify-between items-end mb-1.5">
                                     <span className="text-xs font-bold text-gray-900">{homeWinProb}%</span>
                                     <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1"><BarChart3 className="w-3 h-3"/> Xác suất thắng</span>
                                     <span className="text-xs font-bold text-gray-900">{awayWinProb}%</span>
                                 </div>
                                 <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-200 w-full">
                                     <div className="bg-[#d8a709]" style={{ width: `${homeWinProb}%` }}></div>
                                     <div className="bg-gray-300 flex-1"></div>
                                     <div className="bg-gray-800" style={{ width: `${awayWinProb}%` }}></div>
                                 </div>
                                 <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-medium">
                                     <span>{nextMatch.homeTeam}</span>
                                     <span>Hòa</span>
                                     <span>{nextMatch.awayTeam}</span>
                                 </div>
                             </div>

                             {/* Location & CTA */}
                             <div className="mt-auto text-center">
                                 <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase mb-3">
                                     <MapPin className="w-3 h-3" /> {nextMatch.stadium}
                                 </div>
                                 <button 
                                    onClick={() => onMatchClick && onMatchClick(nextMatch!)}
                                    className="w-full bg-[#d8a709] hover:bg-[#c49608] text-white text-xs font-black uppercase py-3 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                                 >
                                     Xem chi tiết & Đội hình <ArrowRight className="w-3.5 h-3.5" />
                                 </button>
                             </div>
                         </div>
                    </div>
                </div>
            ) : null}
        </div>
        </div>
    </div>
  );
};

export default MyTeamWidget;
