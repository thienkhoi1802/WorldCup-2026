
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, FileText, Users, Calendar, TrendingUp, Clock, MapPin } from 'lucide-react';
import { ALL_TEAMS, NEWS_DATA, UPCOMING_MATCHES } from '../constants';
import { Team, NewsItem, Match } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Search Logic
  const filteredTeams = query ? ALL_TEAMS.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3) : [];
  const filteredNews = query ? NEWS_DATA.filter(n => n.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3) : [];
  const filteredMatches = query ? UPCOMING_MATCHES.filter(m => 
    m.homeTeam.toLowerCase().includes(query.toLowerCase()) || 
    m.awayTeam.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3) : [];

  const hasResults = filteredTeams.length > 0 || filteredNews.length > 0 || filteredMatches.length > 0;

  // Mock Trending Data
  const TRENDING_KEYWORDS = ["Lịch thi đấu hôm nay", "Việt Nam", "Bảng xếp hạng", "Ronaldo", "Vé World Cup"];
  const SUGGESTED_TEAMS = ALL_TEAMS.slice(0, 4); // First 4 teams

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>

      {/* Modal Window */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
        
        {/* Search Header */}
        <div className="flex items-center px-6 py-5 border-b border-gray-100 relative">
            <Search className="w-6 h-6 text-[#9f224e] absolute left-6 top-1/2 -translate-y-1/2" />
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Tìm kiếm đội tuyển, trận đấu, tin tức..." 
                className="flex-1 text-xl outline-none text-gray-900 placeholder:text-gray-400 font-medium pl-10 bg-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button onClick={() => setQuery('')} className="p-2 text-gray-400 hover:text-gray-600 mr-2">
                    <X className="w-5 h-5" />
                </button>
            )}
            <button 
                onClick={onClose} 
                className="hidden sm:flex bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
                ESC
            </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto bg-gray-50/50 min-h-[400px]">
            {!query ? (
                // === DEFAULT STATE: DISCOVERY ===
                <div className="p-6 space-y-8">
                    {/* Trending Keywords */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#9f224e]" /> Xu hướng tìm kiếm
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {TRENDING_KEYWORDS.map((keyword, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setQuery(keyword)}
                                    className="px-4 py-2 bg-white border border-gray-200 hover:border-[#9f224e] hover:text-[#9f224e] text-gray-600 text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md"
                                >
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Suggested Teams */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#9f224e]" /> Đội tuyển nổi bật
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {SUGGESTED_TEAMS.map(team => (
                                <div 
                                    key={team.id}
                                    onClick={() => setQuery(team.name)} 
                                    className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all flex flex-col items-center gap-2 group"
                                >
                                    <img src={team.flag} alt={team.name} className="w-10 h-10 object-cover rounded-full shadow-sm group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-bold text-gray-800 group-hover:text-[#9f224e]">{team.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent News Shortcut */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h5 className="font-bold text-gray-900 text-sm">Lịch thi đấu hôm nay</h5>
                                <p className="text-xs text-gray-500">Xem danh sách các trận sắp diễn ra</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-blue-400" />
                    </div>
                </div>
            ) : !hasResults ? (
                // === EMPTY STATE ===
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-base font-medium text-gray-600">Không tìm thấy kết quả cho "{query}"</p>
                    <p className="text-sm mt-1">Hãy thử tìm kiếm từ khóa khác hoặc tên đội bóng.</p>
                </div>
            ) : (
                // === RESULTS STATE ===
                <div className="p-4 space-y-6">
                    {/* Teams Results */}
                    {filteredTeams.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5"><Users className="w-3.5 h-3.5"/> Đội tuyển</h4>
                            </div>
                            <div>
                                {filteredTeams.map(team => (
                                    <div key={team.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 group">
                                        <img src={team.flag} alt={team.name} className="w-8 h-6 object-cover shadow-sm rounded-sm" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900 group-hover:text-[#9f224e] transition-colors">{team.name}</span>
                                            <span className="text-[10px] text-gray-400 font-medium">{team.region} • {team.group}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[#9f224e]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                     {/* Matches Results */}
                     {filteredMatches.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100">
                                <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Trận đấu</h4>
                            </div>
                            <div>
                                {filteredMatches.map(match => (
                                    <div key={match.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 group">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 min-w-[40px] text-center">{match.time}</span>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    <img src={match.homeFlag} className="w-4 h-3 object-cover rounded-[1px]" />
                                                    <span className="text-sm font-semibold text-gray-900">{match.homeTeam}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img src={match.awayFlag} className="w-4 h-3 object-cover rounded-[1px]" />
                                                    <span className="text-sm font-semibold text-gray-900">{match.awayTeam}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right pl-2">
                                            <span className="block text-[10px] font-bold text-gray-500 uppercase">{match.date}</span>
                                            <div className="flex items-center gap-1 justify-end text-[10px] text-gray-400">
                                                <MapPin className="w-3 h-3" /> {match.stadium?.split(' ')[0]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* News Results */}
                    {filteredNews.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100">
                                <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Tin tức</h4>
                            </div>
                            <div>
                                {filteredNews.map(news => (
                                    <div key={news.id} className="flex items-start gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 group">
                                        <div className="w-16 h-12 shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-100">
                                            <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#9f224e] transition-colors">{news.title}</h5>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold text-white bg-gray-400 px-1.5 rounded-sm">{news.category}</span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> {news.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 text-[10px] text-gray-400 flex justify-between items-center">
            <span className="font-medium">Tìm kiếm nâng cao</span>
            <div className="flex gap-4">
                <span><strong className="text-gray-600 font-bold">Enter</strong> để chọn</span>
                <span><strong className="text-gray-600 font-bold">↑↓</strong> điều hướng</span>
                <span className="sm:hidden"><strong className="text-gray-600 font-bold">Esc</strong> đóng</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
