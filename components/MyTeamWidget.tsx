import React, { useState, useEffect } from 'react';
import { Search, Heart, X, ChevronRight, Bell, Calendar, MapPin } from 'lucide-react';
import { ALL_TEAMS, NEWS_DATA, UPCOMING_MATCHES } from '../constants';
import { Team, Match } from '../types';

interface MyTeamWidgetProps {
    onMatchClick?: (match: Match) => void;
}

const MyTeamWidget: React.FC<MyTeamWidgetProps> = ({ onMatchClick }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteTeam, setFavoriteTeam] = useState<Team | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wc26_fav_team');
    if (saved) {
      try {
        setFavoriteTeam(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved team");
      }
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const selectTeam = (team: Team) => {
    setFavoriteTeam(team);
    localStorage.setItem('wc26_fav_team', JSON.stringify(team));
    setIsOpen(false);
    setQuery('');
  };

  const removeTeam = () => {
    setFavoriteTeam(null);
    localStorage.removeItem('wc26_fav_team');
  };

  const filteredTeams = ALL_TEAMS.filter(team => 
    team.name.toLowerCase().includes(query.toLowerCase())
  );

  // Filter news related to the team
  const relatedNews = favoriteTeam 
    ? NEWS_DATA.filter(news => news.title.toLowerCase().includes(favoriteTeam.name.toLowerCase()) || news.title.includes(favoriteTeam.id))
    : [];

  // Filter matches for the team
  let teamMatches = favoriteTeam
    ? UPCOMING_MATCHES.filter(m => m.homeTeam === favoriteTeam.name || m.awayTeam === favoriteTeam.name)
    : [];
    
  // MOCK: If no matches found in the short list, generate a fake upcoming one for "Dự kiến" view
  if (favoriteTeam && teamMatches.length === 0) {
      teamMatches = [{
          id: `mock-${favoriteTeam.id}`,
          homeTeam: favoriteTeam.name,
          homeFlag: favoriteTeam.flag,
          awayTeam: 'Đối thủ xác định sau',
          awayFlag: 'https://placehold.co/40x30/EEE/CCC?text=?',
          time: '20:00',
          date: '15/06',
          round: 'Giao hữu quốc tế',
          status: 'upcoming',
          stadium: 'Sân vận động Quốc gia'
      }];
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
      <div className="bg-gradient-to-r from-gray-900 to-black px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm uppercase font-serif tracking-wide flex items-center gap-2">
            <Heart className={`w-4 h-4 ${favoriteTeam ? 'text-[#9f224e] fill-[#9f224e]' : 'text-gray-400'}`} />
            Đội bóng của tôi
        </h3>
        {favoriteTeam && (
            <button onClick={removeTeam} className="text-xs text-gray-400 hover:text-white underline">
                Thay đổi
            </button>
        )}
      </div>

      <div className="p-4 bg-gray-50/50">
        {!favoriteTeam ? (
          // STATE 1: SEARCH
          <div className="relative">
            <p className="text-sm text-gray-600 mb-3">Chọn đội tuyển để nhận tin tức riêng:</p>
            <div className="relative">
                <input 
                    type="text" 
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Tìm kiếm đội tuyển (VN, Anh, Đức...)"
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                {query && (
                    <button onClick={() => setQuery('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && query.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-[200px] overflow-y-auto">
                    {filteredTeams.length > 0 ? (
                        filteredTeams.map(team => (
                            <div 
                                key={team.id}
                                onClick={() => selectTeam(team)}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                            >
                                <img src={team.flag} alt={team.name} className="w-6 h-4 object-cover shadow-sm" />
                                <span className="text-sm font-medium text-gray-900">{team.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy đội tuyển</div>
                    )}
                </div>
            )}
          </div>
        ) : (
          // STATE 2: DASHBOARD
          <div className="flex flex-col gap-4">
             {/* Header Info */}
             <div className="flex items-center gap-4 bg-white p-3 rounded border border-gray-100 shadow-sm">
                <img src={favoriteTeam.flag} alt={favoriteTeam.name} className="w-12 h-8 object-cover shadow-sm rounded-sm" />
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 leading-none">{favoriteTeam.name}</span>
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        <Bell className="w-3 h-3" /> Đang theo dõi
                    </span>
                </div>
             </div>

             {/* UPCOMING FIXTURES */}
             <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> Lịch thi đấu (Dự kiến)</span>
                </div>
                <div className="bg-white border border-gray-200 rounded divide-y divide-gray-100">
                    {teamMatches.map(match => (
                        <div 
                            key={match.id} 
                            onClick={() => onMatchClick && onMatchClick(match)}
                            className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                             <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold mb-2">
                                <span>{match.date}</span>
                                <span>{match.round}</span>
                             </div>
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">{match.homeTeam === favoriteTeam.name ? 'vs ' + match.awayTeam : 'vs ' + match.homeTeam}</span>
                                </div>
                                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-700">{match.time}</span>
                             </div>
                             {match.stadium && (
                                 <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                     <MapPin className="w-2.5 h-2.5" /> {match.stadium}
                                 </div>
                             )}
                        </div>
                    ))}
                </div>
             </div>

             {/* Personalized News List */}
             <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase">Tin mới nhất</span>
                </div>
                {relatedNews.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {relatedNews.slice(0, 3).map(news => (
                            <a key={news.id} href="#" className="group flex flex-col gap-1 hover:bg-white transition-colors">
                                <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-[#9f224e] line-clamp-2">
                                    {news.title}
                                </h4>
                                <span className="text-[10px] text-gray-400">{news.time}</span>
                            </a>
                        ))}
                         <a href="#" className="text-xs text-[#9f224e] font-medium hover:underline flex items-center gap-1 mt-1">
                            Xem tất cả tin {favoriteTeam.name} <ChevronRight className="w-3 h-3" />
                         </a>
                    </div>
                ) : (
                    <div className="text-center py-4 bg-gray-50 rounded border border-dashed border-gray-200">
                        <p className="text-xs text-gray-500">Chưa có tin tức mới về {favoriteTeam.name} hôm nay.</p>
                    </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeamWidget;