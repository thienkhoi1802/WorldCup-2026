
import React, { useState, useEffect } from 'react';
import { Search, Heart, X, ChevronRight, Bell, Calendar, MapPin, Newspaper, Shield, Plus, Trash2, Check, ArrowRight } from 'lucide-react';
import { ALL_TEAMS, NEWS_DATA, UPCOMING_MATCHES } from '../constants';
import { Team, Match } from '../types';

interface MyTeamWidgetProps {
    onMatchClick?: (match: Match) => void;
}

const MyTeamWidget: React.FC<MyTeamWidgetProps> = ({ onMatchClick }) => {
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // State for multiple teams
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
        const saved = localStorage.getItem('wc26_fav_teams');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                setMyTeams(parsed);
                setActiveTeamId(parsed[0].id);
            }
        } else {
            // Legacy support
            const legacySaved = localStorage.getItem('wc26_fav_team');
            if (legacySaved) {
                const singleTeam = JSON.parse(legacySaved);
                setMyTeams([singleTeam]);
                setActiveTeamId(singleTeam.id);
                localStorage.setItem('wc26_fav_teams', JSON.stringify([singleTeam]));
            }
        }
    } catch (e) {
        console.error("Failed to parse saved teams", e);
    }
  }, []);

  // Save to local storage whenever list changes
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

  const removeActiveTeam = () => {
    if (!activeTeamId) return;
    if (myTeams.length <= 0) return;

    const newTeams = myTeams.filter(t => t.id !== activeTeamId);
    saveTeams(newTeams);
    
    if (newTeams.length > 0) {
        setActiveTeamId(newTeams[0].id);
    } else {
        setActiveTeamId(null);
        setIsAddingMode(false); 
    }
  };

  const filteredTeams = ALL_TEAMS.filter(team => 
    team.name.toLowerCase().includes(query.toLowerCase())
  );

  const POPULAR_SUGGESTIONS = [
      ALL_TEAMS.find(t => t.name === 'Việt Nam'),
      ALL_TEAMS.find(t => t.name === 'Argentina'),
      ALL_TEAMS.find(t => t.name === 'Brasil'),
      ALL_TEAMS.find(t => t.name === 'Anh'),
      ALL_TEAMS.find(t => t.name === 'Pháp'),
      ALL_TEAMS.find(t => t.name === 'Đức'),
      ALL_TEAMS.find(t => t.name === 'Bồ Đào Nha'),
      ALL_TEAMS.find(t => t.name === 'Tây Ban Nha'),
  ].filter(Boolean) as Team[];

  const activeTeam = myTeams.find(t => t.id === activeTeamId);
  const showEmptyState = myTeams.length === 0;
  const showSearchInterface = showEmptyState || isAddingMode;

  // --- RENDER SEARCH INTERFACE ---
  const SearchInterface = () => (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden relative shadow-sm animate-in fade-in duration-300 ${!showEmptyState ? 'border-t-0 rounded-t-none' : ''}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9f224e] via-purple-600 to-blue-600"></div>
        <div className="p-8 md:p-10 flex flex-col items-center text-center">
            {isAddingMode && (
                <button onClick={() => setIsAddingMode(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
            )}
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5 shadow-sm">
                <Heart className="w-7 h-7 text-[#9f224e] fill-[#9f224e]/10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif uppercase tracking-tight">
                {isAddingMode ? "Thêm đội bóng yêu thích" : "Theo dõi đội bóng của bạn"}
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg text-sm md:text-base leading-relaxed">
                Chọn đội tuyển để xây dựng nguồn cấp dữ liệu riêng: Lịch thi đấu, kết quả, thống kê và tin tức độc quyền.
            </p>
            <div className="relative w-full max-w-xl mb-10 z-20">
                <div className="relative group">
                    <input 
                        type="text" 
                        value={query}
                        onChange={handleSearch}
                        onFocus={() => setIsSearchFocused(true)}
                        placeholder="Tìm kiếm đội tuyển (Ví dụ: Việt Nam, Anh, Brazil...)"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full text-base shadow-sm focus:outline-none focus:border-[#9f224e] focus:ring-4 focus:ring-[#9f224e]/10 transition-all placeholder:text-gray-400"
                        autoFocus={isAddingMode}
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-[#9f224e] transition-colors" />
                    {query && (
                        <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {isSearchFocused && query.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[280px] overflow-y-auto text-left divide-y divide-gray-50">
                        {filteredTeams.length > 0 ? (
                            filteredTeams.map(team => {
                                const isSelected = myTeams.some(t => t.id === team.id);
                                return (
                                    <div 
                                        key={team.id}
                                        onClick={() => !isSelected && addTeam(team)}
                                        className={`flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'opacity-60 cursor-default bg-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={team.flag} alt={team.name} className="w-8 h-5 object-cover shadow-sm rounded-sm border border-gray-200" />
                                            <span className="text-sm font-bold text-gray-900">{team.name}</span>
                                        </div>
                                        {isSelected && <Check className="w-4 h-4 text-green-600" />}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="px-4 py-8 text-sm text-gray-500 text-center italic">Không tìm thấy đội tuyển nào</div>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full max-w-4xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">Đội tuyển phổ biến</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                    {POPULAR_SUGGESTIONS.map(team => {
                        const isSelected = myTeams.some(t => t.id === team.id);
                        return (
                            <button 
                                key={team.id}
                                onClick={() => !isSelected && addTeam(team)}
                                disabled={isSelected}
                                className={`flex flex-col items-center gap-3 p-3 rounded-xl border transition-all duration-300 group relative
                                    ${isSelected 
                                        ? 'bg-gray-50 border-gray-200 opacity-60 grayscale' 
                                        : 'bg-white border-gray-100 hover:border-[#9f224e] hover:shadow-md hover:-translate-y-1'
                                    }
                                `}
                            >
                                <div className="w-12 h-12 rounded-full p-0.5 bg-white border border-gray-100 shadow-sm group-hover:shadow group-hover:scale-110 transition-transform">
                                    <img src={team.flag} className="w-full h-full object-cover rounded-full" alt={team.name} />
                                </div>
                                <span className={`text-xs font-bold truncate w-full px-1 ${isSelected ? 'text-gray-400' : 'text-gray-700 group-hover:text-[#9f224e]'}`}>
                                    {team.name}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-0.5">
                                        <Check className="w-2.5 h-2.5" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  );

  // --- PREPARE DATA ---
  let relatedNews: any[] = [];
  let teamMatches: Match[] = [];

  if (activeTeam) {
    // Logic tìm tin tức: Tìm theo tên hoặc ID. Nếu ít tin quá thì lấy tin rác để demo giao diện
    relatedNews = NEWS_DATA.filter(news => news.title.toLowerCase().includes(activeTeam.name.toLowerCase()));
    if (relatedNews.length < 5) {
        relatedNews = [...relatedNews, ...NEWS_DATA.filter(n => !n.title.toLowerCase().includes(activeTeam.name.toLowerCase())).slice(0, 5 - relatedNews.length)];
    }
    
    teamMatches = UPCOMING_MATCHES.filter(m => m.homeTeam === activeTeam.name || m.awayTeam === activeTeam.name);
    // MOCK Match if empty for Demo
    if (teamMatches.length === 0) {
         teamMatches = [{
            id: `mock-${activeTeam.id}`,
            homeTeam: activeTeam.name,
            homeFlag: activeTeam.flag,
            awayTeam: 'Đối thủ TBD',
            awayFlag: 'https://placehold.co/40x30/EEE/CCC?text=?',
            time: '20:00',
            date: '15/06',
            round: 'Giao hữu',
            status: 'upcoming',
            stadium: 'Sân vận động Quốc gia'
        }];
    }
  }

  // --- RENDER MAIN WIDGET ---
  if (showSearchInterface && showEmptyState) {
      return <SearchInterface />;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden mb-8 shadow-sm animate-in slide-in-from-bottom-2 duration-500 border border-gray-200">
      
      {/* 1. DARK HEADER */}
      <div className="bg-[#1a1a1a] px-2 pt-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {myTeams.map(team => {
              const isActive = team.id === activeTeamId && !isAddingMode;
              return (
                  <button
                    key={team.id}
                    onClick={() => { setActiveTeamId(team.id); setIsAddingMode(false); }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors min-w-fit relative group ${
                        isActive 
                        ? 'bg-white text-black font-bold' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                  >
                      <img src={team.flag} className={`w-5 h-3.5 object-cover rounded-[1px] shadow-sm ${isActive ? '' : 'opacity-70 group-hover:opacity-100'}`} />
                      <span className="text-sm whitespace-nowrap">{team.name}</span>
                  </button>
              );
          })}
          
          <button 
            onClick={() => setIsAddingMode(true)}
            className={`flex items-center justify-center w-10 h-10 rounded-t-lg transition-colors ml-1 ${isAddingMode ? 'bg-white text-[#9f224e]' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
            title="Thêm đội bóng"
          >
              <Plus className="w-5 h-5" />
          </button>
      </div>

      {/* 2. CONTENT AREA */}
      {isAddingMode ? (
          <div className="border-t border-gray-200">
             <SearchInterface />
          </div>
      ) : activeTeam ? (
        <>
            {/* Notification Bar */}
            <div className="px-6 py-2 border-b border-gray-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2 text-[11px] font-bold text-green-600 uppercase tracking-wide">
                     <Bell className="w-3.5 h-3.5 fill-green-600" /> Đang nhận thông báo
                </div>
                <button 
                    onClick={removeActiveTeam}
                    disabled={myTeams.length <= 0}
                    title="Bỏ theo dõi"
                    className="text-[11px] text-gray-300 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                    <Trash2 className="w-3.5 h-3.5" /> Bỏ theo dõi
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 min-h-[400px]">
                
                {/* COLUMN 1: NEWS (Left) */}
                <div className="p-0 flex flex-col">
                    <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
                        <h4 className="text-[#9f224e] font-black text-sm uppercase flex items-center gap-2 tracking-tight">
                            <Newspaper className="w-4 h-4"/> Tin tức {activeTeam.name}
                        </h4>
                        <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-[#9f224e] flex items-center gap-1 transition-colors">
                            Xem thêm <ChevronRight className="w-3 h-3"/>
                        </a>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
                        {relatedNews.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {relatedNews.slice(0, 5).map((news, idx) => (
                                    <div key={news.id} className="flex gap-4 p-5 hover:bg-gray-50 cursor-pointer group transition-colors">
                                        <div className="w-24 h-16 shrink-0 overflow-hidden rounded border border-gray-100 relative">
                                            <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            {idx === 0 && <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
                                        </div>
                                        <div className="flex flex-col justify-start gap-1">
                                            <h5 className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#9f224e] transition-colors">
                                                {news.title}
                                            </h5>
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                                {news.time}
                                                <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                                <Shield className="w-10 h-10 mb-3 opacity-10" />
                                <p className="text-xs font-medium">Chưa có tin tức mới về {activeTeam.name}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMN 2: SCHEDULE (Right) */}
                <div className="p-0 flex flex-col bg-gray-50/30">
                    <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
                        <h4 className="text-[#9f224e] font-black text-sm uppercase flex items-center gap-2 tracking-tight">
                            <Calendar className="w-4 h-4"/> Lịch thi đấu
                        </h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Sắp tới</span>
                    </div>

                    <div className="p-5 flex flex-col gap-4">
                        {teamMatches.slice(0, 2).map(match => (
                            <div 
                                key={match.id} 
                                onClick={() => onMatchClick && onMatchClick(match)}
                                className="bg-white border border-gray-200 rounded-xl p-0 hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all overflow-hidden group"
                            >
                                {/* Header: Date & Stadium */}
                                <div className="bg-gray-50 px-4 py-2 flex justify-between items-center text-[10px] font-bold uppercase text-gray-500 border-b border-gray-100">
                                    <span>{match.date.split(',')[0]} • {match.round}</span>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {match.stadium?.split(' ')[0]}
                                    </div>
                                </div>
                                
                                {/* Match Info */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex flex-col items-center gap-2 w-1/3">
                                        <img src={match.homeFlag} className="w-8 h-5 object-cover rounded-[1px] shadow-sm" />
                                        <span className={`text-xs font-bold text-center leading-tight ${match.homeTeam === activeTeam.name ? 'text-black' : 'text-gray-500'}`}>{match.homeTeam}</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-1/3">
                                        <span className="bg-black text-white text-xs font-black px-2 py-1 rounded mb-1">{match.time}</span>
                                        <span className="text-[9px] font-bold text-gray-300">VS</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 w-1/3">
                                        <img src={match.awayFlag} className="w-8 h-5 object-cover rounded-[1px] shadow-sm" />
                                        <span className={`text-xs font-bold text-center leading-tight ${match.awayTeam === activeTeam.name ? 'text-black' : 'text-gray-500'}`}>{match.awayTeam}</span>
                                    </div>
                                </div>
                                
                                {/* CTA Hover */}
                                <div className="bg-[#9f224e] text-white text-[10px] font-bold uppercase text-center py-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    Xem chi tiết <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        ))}

                        <div className="mt-auto text-center pt-2">
                             <button className="text-xs font-bold text-gray-400 hover:text-[#9f224e] transition-colors border-b border-dashed border-gray-300 hover:border-[#9f224e] pb-0.5">
                                Xem toàn bộ lịch thi đấu
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      ) : null}
    </div>
  );
};

export default MyTeamWidget;
