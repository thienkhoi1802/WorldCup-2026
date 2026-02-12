import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, FileText, Users, Calendar } from 'lucide-react';
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
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        // Focus input
        setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Keyboard shortcut ESC to close
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
  ).slice(0, 2) : [];

  const hasResults = filteredTeams.length > 0 || filteredNews.length > 0 || filteredMatches.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Window */}
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[80vh] animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-gray-200 py-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Tìm kiếm tin tức, đội tuyển, lịch thi đấu..." 
                className="flex-1 text-lg outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={onClose} className="p-1 bg-gray-100 rounded text-gray-500 hover:text-black text-xs font-bold px-2">ESC</button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-2 bg-gray-50/50 min-h-[300px]">
            {!query ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                    <Search className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">Nhập từ khóa để bắt đầu tìm kiếm</p>
                    <div className="mt-6 flex gap-2">
                        <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded cursor-pointer hover:border-[#9f224e] transition-colors">Việt Nam</span>
                        <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded cursor-pointer hover:border-[#9f224e] transition-colors">Lịch thi đấu</span>
                        <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded cursor-pointer hover:border-[#9f224e] transition-colors">Ronaldo</span>
                    </div>
                </div>
            ) : !hasResults ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                    Không tìm thấy kết quả cho "{query}"
                </div>
            ) : (
                <div className="space-y-4 p-2">
                    {/* Teams Results */}
                    {filteredTeams.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 px-2 flex items-center gap-1"><Users className="w-3 h-3"/> Đội tuyển</h4>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {filteredTeams.map(team => (
                                    <div key={team.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                                        <img src={team.flag} alt={team.name} className="w-6 h-4 object-cover shadow-sm" />
                                        <span className="text-sm font-bold text-gray-900">{team.name}</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                     {/* Matches Results */}
                     {filteredMatches.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 px-2 flex items-center gap-1"><Calendar className="w-3 h-3"/> Trận đấu</h4>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {filteredMatches.map(match => (
                                    <div key={match.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">{match.homeTeam}</span>
                                            <span className="text-xs text-gray-400">vs</span>
                                            <span className="text-sm font-semibold">{match.awayTeam}</span>
                                        </div>
                                        <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{match.time} {match.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* News Results */}
                    {filteredNews.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 px-2 flex items-center gap-1"><FileText className="w-3 h-3"/> Tin tức</h4>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {filteredNews.map(news => (
                                    <div key={news.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                                        <div className="flex-1">
                                            <h5 className="text-sm font-medium text-gray-900 line-clamp-1">{news.title}</h5>
                                            <p className="text-xs text-gray-500 mt-0.5">{news.time}</p>
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
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-[10px] text-gray-400 flex justify-end gap-3">
            <span><strong className="text-gray-600">Enter</strong> để chọn</span>
            <span><strong className="text-gray-600">↑↓</strong> điều hướng</span>
            <span><strong className="text-gray-600">Esc</strong> để đóng</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;