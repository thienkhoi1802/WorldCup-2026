
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { UPCOMING_MATCHES, ALL_TEAMS } from '../constants';
import { Match, Team } from '../types';
import { ArrowLeft, MapPin, Calendar, Filter, ChevronDown, Search, X, Check, RotateCcw } from 'lucide-react';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';
import TriviaWidget from './TriviaWidget';

interface SchedulePageProps {
  onMatchClick: (match: Match) => void;
  onBack?: () => void;
}

// 1. DEFINED STAGES IN ORDER
const STAGE_ORDER = [
    { id: 'group', label: 'Vòng Bảng' },
    { id: 'r32', label: 'Vòng 1/32' },
    { id: 'r16', label: 'Vòng 1/16' },
    { id: 'qf', label: 'Tứ kết' },
    { id: 'sf', label: 'Bán kết' },
    { id: '3rd', label: 'Tranh hạng 3' },
    { id: 'final', label: 'Chung kết' }
];

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const SchedulePage: React.FC<SchedulePageProps> = ({ onMatchClick, onBack }) => {
  const [activeTab, setActiveTab] = useState('matches'); // Top Main Tabs
  const [activeStageId, setActiveStageId] = useState('group'); // Sticky Sub-tabs
  
  // --- FILTERS STATE ---
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');

  // Scroll Refs
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // --- 1. DATA PROCESSING ---
  
  const normalizeStage = (round: string): string => {
      if (!round) return 'Khác';
      if (round.includes('Bảng')) return 'Vòng Bảng';
      if (round.includes('Vòng 1/32')) return 'Vòng 1/32';
      if (round.includes('Vòng 1/16')) return 'Vòng 1/16';
      if (round.includes('Tứ kết')) return 'Tứ kết';
      if (round.includes('Bán kết')) return 'Bán kết';
      if (round.includes('Tranh hạng 3')) return 'Tranh hạng 3';
      if (round.includes('Chung kết')) return 'Chung kết';
      return 'Khác';
  };

  // Filter Teams for Dropdown
  const filteredTeamsForDropdown = ALL_TEAMS.filter(t => 
      t.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  ).sort((a,b) => a.name.localeCompare(b.name));

  // Main Data Processing: Filter -> Group by Stage -> Group by Date
  const groupedMatches = useMemo(() => {
      // 1. Filter Matches
      const filtered = UPCOMING_MATCHES.filter(match => {
          // Filter by Team
          if (selectedTeam) {
              const isHome = match.homeTeam === selectedTeam.name;
              const isAway = match.awayTeam === selectedTeam.name;
              if (!isHome && !isAway) return false;
          }

          // Filter by Group (Only applies if match round contains "Bảng X")
          if (selectedGroup !== 'ALL') {
              if (match.round?.includes('Bảng')) {
                  if (!match.round.includes(`Bảng ${selectedGroup}`)) return false;
              } else {
                  // If filtering by group, usually we hide knockout matches unless logic dictates otherwise.
                  // For now, let's hide knockout stages if a specific group is selected to reduce noise
                  return false; 
              }
          }
          
          return true;
      });

      // 2. Group by Stage
      const groups: Record<string, Record<string, Match[]>> = {}; // Stage -> Date -> Matches[]
      
      // Initialize groups
      STAGE_ORDER.forEach(stage => { groups[stage.label] = {}; });
      groups['Khác'] = {};

      filtered.forEach(match => {
          const stageName = normalizeStage(match.round || '');
          if (!groups[stageName]) groups[stageName] = {};
          
          const dateKey = match.date;
          if (!groups[stageName][dateKey]) groups[stageName][dateKey] = [];
          
          groups[stageName][dateKey].push(match);
      });

      // 3. Sort Dates and Matches within
      // We don't need to sort the object keys here as we will sort them during render
      return groups;
  }, [selectedGroup, selectedTeam]);

  // Check if a stage has any matches after filtering
  const hasMatches = (stageLabel: string) => {
      const dates = Object.keys(groupedMatches[stageLabel] || {});
      return dates.length > 0;
  };


  // --- 2. INTERACTION HANDLERS ---

  const scrollToSection = (stageId: string) => {
      setActiveStageId(stageId);
      const element = sectionRefs.current[stageId];
      if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 180; // Adjusted offset
          window.scrollTo({ top: y, behavior: 'smooth' });
      }
  };

  useEffect(() => {
      const observerOptions = {
          root: null,
          rootMargin: '-180px 0px -70% 0px',
          threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const stageId = Object.keys(sectionRefs.current).find(key => sectionRefs.current[key] === entry.target);
                  if (stageId) setActiveStageId(stageId);
              }
          });
      }, observerOptions);

      Object.values(sectionRefs.current).forEach(el => {
          if (el) observer.observe(el);
      });

      return () => observer.disconnect();
  }, [groupedMatches]); // Re-observe if structure changes due to filters


  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans relative">
      
      <div className="max-w-[1140px] mx-auto px-4 mt-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
            
            {/* --- LEFT COLUMN: MAIN CONTENT (760px) --- */}
            <div className="min-w-0">
                
                {/* --- PAGE HEADER --- */}
                <div className="bg-[#111] text-white pt-4 pb-0 sticky top-0 z-40 shadow-md rounded-t-lg">
                    <div className="flex items-center gap-4 px-4 mb-4">
                        {onBack && <ArrowLeft className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" onClick={onBack} />}
                        <h1 className="text-lg font-bold uppercase tracking-wide">Lịch thi đấu</h1>
                    </div>

                    {/* Main Tabs */}
                    <div className="px-4 overflow-x-auto no-scrollbar">
                        <div className="flex gap-8">
                            {['TRẬN ĐẤU', 'SƠ ĐỒ', 'CẦU THỦ', 'BẢNG XẾP HẠNG'].map((tab) => {
                                const isActive = activeTab === 'matches' && tab === 'TRẬN ĐẤU';
                                return (
                                    <button
                                        key={tab}
                                        className={`pb-3 text-sm font-bold transition-colors whitespace-nowrap border-b-4 ${isActive ? 'border-[#9f224e] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                                    >
                                        {tab}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* --- STICKY TOOLBAR: FILTER ICON + STAGE NAV --- */}
                <div className="sticky top-[95px] md:top-[90px] z-30 bg-white shadow-sm border-b border-gray-200 rounded-b-lg">
                    <div className="flex">
                        
                        {/* A. FILTER SECTION (Hoverable Dropdown) */}
                        <div className="relative group border-r border-gray-100 bg-white z-50 rounded-bl-lg">
                            {/* Trigger Button */}
                            <button className="h-full px-5 flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#9f224e] hover:bg-gray-50 transition-colors">
                                <Filter className="w-5 h-5" />
                                <span className="hidden sm:inline text-base">Bộ lọc</span>
                                {/* Active Indicator */}
                                {(selectedGroup !== 'ALL' || selectedTeam) && (
                                    <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9f224e] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9f224e]"></span>
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Panel */}
                            <div className="absolute top-full left-0 w-[300px] sm:w-[500px] bg-white shadow-2xl border border-gray-200 rounded-b-xl p-6 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                                
                                {/* Header & Reset */}
                                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                                    <span className="text-sm font-black uppercase text-gray-900 tracking-wider">Tùy chọn tìm kiếm</span>
                                    {(selectedGroup !== 'ALL' || selectedTeam) && (
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                setSelectedGroup('ALL'); 
                                                setSelectedTeam(null);
                                                setTeamSearchQuery('');
                                            }}
                                            className="text-xs font-bold text-[#9f224e] flex items-center gap-1 hover:underline bg-red-50 px-3 py-1.5 rounded transition-colors"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col gap-6">
                                    {/* 1. Team Filter */}
                                    <div className="flex-1">
                                        <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2">
                                            <Search className="w-4 h-4 text-[#9f224e]" />
                                            Lọc theo Đội tuyển
                                        </label>
                                        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
                                                <Search className="w-4 h-4 text-gray-400 mr-3" />
                                                <input 
                                                    type="text"
                                                    placeholder="Nhập tên đội bóng..."
                                                    value={teamSearchQuery}
                                                    onChange={(e) => setTeamSearchQuery(e.target.value)}
                                                    className="bg-transparent w-full text-sm outline-none text-gray-900 font-medium placeholder:text-gray-400"
                                                />
                                                {teamSearchQuery && <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setTeamSearchQuery('')} />}
                                            </div>
                                            <div className="max-h-[150px] overflow-y-auto p-2 bg-white custom-scrollbar">
                                                <button 
                                                    onClick={() => setSelectedTeam(null)}
                                                    className={`w-full text-left px-3 py-2.5 text-sm rounded-md flex items-center gap-3 transition-colors mb-1 ${!selectedTeam ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                                                >
                                                    Tất cả đội bóng
                                                    {!selectedTeam && <Check className="w-4 h-4 ml-auto"/>}
                                                </button>
                                                {filteredTeamsForDropdown.map(team => (
                                                    <button 
                                                        key={team.id}
                                                        onClick={() => setSelectedTeam(team)}
                                                        className={`w-full text-left px-3 py-2.5 text-sm rounded-md flex items-center gap-3 transition-colors mb-1 ${selectedTeam?.id === team.id ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                                                    >
                                                        <img src={team.flag} className="w-6 h-4 object-cover rounded shadow-sm"/>
                                                        <span className="truncate text-sm">{team.name}</span>
                                                        {selectedTeam?.id === team.id && <Check className="w-4 h-4 ml-auto"/>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Group Filter */}
                                    <div className="shrink-0">
                                        <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2">
                                            <Filter className="w-4 h-4 text-[#9f224e]" />
                                            Lọc theo Bảng đấu
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            <button 
                                                onClick={() => setSelectedGroup('ALL')}
                                                className={`w-full py-2 mb-2 text-sm font-bold border rounded-md transition-all ${selectedGroup === 'ALL' ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-gray-300'}`}
                                            >
                                                Xem tất cả bảng
                                            </button>
                                            {GROUPS.map(g => (
                                                <button
                                                    key={g}
                                                    onClick={() => setSelectedGroup(g)}
                                                    className={`w-10 h-10 flex items-center justify-center text-sm font-bold border rounded-md transition-all ${selectedGroup === g ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-md transform scale-105' : 'border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-gray-300'}`}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* B. STAGE NAV (Horizontal Scroll) */}
                        <div className="flex-1 overflow-x-auto no-scrollbar rounded-br-lg">
                            <div className="flex items-center gap-2 px-4 py-3">
                                {STAGE_ORDER.map((stage) => {
                                    const isActive = activeStageId === stage.id;
                                    if (!hasMatches(stage.label)) return null;

                                    return (
                                        <button
                                            key={stage.id}
                                            onClick={() => scrollToSection(stage.id)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                                                isActive 
                                                ? 'bg-black text-white shadow-md transform scale-105' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {stage.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MATCH LISTING CONTENT --- */}
                <div className="bg-white rounded-lg shadow-sm mt-4 p-4 min-h-[600px] border border-gray-100">
                    <div className="space-y-8 pb-12">
                        {STAGE_ORDER.map((stage) => {
                            const stageData = groupedMatches[stage.label];
                            const dates = Object.keys(stageData).sort((a, b) => {
                                const [d1, m1] = a.split('/').map(Number);
                                const [d2, m2] = b.split('/').map(Number);
                                if (m1 !== m2) return m1 - m2;
                                return d1 - d2;
                            });

                            if (dates.length === 0) return null;

                            return (
                                <div 
                                    key={stage.id} 
                                    id={stage.id} 
                                    ref={el => { sectionRefs.current[stage.id] = el }}
                                    className="scroll-mt-[250px]"
                                >
                                    {/* Stage Header */}
                                    <div className="flex items-center gap-3 mb-6 pt-2">
                                        <div className="h-8 w-1.5 bg-[#9f224e] rounded-full"></div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase font-serif tracking-tight">{stage.label}</h2>
                                        {selectedGroup !== 'ALL' && stage.id === 'group' && (
                                            <span className="text-sm font-bold bg-gray-200 px-2 py-1 rounded text-gray-600">Bảng {selectedGroup}</span>
                                        )}
                                    </div>

                                    {/* Dates and Matches */}
                                    <div className="flex flex-col gap-8 pl-0 md:pl-2">
                                        {dates.map(date => (
                                            <div key={date} className="relative">
                                                {/* Date Header Sub-section */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2 shadow-sm">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        Ngày {date}
                                                    </div>
                                                    <div className="h-px bg-gray-200 flex-1"></div>
                                                </div>

                                                {/* Matches List for Date */}
                                                <div className="flex flex-col gap-3">
                                                    {stageData[date].sort((a,b) => a.time.localeCompare(b.time)).map(match => (
                                                        <MatchRow key={match.id} match={match} onClick={onMatchClick} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        
                        {/* Fallback if empty */}
                        {STAGE_ORDER.every(stage => !hasMatches(stage.label)) && (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <Filter className="w-12 h-12 mb-3 opacity-20" />
                                <p className="font-bold text-gray-600">Không tìm thấy trận đấu nào.</p>
                                <p className="text-sm mb-4">Thử thay đổi bộ lọc đội bóng hoặc bảng đấu.</p>
                                <button 
                                    onClick={() => { setSelectedGroup('ALL'); setSelectedTeam(null); }}
                                    className="text-[#9f224e] font-bold text-sm hover:underline flex items-center gap-1"
                                >
                                    <RotateCcw className="w-3 h-3" /> Xóa bộ lọc
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* --- RIGHT COLUMN: SIDEBAR (300px) --- */}
            <aside className="w-full flex flex-col gap-6">
                <StandingsWidget />
                <PollWidget />
                <TriviaWidget />
            </aside>

        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const MatchRow: React.FC<{ match: Match; onClick: (m: Match) => void }> = ({ match, onClick }) => (
    <div 
        onClick={() => onClick(match)}
        className="group bg-white rounded-lg md:rounded-md shadow-sm border border-gray-200 hover:border-[#9f224e] transition-all cursor-pointer overflow-hidden p-3 md:px-5 md:py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:h-[72px]"
    >
        {/* Mobile: Top Metadata Row */}
        <div className="flex md:hidden justify-between items-center text-[10px] text-gray-500 font-medium uppercase tracking-wide border-b border-gray-100 pb-2 mb-1">
             <div className="flex items-center gap-2">
                 <span className="font-bold text-gray-900">{match.time}</span>
             </div>
             <span className="truncate max-w-[120px]">{match.round.replace('Bảng', 'Grp').replace('Vòng', 'R')}</span>
        </div>

        {/* Desktop Left: Time Only (Date is now in header) */}
        <div className="hidden md:flex flex-col w-16 shrink-0 justify-center gap-0.5 border-r border-gray-100 pr-3">
             <span className="text-xl font-black text-gray-900 leading-none">{match.time}</span>
        </div>

        {/* Center: Teams */}
        <div className="flex-1 flex items-center justify-between md:justify-center md:gap-4 px-1">
            {/* Home Team */}
            <div className="flex items-center gap-3 flex-1 md:justify-end min-w-0">
                <span className="text-sm md:text-[14px] font-bold text-gray-900 truncate order-2 md:order-1">{match.homeTeam}</span>
                <img src={match.homeFlag} className="w-6 h-4 md:w-8 md:h-5 object-cover shadow-sm rounded-sm order-1 md:order-2" alt={match.homeTeam} />
            </div>

            {/* Score / VS Status */}
            <div className="shrink-0 flex justify-center min-w-[30px]">
                 {match.status === 'finished' ? (
                     <span className="text-lg font-black text-gray-900 tracking-tight">{match.score}</span>
                 ) : (
                     <div className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">VS</div>
                 )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 flex-1 justify-end md:justify-start min-w-0">
                <img src={match.awayFlag} className="w-6 h-4 md:w-8 md:h-5 object-cover shadow-sm rounded-sm" alt={match.awayTeam} />
                <span className="text-sm md:text-[14px] font-bold text-gray-900 truncate">{match.awayTeam}</span>
            </div>
        </div>

        {/* Desktop Right: Venue */}
        <div className="hidden md:flex flex-col w-36 shrink-0 items-end justify-center text-right border-l border-gray-100 pl-3 h-full">
             <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 w-full justify-end">
                 <MapPin className="w-3 h-3 text-gray-300" />
                 <span className="truncate max-w-[120px]">{match.stadium}</span>
             </div>
             {/* Show specific round detail */}
             <span className="text-[9px] text-gray-400 mt-1">{match.round}</span>
        </div>
        
        {/* Mobile Bottom: Stadium */}
        <div className="md:hidden flex items-center gap-1.5 text-[10px] text-gray-400">
             <MapPin className="w-3 h-3" />
             <span className="truncate">{match.stadium}</span>
        </div>
    </div>
);

export default SchedulePage;
