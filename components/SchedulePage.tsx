
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { UPCOMING_MATCHES, ALL_TEAMS } from '../constants';
import { Match, Team } from '../types';
import { MapPin, Calendar, Filter, ChevronRight, Search, X } from 'lucide-react';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';
import TriviaWidget from './TriviaWidget';

interface SchedulePageProps {
  onMatchClick: (match: Match) => void;
  onTeamClick?: (team: Team) => void;
  onBack?: () => void;
}

const STAGE_ORDER = [
    { id: 'group', label: 'VÒNG BẢNG' },
    { id: 'r32', label: 'VÒNG 1/32' },
    { id: 'r16', label: 'VÒNG 1/16' },
    { id: 'qf', label: 'TỨ KẾT' },
    { id: 'sf', label: 'BÁN KẾT' },
    { id: '3rd', label: 'TRANH HẠNG 3' },
    { id: 'final', label: 'CHUNG KẾT' }
];

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const SchedulePage: React.FC<SchedulePageProps> = ({ onMatchClick, onTeamClick }) => {
  const [activeStageId, setActiveStageId] = useState('group'); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const filterPanelRef = useRef<HTMLDivElement>(null);

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizeStage = (round: string): string => {
      if (!round) return 'VÒNG BẢNG';
      if (round.includes('Bảng')) return 'VÒNG BẢNG';
      if (round.includes('Vòng 1/32')) return 'VÒNG 1/32';
      if (round.includes('Vòng 1/16')) return 'VÒNG 1/16';
      if (round.includes('Tứ kết')) return 'TỨ KẾT';
      if (round.includes('Bán kết')) return 'BÁN KẾT';
      if (round.includes('Tranh hạng 3')) return 'TRANH HẠNG 3';
      if (round.includes('Chung kết')) return 'CHUNG KẾT';
      return 'VÒNG BẢNG';
  };

  const filteredTeams = useMemo(() => {
    return ALL_TEAMS.filter(t => 
      t.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
    ).slice(0, 10);
  }, [teamSearchQuery]);

  // Main Logic for grouping and filtering matches
  const displayData = useMemo(() => {
      const filtered = UPCOMING_MATCHES.filter(match => {
          if (selectedTeam) {
              const isHome = match.homeTeam.toLowerCase() === selectedTeam.name.toLowerCase();
              const isAway = match.awayTeam.toLowerCase() === selectedTeam.name.toLowerCase();
              if (!isHome && !isAway) return false;
          }
          if (selectedGroup) {
              if (!match.round?.includes(`Bảng ${selectedGroup}`)) return false;
          }
          return true;
      });

      // Default: Sort by Date
      const groups: Record<string, Record<string, Match[]>> = {}; 
      STAGE_ORDER.forEach(stage => { groups[stage.label] = {}; });

      filtered.forEach(match => {
          const stageName = normalizeStage(match.round || '');
          if (!groups[stageName]) groups[stageName] = {};
          const dateKey = match.date;
          if (!groups[stageName][dateKey]) groups[stageName][dateKey] = [];
          groups[stageName][dateKey].push(match);
      });
      return groups;
  }, [selectedTeam, selectedGroup]);

  const hasMatches = (stageLabel: string) => {
      const stageContent = displayData[stageLabel] || {};
      return Object.keys(stageContent).length > 0;
  };

  const scrollToSection = (stageId: string) => {
      setActiveStageId(stageId);
      const element = sectionRefs.current[stageId];
      if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: 'smooth' });
      }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentStage = activeStageId;
      for (const stage of STAGE_ORDER) {
        const element = sectionRefs.current[stage.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentStage = stage.id;
          }
        }
      }
      if (currentStage !== activeStageId) {
        setActiveStageId(currentStage);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStageId]);

  const clearFilters = () => {
      setSelectedTeam(null);
      setSelectedGroup(null);
      setTeamSearchQuery('');
  };

  const isAnyFilterActive = selectedTeam || selectedGroup;

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
      <div className="max-w-[1100px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
            <div className="min-w-0">
                
                {/* Filters & Tabs Header - STICKY CONTAINER */}
                <div className="sticky top-0 z-40 bg-[#f0f2f5] -mx-4 px-4 pt-1 mb-6">
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-visible">
                        <div className="p-6 pb-0">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 relative">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 font-sans tracking-tight">Lịch thi đấu & Kết quả</h2>
                                    <p className="text-gray-400 text-[11px] mt-1 font-bold uppercase tracking-[0.2em]">THỜI GIAN HIỂN THỊ THEO GIỜ ĐỊA PHƯƠNG CỦA BẠN.</p>
                                </div>
                                <div className="flex items-center gap-4 relative">
                                    <div className="relative" ref={filterPanelRef}>
                                        <button 
                                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black transition-all border ${
                                                isFilterOpen || isAnyFilterActive
                                                ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-md' 
                                                : 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Filter className="w-4 h-4" /> Lọc
                                        </button>

                                        {isFilterOpen && (
                                            <div className="absolute right-0 mt-3 w-[320px] md:w-[400px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                                                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                                    <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Bộ lọc nâng cao</span>
                                                    {isAnyFilterActive && (
                                                        <button 
                                                            onClick={clearFilters}
                                                            className="text-[11px] font-black text-[#9f224e] hover:underline uppercase"
                                                        >
                                                            Xóa tất cả
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="p-5 space-y-6">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Theo đội tuyển</label>
                                                        <div className="relative mb-3">
                                                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                            <input 
                                                                type="text" 
                                                                placeholder="Tìm đội tuyển..."
                                                                value={teamSearchQuery}
                                                                onChange={(e) => setTeamSearchQuery(e.target.value)}
                                                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#9f224e] transition-all"
                                                            />
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto no-scrollbar py-1">
                                                            {filteredTeams.map(team => (
                                                                <button
                                                                    key={team.id}
                                                                    onClick={() => setSelectedTeam(selectedTeam?.id === team.id ? null : team)}
                                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                                                                        selectedTeam?.id === team.id
                                                                        ? 'bg-[#9f224e] border-[#9f224e] text-white'
                                                                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                                                                    }`}
                                                                >
                                                                    <img src={team.flag} className="w-4 h-3 object-cover rounded-[1px]" alt="" />
                                                                    {team.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Theo bảng đấu</label>
                                                        <div className="grid grid-cols-6 gap-2">
                                                            {GROUPS.map(g => (
                                                                <button
                                                                    key={g}
                                                                    onClick={() => setSelectedGroup(selectedGroup === g ? null : g)}
                                                                    className={`w-10 h-10 flex items-center justify-center rounded-xl border text-[13px] font-black transition-all ${
                                                                        selectedGroup === g
                                                                        ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-sm'
                                                                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-200'
                                                                    }`}
                                                                >
                                                                    {g}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-gray-50 border-t border-gray-100">
                                                    <button 
                                                        onClick={() => setIsFilterOpen(false)}
                                                        className="w-full bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg"
                                                    >
                                                        Áp dụng
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {isAnyFilterActive && (
                                <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                    {selectedTeam && (
                                        <div className="flex items-center gap-2 bg-[#9f224e]/5 border border-[#9f224e]/20 text-[#9f224e] px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">
                                            <img src={selectedTeam.flag} className="w-4 h-3 object-cover rounded-[1px]" alt="" />
                                            Đội: {selectedTeam.name}
                                            <button onClick={() => setSelectedTeam(null)} className="hover:text-black"><X className="w-3.5 h-3.5" /></button>
                                        </div>
                                    )}
                                    {selectedGroup && (
                                        <div className="flex items-center gap-2 bg-[#9f224e]/5 border border-[#9f224e]/20 text-[#9f224e] px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">
                                            Bảng: {selectedGroup}
                                            <button onClick={() => setSelectedGroup(null)} className="hover:text-black"><X className="w-3.5 h-3.5" /></button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="px-6 flex overflow-x-auto no-scrollbar gap-8 border-t border-gray-100 mt-2">
                            {STAGE_ORDER.map((stage) => {
                                if (!hasMatches(stage.label)) return null;
                                return (
                                    <button 
                                        key={stage.id} 
                                        onClick={() => scrollToSection(stage.id)} 
                                        className={`py-4 text-[13px] font-black uppercase transition-all border-b-[3px] whitespace-nowrap ${
                                            activeStageId === stage.id 
                                            ? 'border-[#9f224e] text-[#9f224e]' 
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        {stage.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Schedule List - Organized by Stage */}
                <div className="space-y-16">
                    {STAGE_ORDER.map((stage) => {
                        const stageData = displayData[stage.label];
                        const sectionKeys = Object.keys(stageData || {});
                        if (sectionKeys.length === 0) return null;
                        
                        return (
                            <div 
                                key={stage.id} 
                                id={stage.id} 
                                ref={el => { sectionRefs.current[stage.id] = el }}
                                className="scroll-mt-[180px]"
                            >
                                <div className="border-l-[6px] border-[#9f224e] pl-4 mb-8">
                                    <h3 className="text-3xl font-black text-gray-900 uppercase font-sans tracking-tight">{stage.label}</h3>
                                </div>
                                
                                <div className="space-y-12">
                                    {sectionKeys.map((key) => (
                                        <div key={key}>
                                            <div className="flex justify-between items-center mb-6 px-1">
                                                <h4 className="text-[17px] font-black text-gray-800 flex items-center gap-3">
                                                    <Calendar className="w-5 h-5 text-gray-400" />
                                                    {key}
                                                </h4>
                                                <button className="text-[12px] font-black text-[#9f224e] uppercase hover:opacity-80 flex items-center gap-1 transition-opacity">
                                                    {stage.id === 'group' ? 'XEM BẢNG ĐẤU' : 'XEM SƠ ĐỒ NHÁNH'} <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                {stageData[key].map(match => (
                                                    <MatchItemRow key={match.id} match={match} onClick={onMatchClick} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    
                    {Object.values(displayData).every(s => Object.keys(s).length === 0) && (
                        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-gray-300" />
                             </div>
                             <h3 className="text-xl font-black text-gray-900 mb-2">Không tìm thấy trận đấu nào</h3>
                             <p className="text-gray-500 max-w-sm mx-auto mb-8">Hãy thử thay đổi bộ lọc hoặc xóa bộ lọc để xem đầy đủ lịch thi đấu.</p>
                             <button 
                                onClick={clearFilters}
                                className="px-8 py-3 bg-[#9f224e] text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-[#9f224e]/20"
                             >
                                Xóa tất cả bộ lọc
                             </button>
                        </div>
                    )}
                </div>
            </div>

            <aside className="w-full flex flex-col gap-6">
                <StandingsWidget onTeamClick={onTeamClick} />
                <PollWidget />
                <TriviaWidget />
            </aside>
        </div>
      </div>
    </div>
  );
};

// Row style for Date
const MatchItemRow: React.FC<{ match: Match; onClick: (m: Match) => void }> = ({ match, onClick }) => {
    return (
        <div 
            onClick={() => onClick(match)} 
            className="bg-white rounded-2xl border border-gray-200 hover:border-[#9f224e]/40 transition-all cursor-pointer shadow-sm hover:shadow-md group overflow-hidden"
        >
            <div className="p-8">
                <div className="flex items-center justify-between max-w-[640px] mx-auto relative">
                    <div className="flex-1 flex items-center justify-end gap-6 min-w-0">
                        <span className="text-base md:text-xl font-black text-gray-900 truncate uppercase">{match.homeTeam}</span>
                        <div className="w-12 h-8 shrink-0 overflow-hidden rounded-[2px] border border-gray-100 bg-gray-50 flex items-center justify-center shadow-sm">
                            <img src={match.homeFlag} className="w-full h-full object-cover" alt={match.homeTeam} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center min-w-[140px] px-8">
                        <span className="text-4xl font-black tracking-tighter text-gray-900 group-hover:text-[#9f224e] transition-colors">{match.score || match.time}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-start gap-6 min-w-0">
                        <div className="w-12 h-8 shrink-0 overflow-hidden rounded-[2px] border border-gray-100 bg-gray-50 flex items-center justify-center shadow-sm">
                            <img src={match.awayFlag} className="w-full h-full object-cover" alt={match.awayTeam} />
                        </div>
                        <span className="text-base md:text-xl font-black text-gray-900 truncate uppercase">{match.awayTeam}</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-center items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center border-t border-gray-50 pt-5">
                    <span>{match.round?.includes('Bảng') ? 'STAGE 1' : 'KNOCKOUT'}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{match.round}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {match.stadium}</span>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
