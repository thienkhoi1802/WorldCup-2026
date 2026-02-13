
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { UPCOMING_MATCHES, ALL_TEAMS } from '../constants';
import { Match, Team } from '../types';
import { ArrowLeft, MapPin, Calendar, Filter, RotateCcw, Search, X, Check, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
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

const SHIELD_ICON_URL = 'https://cdn-icons-png.flaticon.com/512/10602/10602939.png';

const SchedulePage: React.FC<SchedulePageProps> = ({ onMatchClick, onBack }) => {
  const [activeTab, setActiveTab] = useState('matches'); // 'matches' | 'bracket'
  const [activeStageId, setActiveStageId] = useState('group'); 
  
  // --- FILTERS STATE ---
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');

  // Scroll Refs
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const bracketContainerRef = useRef<HTMLDivElement>(null);

  // --- 1. DATA PROCESSING (MATCH LIST) ---
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

  const filteredTeamsForDropdown = ALL_TEAMS.filter(t => 
      t.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  ).sort((a,b) => a.name.localeCompare(b.name));

  const groupedMatches = useMemo(() => {
      const filtered = UPCOMING_MATCHES.filter(match => {
          if (selectedTeam) {
              const isHome = match.homeTeam === selectedTeam.name;
              const isAway = match.awayTeam === selectedTeam.name;
              if (!isHome && !isAway) return false;
          }
          if (selectedGroup !== 'ALL') {
              if (match.round?.includes('Bảng')) {
                  if (!match.round.includes(`Bảng ${selectedGroup}`)) return false;
              } else {
                  return false; 
              }
          }
          return true;
      });

      const groups: Record<string, Record<string, Match[]>> = {}; 
      STAGE_ORDER.forEach(stage => { groups[stage.label] = {}; });
      groups['Khác'] = {};

      filtered.forEach(match => {
          const stageName = normalizeStage(match.round || '');
          if (!groups[stageName]) groups[stageName] = {};
          const dateKey = match.date;
          if (!groups[stageName][dateKey]) groups[stageName][dateKey] = [];
          groups[stageName][dateKey].push(match);
      });
      return groups;
  }, [selectedGroup, selectedTeam]);

  const hasMatches = (stageLabel: string) => {
      const dates = Object.keys(groupedMatches[stageLabel] || {});
      return dates.length > 0;
  };

  // --- 2. BRACKET DATA GENERATION ---
  const bracketData = useMemo(() => {
    const createSlots = (count: number, roundLabels: string[]) => {
        return Array.from({ length: count }).map((_, i) => {
            const matchesInRound = UPCOMING_MATCHES.filter(m => roundLabels.some(r => m.round === r));
            const match = matchesInRound[i];
            
            return match || {
                id: `tbd-${roundLabels[0]}-${i}`,
                homeTeam: 'TBD',
                awayTeam: 'TBD',
                homeFlag: SHIELD_ICON_URL,
                awayFlag: SHIELD_ICON_URL,
                time: '00:00',
                date: 'TBD',
                round: roundLabels[0],
                status: 'upcoming'
            } as Match;
        });
    };

    return {
        r32: createSlots(16, ['Vòng 1/32']),
        r16: createSlots(8, ['Vòng 1/16']),
        qf: createSlots(4, ['Tứ kết']),
        sf: createSlots(2, ['Bán kết']),
        final: createSlots(1, ['Chung kết']),
    };
  }, []);


  // --- 3. INTERACTION HANDLERS ---
  const scrollToSection = (stageId: string) => {
      setActiveStageId(stageId);
      const element = sectionRefs.current[stageId];
      if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 180;
          window.scrollTo({ top: y, behavior: 'smooth' });
      }
  };

  const scrollBracket = (direction: 'left' | 'right') => {
    if (bracketContainerRef.current) {
        const scrollAmount = 300; 
        bracketContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  useEffect(() => {
      if (activeTab !== 'matches') return;

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
  }, [groupedMatches, activeTab]);


  // --- RENDER HELPERS ---
  
  // Bracket Match Card Component
  const BracketMatchCard = ({ match }: { match: Match }) => (
    <div 
        onClick={() => match.homeTeam !== 'TBD' && onMatchClick(match)}
        className={`bg-white border rounded-lg p-3 shadow-sm w-64 h-[100px] flex flex-col justify-center gap-2 relative z-10 transition-all ${match.homeTeam !== 'TBD' ? 'cursor-pointer hover:border-[#9f224e] hover:shadow-md border-gray-200' : 'border-gray-100 opacity-70'}`}
    >
       <div className="text-[10px] text-gray-500 font-bold mb-1 flex justify-between uppercase tracking-wider">
          <span>{match.date || '--/--'}</span>
          <span>{match.time || '--:--'}</span>
       </div>
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <img src={match.homeFlag} className="w-5 h-3.5 object-cover rounded-[1px] bg-gray-100 shadow-sm"/>
             <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{match.homeTeam}</span>
          </div>
          {match.score && <span className="text-xs font-bold text-gray-900">{match.score.split('-')[0]}</span>}
       </div>
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <img src={match.awayFlag} className="w-5 h-3.5 object-cover rounded-[1px] bg-gray-100 shadow-sm"/>
             <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{match.awayTeam}</span>
          </div>
          {match.score && <span className="text-xs font-bold text-gray-900">{match.score.split('-')[1]}</span>}
       </div>
    </div>
  );

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
                        <h1 className="text-lg font-bold uppercase tracking-wide">Lịch thi đấu & Kết quả</h1>
                    </div>

                    {/* Main Tabs */}
                    <div className="px-4 overflow-x-auto no-scrollbar">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('matches')}
                                className={`pb-3 text-sm font-bold transition-colors whitespace-nowrap border-b-4 ${activeTab === 'matches' ? 'border-[#9f224e] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                            >
                                TRẬN ĐẤU
                            </button>
                            <button
                                onClick={() => setActiveTab('bracket')}
                                className={`pb-3 text-sm font-bold transition-colors whitespace-nowrap border-b-4 ${activeTab === 'bracket' ? 'border-[#9f224e] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                            >
                                SƠ ĐỒ THI ĐẤU
                            </button>
                        </div>
                    </div>
                </div>

                {/* === VIEW: MATCH LIST === */}
                {activeTab === 'matches' && (
                    <>
                        {/* --- STICKY TOOLBAR --- */}
                        <div className="sticky top-[95px] md:top-[90px] z-30 bg-white shadow-sm border-b border-gray-200 rounded-b-lg">
                            <div className="flex">
                                {/* A. FILTER SECTION */}
                                <div className="relative group border-r border-gray-100 bg-white z-50 rounded-bl-lg">
                                    <button className="h-full px-5 flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#9f224e] hover:bg-gray-50 transition-colors py-3">
                                        <Filter className="w-5 h-5" />
                                        <span className="hidden sm:inline text-base">Bộ lọc</span>
                                        {(selectedGroup !== 'ALL' || selectedTeam) && (
                                            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9f224e] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9f224e]"></span>
                                            </span>
                                        )}
                                    </button>

                                    {/* Dropdown Panel */}
                                    <div className="absolute top-full left-0 w-[300px] sm:w-[500px] bg-white shadow-2xl border border-gray-200 rounded-b-xl p-6 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                                            <span className="text-sm font-black uppercase text-gray-900 tracking-wider">Tùy chọn tìm kiếm</span>
                                            {(selectedGroup !== 'ALL' || selectedTeam) && (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setSelectedGroup('ALL'); setSelectedTeam(null); setTeamSearchQuery(''); }}
                                                    className="text-xs font-bold text-[#9f224e] flex items-center gap-1 hover:underline bg-red-50 px-3 py-1.5 rounded transition-colors"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-6">
                                            {/* Team Filter */}
                                            <div className="flex-1">
                                                <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2"><Search className="w-4 h-4 text-[#9f224e]" /> Lọc theo Đội tuyển</label>
                                                <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
                                                        <Search className="w-4 h-4 text-gray-400 mr-3" />
                                                        <input type="text" placeholder="Nhập tên đội bóng..." value={teamSearchQuery} onChange={(e) => setTeamSearchQuery(e.target.value)} className="bg-transparent w-full text-sm outline-none text-gray-900 font-medium placeholder:text-gray-400" />
                                                        {teamSearchQuery && <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setTeamSearchQuery('')} />}
                                                    </div>
                                                    <div className="max-h-[150px] overflow-y-auto p-2 bg-white custom-scrollbar">
                                                        <button onClick={() => setSelectedTeam(null)} className={`w-full text-left px-3 py-2.5 text-sm rounded-md flex items-center gap-3 transition-colors mb-1 ${!selectedTeam ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}>Tất cả đội bóng {!selectedTeam && <Check className="w-4 h-4 ml-auto"/>}</button>
                                                        {filteredTeamsForDropdown.map(team => (
                                                            <button key={team.id} onClick={() => setSelectedTeam(team)} className={`w-full text-left px-3 py-2.5 text-sm rounded-md flex items-center gap-3 transition-colors mb-1 ${selectedTeam?.id === team.id ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}><img src={team.flag} className="w-6 h-4 object-cover rounded shadow-sm"/><span className="truncate text-sm">{team.name}</span>{selectedTeam?.id === team.id && <Check className="w-4 h-4 ml-auto"/>}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Group Filter */}
                                            <div className="shrink-0">
                                                <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2"><Filter className="w-4 h-4 text-[#9f224e]" /> Lọc theo Bảng đấu</label>
                                                <div className="flex flex-wrap gap-2">
                                                    <button onClick={() => setSelectedGroup('ALL')} className={`w-full py-2 mb-2 text-sm font-bold border rounded-md transition-all ${selectedGroup === 'ALL' ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-gray-300'}`}>Xem tất cả bảng</button>
                                                    {GROUPS.map(g => (
                                                        <button key={g} onClick={() => setSelectedGroup(g)} className={`w-10 h-10 flex items-center justify-center text-sm font-bold border rounded-md transition-all ${selectedGroup === g ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-md transform scale-105' : 'border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-gray-300'}`}>{g}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* B. STAGE NAV */}
                                <div className="flex-1 overflow-x-auto no-scrollbar rounded-br-lg">
                                    <div className="flex items-center gap-2 px-4 py-3">
                                        {STAGE_ORDER.map((stage) => {
                                            if (!hasMatches(stage.label)) return null;
                                            const isActive = activeStageId === stage.id;
                                            return (
                                                <button key={stage.id} onClick={() => scrollToSection(stage.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${isActive ? 'bg-black text-white shadow-md transform scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{stage.label}</button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- CONTENT LIST --- */}
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
                                        <div key={stage.id} id={stage.id} ref={el => { sectionRefs.current[stage.id] = el }} className="scroll-mt-[250px]">
                                            <div className="flex items-center gap-3 mb-6 pt-2">
                                                <div className="h-8 w-1.5 bg-[#9f224e] rounded-full"></div>
                                                <h2 className="text-2xl font-black text-gray-900 uppercase font-serif tracking-tight">{stage.label}</h2>
                                                {selectedGroup !== 'ALL' && stage.id === 'group' && <span className="text-sm font-bold bg-gray-200 px-2 py-1 rounded text-gray-600">Bảng {selectedGroup}</span>}
                                            </div>
                                            <div className="flex flex-col gap-8 pl-0 md:pl-2">
                                                {dates.map(date => (
                                                    <div key={date} className="relative">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2 shadow-sm"><Calendar className="w-3.5 h-3.5" /> Ngày {date}</div>
                                                            <div className="h-px bg-gray-200 flex-1"></div>
                                                        </div>
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
                                {STAGE_ORDER.every(stage => !hasMatches(stage.label)) && (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                        <Filter className="w-12 h-12 mb-3 opacity-20" />
                                        <p className="font-bold text-gray-600">Không tìm thấy trận đấu nào.</p>
                                        <button onClick={() => { setSelectedGroup('ALL'); setSelectedTeam(null); }} className="text-[#9f224e] font-bold text-sm hover:underline flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Xóa bộ lọc</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* === VIEW: BRACKET (SƠ ĐỒ) === */}
                {activeTab === 'bracket' && (
                    <div className="bg-white rounded-lg shadow-sm mt-4 border border-gray-100 overflow-hidden relative group/bracket">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between z-20 relative">
                             <h2 className="text-xl font-bold font-serif uppercase flex items-center gap-2">
                                <Shield className="w-5 h-5 text-[#9f224e]" />
                                Sơ đồ vòng Knock-out
                             </h2>
                             <span className="text-xs text-gray-500 font-medium hidden sm:block">Cuộn ngang để xem toàn bộ &rarr;</span>
                        </div>
                        
                        {/* Scroll Controls */}
                        <button 
                            onClick={() => scrollBracket('left')} 
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-lg border border-gray-200 rounded-full p-3 hover:bg-gray-50 hover:text-[#9f224e] transition-all opacity-0 group-hover/bracket:opacity-100"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => scrollBracket('right')} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-lg border border-gray-200 rounded-full p-3 hover:bg-gray-50 hover:text-[#9f224e] transition-all opacity-0 group-hover/bracket:opacity-100"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div ref={bracketContainerRef} className="overflow-x-auto custom-scrollbar bg-[#f8f9fa] scroll-smooth">
                            {/* Bracket Container - Fixed height layout to align items nicely */}
                            <div className="flex gap-12 min-w-[1400px] h-[1600px] relative px-10 py-8">
                                
                                {/* COLUMN 1: Round of 32 (16 Matches) */}
                                <div className="flex flex-col gap-6 relative pt-12">
                                    <div className="absolute top-0 left-0 w-full text-center pb-4 border-b border-gray-200 mb-4 bg-[#f8f9fa] z-10">
                                        <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">Vòng 32</h3>
                                        <span className="text-[10px] text-gray-400 font-bold block mt-1">16 Trận đấu</span>
                                    </div>
                                    <div className="flex flex-col justify-around h-full">
                                        {bracketData.r32.map((match, i) => (
                                            <BracketMatchCard key={i} match={match} />
                                        ))}
                                    </div>
                                </div>

                                {/* COLUMN 2: Round of 16 (8 Matches) */}
                                <div className="flex flex-col gap-6 relative pt-12">
                                    <div className="absolute top-0 left-0 w-full text-center pb-4 border-b border-gray-200 mb-4 bg-[#f8f9fa] z-10">
                                        <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">Vòng 16</h3>
                                        <span className="text-[10px] text-gray-400 font-bold block mt-1">8 Trận đấu</span>
                                    </div>
                                    <div className="flex flex-col justify-around h-full">
                                        {bracketData.r16.map((match, i) => (
                                            <BracketMatchCard key={i} match={match} />
                                        ))}
                                    </div>
                                </div>

                                {/* COLUMN 3: Quarter Finals (4 Matches) */}
                                <div className="flex flex-col gap-6 relative pt-12">
                                    <div className="absolute top-0 left-0 w-full text-center pb-4 border-b border-gray-200 mb-4 bg-[#f8f9fa] z-10">
                                        <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">Tứ kết</h3>
                                        <span className="text-[10px] text-gray-400 font-bold block mt-1">4 Trận đấu</span>
                                    </div>
                                    <div className="flex flex-col justify-around h-full">
                                        {bracketData.qf.map((match, i) => (
                                            <BracketMatchCard key={i} match={match} />
                                        ))}
                                    </div>
                                </div>

                                {/* COLUMN 4: Semi Finals (2 Matches) */}
                                <div className="flex flex-col gap-6 relative pt-12">
                                    <div className="absolute top-0 left-0 w-full text-center pb-4 border-b border-gray-200 mb-4 bg-[#f8f9fa] z-10">
                                        <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">Bán kết</h3>
                                        <span className="text-[10px] text-gray-400 font-bold block mt-1">2 Trận đấu</span>
                                    </div>
                                    <div className="flex flex-col justify-around h-full">
                                        {bracketData.sf.map((match, i) => (
                                            <BracketMatchCard key={i} match={match} />
                                        ))}
                                    </div>
                                </div>

                                {/* COLUMN 5: Final (1 Match) */}
                                <div className="flex flex-col gap-6 relative pt-12">
                                    <div className="absolute top-0 left-0 w-full text-center pb-4 border-b border-gray-200 mb-4 bg-[#f8f9fa] z-10">
                                        <h3 className="font-black text-[#9f224e] uppercase text-sm tracking-wide">Chung kết</h3>
                                        <span className="text-[10px] text-gray-400 font-bold block mt-1">Tranh Cúp Vàng</span>
                                    </div>
                                    <div className="flex flex-col justify-around h-full">
                                        <div className="scale-110 origin-center shadow-2xl rounded-lg">
                                            <BracketMatchCard match={bracketData.final[0]} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
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

const MatchRow: React.FC<{ match: Match; onClick: (m: Match) => void }> = ({ match, onClick }) => (
    <div 
        onClick={() => onClick(match)}
        className="group bg-white rounded-lg md:rounded-md shadow-sm border border-gray-200 hover:border-[#9f224e] transition-all cursor-pointer overflow-hidden p-3 md:px-5 md:py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:h-[72px]"
    >
        <div className="flex md:hidden justify-between items-center text-[10px] text-gray-500 font-medium uppercase tracking-wide border-b border-gray-100 pb-2 mb-1">
             <div className="flex items-center gap-2"><span className="font-bold text-gray-900">{match.time}</span></div>
             <span className="truncate max-w-[120px]">{match.round.replace('Bảng', 'Grp').replace('Vòng', 'R')}</span>
        </div>
        <div className="hidden md:flex flex-col w-16 shrink-0 justify-center gap-0.5 border-r border-gray-100 pr-3">
             <span className="text-xl font-black text-gray-900 leading-none">{match.time}</span>
        </div>
        <div className="flex-1 flex items-center justify-between md:justify-center md:gap-4 px-1">
            <div className="flex items-center gap-3 flex-1 md:justify-end min-w-0">
                <span className="text-sm md:text-[14px] font-bold text-gray-900 truncate order-2 md:order-1">{match.homeTeam}</span>
                <img src={match.homeFlag} className="w-6 h-4 md:w-8 md:h-5 object-cover shadow-sm rounded-sm order-1 md:order-2" alt={match.homeTeam} />
            </div>
            <div className="shrink-0 flex justify-center min-w-[30px]">
                 {match.status === 'finished' ? (
                     <span className="text-lg font-black text-gray-900 tracking-tight">{match.score}</span>
                 ) : (
                     <div className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">VS</div>
                 )}
            </div>
            <div className="flex items-center gap-3 flex-1 justify-end md:justify-start min-w-0">
                <img src={match.awayFlag} className="w-6 h-4 md:w-8 md:h-5 object-cover shadow-sm rounded-sm" alt={match.awayTeam} />
                <span className="text-sm md:text-[14px] font-bold text-gray-900 truncate">{match.awayTeam}</span>
            </div>
        </div>
        <div className="hidden md:flex flex-col w-36 shrink-0 items-end justify-center text-right border-l border-gray-100 pl-3 h-full">
             <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 w-full justify-end">
                 <MapPin className="w-3 h-3 text-gray-300" />
                 <span className="truncate max-w-[120px]">{match.stadium}</span>
             </div>
             <span className="text-[9px] text-gray-400 mt-1">{match.round}</span>
        </div>
        <div className="md:hidden flex items-center gap-1.5 text-[10px] text-gray-400">
             <MapPin className="w-3 h-3" />
             <span className="truncate">{match.stadium}</span>
        </div>
    </div>
);

export default SchedulePage;
