
import React, { useState, useEffect } from 'react';
import { Search, Heart, X, ChevronRight, Bell, Calendar, MapPin, Newspaper, Shield, Plus, Trash2 } from 'lucide-react';
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
            // Legacy support: check for single team saved previously
            const legacySaved = localStorage.getItem('wc26_fav_team');
            if (legacySaved) {
                const singleTeam = JSON.parse(legacySaved);
                setMyTeams([singleTeam]);
                setActiveTeamId(singleTeam.id);
                // Migrate to new key
                localStorage.setItem('wc26_fav_teams', JSON.stringify([singleTeam]));
                localStorage.removeItem('wc26_fav_team');
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
    const newTeams = myTeams.filter(t => t.id !== activeTeamId);
    saveTeams(newTeams);
    
    if (newTeams.length > 0) {
        setActiveTeamId(newTeams[0].id);
    } else {
        setActiveTeamId(null);
        setIsAddingMode(false); // Will revert to initial empty state
    }
  };

  const filteredTeams = ALL_TEAMS.filter(team => 
    team.name.toLowerCase().includes(query.toLowerCase())
  );

  // Determine current view state
  const activeTeam = myTeams.find(t => t.id === activeTeamId);
  const showEmptyState = myTeams.length === 0;
  const showSearchInterface = showEmptyState || isAddingMode;

  // --- RENDER SEARCH INTERFACE (Empty State or Add Mode) ---
  const SearchInterface = () => (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm flex flex-col items-center text-center animate-in fade-in duration-300 ${!showEmptyState ? 'border-t-0 rounded-t-none' : ''}`}>
        {!isAddingMode ? (
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-gray-400" />
            </div>
        ) : (
            <button onClick={() => setIsAddingMode(false)} className="self-end text-gray-400 hover:text-black mb-2">
                <X className="w-5 h-5" />
            </button>
        )}
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">
            {isAddingMode ? "Thêm đội bóng yêu thích" : "Theo dõi đội bóng của bạn"}
        </h3>
        <p className="text-sm text-gray-500 mb-5 max-w-md">
            Chọn đội tuyển để xây dựng nguồn cấp dữ liệu riêng: Lịch thi đấu, kết quả và tin tức độc quyền.
        </p>

        <div className="relative w-full max-w-md">
            <div className="relative">
                <input 
                    type="text" 
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Tìm kiếm đội tuyển (Ví dụ: Việt Nam, Anh, Brazil...)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e] shadow-sm transition-all"
                    autoFocus={isAddingMode}
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                {query && (
                    <button onClick={() => setQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isSearchFocused && query.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-[200px] overflow-y-auto text-left">
                    {filteredTeams.length > 0 ? (
                        filteredTeams.map(team => (
                            <div 
                                key={team.id}
                                onClick={() => addTeam(team)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                            >
                                <img src={team.flag} alt={team.name} className="w-6 h-4 object-cover shadow-sm rounded-sm" />
                                <span className="text-sm font-bold text-gray-900">{team.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy đội tuyển</div>
                    )}
                </div>
            )}
        </div>

        {/* Quick Suggestions */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
            {ALL_TEAMS.slice(0, 5).map(team => (
                <button 
                    key={team.id}
                    onClick={() => addTeam(team)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-full transition-all text-xs font-medium text-gray-700"
                >
                    <img src={team.flag} className="w-4 h-3 object-cover rounded-[1px]" />
                    {team.name}
                </button>
            ))}
        </div>
    </div>
  );

  // --- PREPARE DATA FOR ACTIVE TEAM ---
  let relatedNews: any[] = [];
  let teamMatches: Match[] = [];

  if (activeTeam) {
    relatedNews = NEWS_DATA.filter(news => news.title.toLowerCase().includes(activeTeam.name.toLowerCase()) || news.title.includes(activeTeam.id));
    teamMatches = UPCOMING_MATCHES.filter(m => m.homeTeam === activeTeam.name || m.awayTeam === activeTeam.name);
    
    // MOCK: If no matches found
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

  // --- RENDER ---
  
  if (showSearchInterface && showEmptyState) {
      return <SearchInterface />;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm animate-in slide-in-from-bottom-2 duration-500">
      
      {/* 1. TEAMS TAB HEADER */}
      <div className="bg-[#111] px-2 pt-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {myTeams.map(team => {
              const isActive = team.id === activeTeamId && !isAddingMode;
              return (
                  <button
                    key={team.id}
                    onClick={() => { setActiveTeamId(team.id); setIsAddingMode(false); }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-colors min-w-fit ${
                        isActive 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                    }`}
                  >
                      <img src={team.flag} className="w-5 h-3.5 object-cover rounded-[1px]" />
                      <span className="text-sm font-bold whitespace-nowrap">{team.name}</span>
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
          // Reuse Search Interface inside the widget box
          <div className="border-t border-gray-100">
             <SearchInterface />
          </div>
      ) : activeTeam ? (
        <>
            {/* Toolbar */}
            <div className="px-6 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wide">
                     <Bell className="w-3.5 h-3.5" /> Đang nhận thông báo
                </div>
                <button 
                    onClick={removeActiveTeam}
                    className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                    <Trash2 className="w-3.5 h-3.5" /> Bỏ theo dõi
                </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                
                {/* COLUMN 1: RELATED NEWS (NOW FIRST/LEFT) */}
                <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[#9f224e] font-bold text-sm uppercase flex items-center gap-2">
                            <Newspaper className="w-4 h-4"/> Tin tức {activeTeam.name}
                        </h4>
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-[#9f224e] flex items-center gap-1">
                            Xem thêm <ChevronRight className="w-3 h-3"/>
                        </a>
                    </div>

                    <div className="flex flex-col gap-4">
                        {relatedNews.length > 0 ? (
                            relatedNews.slice(0, 3).map(news => (
                                <div key={news.id} className="flex gap-3 group cursor-pointer">
                                    <div className="w-20 h-14 shrink-0 overflow-hidden rounded border border-gray-100">
                                        <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col justify-between py-0.5">
                                        <h5 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#9f224e] transition-colors">
                                            {news.title}
                                        </h5>
                                        <span className="text-[10px] text-gray-400 font-medium">{news.time}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-4 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                                <Shield className="w-8 h-8 mb-2 opacity-20" />
                                <p className="text-xs">Chưa có tin tức mới</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMN 2: MATCH SCHEDULE (NOW SECOND/RIGHT) */}
                <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[#9f224e] font-bold text-sm uppercase flex items-center gap-2">
                            <Calendar className="w-4 h-4"/> Lịch thi đấu
                        </h4>
                        <span className="text-xs font-medium text-gray-400">Sắp tới</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {teamMatches.slice(0, 3).map(match => (
                            <div 
                                key={match.id} 
                                onClick={() => onMatchClick && onMatchClick(match)}
                                className="border border-gray-200 rounded-lg p-3 hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all bg-gray-50/50"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase">{match.date} • {match.round}</span>
                                    <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{match.time}</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold ${match.homeTeam === activeTeam.name ? 'text-gray-900' : 'text-gray-500'}`}>{match.homeTeam}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-300 mx-2">VS</span>
                                    <div className="flex items-center gap-2 text-right">
                                        <span className={`text-sm font-bold ${match.awayTeam === activeTeam.name ? 'text-gray-900' : 'text-gray-500'}`}>{match.awayTeam}</span>
                                    </div>
                                </div>
                                {match.stadium && (
                                    <div className="mt-2 pt-2 border-t border-gray-200/50 flex items-center gap-1 text-[10px] text-gray-400 truncate">
                                        <MapPin className="w-3 h-3" /> {match.stadium}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
      ) : null}
    </div>
  );
};

export default MyTeamWidget;
