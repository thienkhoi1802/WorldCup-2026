
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { UPCOMING_MATCHES, ALL_TEAMS } from '../constants';
import { Match } from '../types';
import { ArrowLeft, ChevronDown, Check, Clock, Layers, Grid, Users, Search, ChevronRight, Calendar, MapPin } from 'lucide-react';

interface SchedulePageProps {
  onMatchClick: (match: Match) => void;
  onBack?: () => void;
}

// CONSTANTS
const STAGE_OPTIONS = [
    'Vòng Bảng',
    'Vòng 1/32',
    'Vòng 1/16',
    'Tứ kết', 
    'Bán kết',
    'Tranh hạng 3',
    'Chung kết'
];

const GROUP_OPTIONS = Array.from({ length: 12 }, (_, i) => `Bảng ${String.fromCharCode(65 + i)}`); // A to L

type ViewType = 'Date' | 'Stage' | 'Group' | 'Team';

const SchedulePage: React.FC<SchedulePageProps> = ({ onMatchClick, onBack }) => {
  const [activeTab, setActiveTab] = useState('matches');
  
  // --- VIEW STATE ---
  const [viewType, setViewType] = useState<ViewType>('Date');
  const [filterValue, setFilterValue] = useState<string>('All');

  // --- DROPDOWN STATE ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<ViewType>('Date');
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
        setHoveredCategory(viewType);
        setTeamSearchQuery('');
    }
  }, [isDropdownOpen, viewType]);


  // --- HELPERS ---
  const getStage = (round: string): string => {
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

  const getGroup = (round: string): string => {
      if (round && round.includes('Bảng')) return round; 
      return 'Knockout';
  };

  // --- FILTER & SORT LOGIC ---
  const filteredMatches = useMemo(() => {
      let matches = UPCOMING_MATCHES;

      if (viewType === 'Stage' && filterValue !== 'All') {
          matches = matches.filter(m => getStage(m.round || '') === filterValue);
      }
      else if (viewType === 'Group' && filterValue !== 'All') {
          matches = matches.filter(m => m.round === filterValue);
      }
      else if (viewType === 'Team' && filterValue !== 'All') {
          matches = matches.filter(m => m.homeTeam === filterValue || m.awayTeam === filterValue);
      }

      return matches;
  }, [viewType, filterValue]);

  // --- RENDER CONTENT ---
  const renderContent = () => {
      if (filteredMatches.length === 0) {
          return (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Calendar className="w-12 h-12 mb-2 opacity-20" />
                  <p>Không tìm thấy trận đấu nào.</p>
                  <button onClick={() => { setViewType('Date'); setFilterValue('All'); }} className="text-[#9f224e] font-bold text-sm mt-2">Xem tất cả</button>
              </div>
          );
      }

      // MODE 1: DATE (Default) or TEAM
      if (viewType === 'Date' || viewType === 'Team') {
          const groupedByDate = filteredMatches.reduce((acc, match) => {
              if (!acc[match.date]) acc[match.date] = [];
              acc[match.date].push(match);
              return acc;
          }, {} as Record<string, Match[]>);

          const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
                const [d1, m1] = a.split('/').map(Number);
                const [d2, m2] = b.split('/').map(Number);
                return m1 - m2 || d1 - d2;
          });

          return (
              <div className="space-y-8 mt-2">
                  {viewType === 'Team' && filterValue !== 'All' && (
                       <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                           <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                {filterValue.charAt(0)}
                           </div>
                           <div>
                               <h2 className="text-xl font-bold text-gray-900 leading-none">{filterValue}</h2>
                               <span className="text-xs text-gray-500">Lịch thi đấu đội tuyển</span>
                           </div>
                       </div>
                  )}

                  {sortedDates.map(date => (
                      <div key={date} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                           <div className="sticky top-[110px] z-20 bg-[#f0f2f5]/95 backdrop-blur-sm py-2 mb-2 px-1 border-b border-gray-200/50 w-full flex justify-start">
                                <span className="text-gray-900 text-xs font-black uppercase tracking-wider bg-white px-3 py-1.5 rounded shadow-sm border border-gray-200 flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-[#9f224e]" />
                                    {date}
                                </span>
                           </div>
                           <div className="flex flex-col gap-2">
                                {groupedByDate[date].sort((a,b) => a.time.localeCompare(b.time)).map(match => (
                                    <MatchRow key={match.id} match={match} onClick={onMatchClick} showStageBadge={viewType === 'Date'} />
                                ))}
                           </div>
                      </div>
                  ))}
              </div>
          );
      }

      // MODE 2: STAGE or GROUP
      if (viewType === 'Stage' || viewType === 'Group') {
          const groupingFn = viewType === 'Stage' ? (m: Match) => getStage(m.round || '') : (m: Match) => getGroup(m.round || '');
          const definedOrder = viewType === 'Stage' ? STAGE_OPTIONS : GROUP_OPTIONS;
          
          const grouped = filteredMatches.reduce((acc, match) => {
              const key = groupingFn(match);
              if (!acc[key]) acc[key] = [];
              acc[key].push(match);
              return acc;
          }, {} as Record<string, Match[]>);
          
          const groupsToShow = filterValue === 'All' 
                ? definedOrder.filter(k => grouped[k]) 
                : [filterValue].filter(k => grouped[k]);
          
          if (filterValue === 'All') {
              Object.keys(grouped).forEach(k => {
                  if (!definedOrder.includes(k) && !groupsToShow.includes(k)) groupsToShow.push(k);
              });
          }

          return (
              <div className="space-y-10 mt-2">
                   {groupsToShow.map(groupKey => (
                       <div key={groupKey} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-6 w-1.5 bg-[#9f224e] rounded-full"></div>
                                <h2 className="text-xl font-black text-gray-900 uppercase font-serif tracking-tight">{groupKey}</h2>
                                <div className="h-px bg-gray-300 flex-1 ml-2 opacity-50"></div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {grouped[groupKey].sort((a,b) => {
                                    const [d1, m1] = a.date.split('/').map(Number);
                                    const [d2, m2] = b.date.split('/').map(Number);
                                    if (m1 !== m2) return m1 - m2;
                                    if (d1 !== d2) return d1 - d2;
                                    return a.time.localeCompare(b.time);
                                }).map(match => (
                                    <MatchRow key={match.id} match={match} onClick={onMatchClick} showDateBadge />
                                ))}
                            </div>
                       </div>
                   ))}
              </div>
          );
      }
  };

  // --- TEAMS FOR DROPDOWN ---
  const teamsForDropdown = ALL_TEAMS
    .filter(t => t.name.toLowerCase().includes(teamSearchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans relative overflow-x-hidden">
      {/* Dark Header */}
      <div className="bg-[#111] text-white sticky top-0 z-30 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 border-b border-white/10 max-w-4xl mx-auto gap-4">
           <div className="flex items-center gap-4 shrink-0">
              {onBack && <ArrowLeft className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" onClick={onBack} />}
              <h1 className="text-lg font-bold uppercase tracking-wide">Lịch thi đấu</h1>
           </div>
           
           {/* SMART VIEW SWITCHER */}
           <div className="relative" ref={dropdownRef}>
               <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-2 text-xs font-bold uppercase px-4 py-2.5 rounded-lg transition-all shadow-sm ${isDropdownOpen ? 'bg-white text-black' : 'bg-[#9f224e] hover:bg-[#851b40] text-white'}`}
               >
                    <span className="opacity-70 font-normal normal-case">Xem:</span>
                    <span className="flex items-center gap-1.5">
                        {viewType === 'Date' && <Clock className="w-3.5 h-3.5"/>}
                        {viewType === 'Stage' && <Layers className="w-3.5 h-3.5"/>}
                        {viewType === 'Group' && <Grid className="w-3.5 h-3.5"/>}
                        {viewType === 'Team' && <Users className="w-3.5 h-3.5"/>}
                        
                        {viewType === 'Date' ? 'Theo Thời gian' : filterValue === 'All' ? `Tất cả ${viewType === 'Stage' ? 'Giai đoạn' : viewType === 'Group' ? 'Bảng đấu' : ''}` : filterValue}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
               </button>

               {/* MEGA DROPDOWN */}
               {isDropdownOpen && (
                   <div className="absolute right-0 md:left-auto md:right-0 top-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-100 flex flex-col md:flex-row min-w-[300px] md:min-w-[500px] overflow-hidden">
                       
                       {/* LEFT COLUMN: Categories */}
                       <div className="w-full md:w-48 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-2 flex flex-row md:flex-col gap-1">
                           {[
                               { id: 'Date', label: 'Thời gian', icon: <Clock className="w-4 h-4"/> },
                               { id: 'Stage', label: 'Giai đoạn', icon: <Layers className="w-4 h-4"/> },
                               { id: 'Group', label: 'Bảng đấu', icon: <Grid className="w-4 h-4"/> },
                               { id: 'Team', label: 'Đội tuyển', icon: <Users className="w-4 h-4"/> },
                           ].map((cat) => (
                               <button 
                                    key={cat.id}
                                    onMouseEnter={() => setHoveredCategory(cat.id as ViewType)}
                                    onClick={() => {
                                        setHoveredCategory(cat.id as ViewType);
                                        // If clicking Date, select immediately
                                        if (cat.id === 'Date') {
                                            setViewType('Date');
                                            setFilterValue('All');
                                            setIsDropdownOpen(false);
                                        }
                                    }}
                                    className={`flex-1 md:flex-none w-full text-left px-3 py-2.5 text-sm rounded flex items-center justify-between transition-colors ${hoveredCategory === cat.id ? 'bg-white shadow-sm font-bold text-[#9f224e]' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <span className="flex items-center gap-2.5">
                                        {cat.icon}
                                        {cat.label}
                                    </span>
                                    {hoveredCategory === cat.id && <ChevronRight className="w-3 h-3 text-gray-300 hidden md:block"/>}
                                </button>
                           ))}
                       </div>

                       {/* RIGHT COLUMN: Options */}
                       <div className="flex-1 p-2 max-h-[350px] overflow-y-auto w-full">
                           
                           {/* OPTIONS: DATE */}
                           {hoveredCategory === 'Date' && (
                               <div className="flex flex-col justify-center items-center h-full text-center p-6 text-gray-500">
                                   <Clock className="w-10 h-10 mb-2 opacity-20" />
                                   <p className="text-sm">Hiển thị lịch thi đấu sắp xếp theo ngày giờ diễn ra (Mặc định).</p>
                                   <button 
                                        onClick={() => { setViewType('Date'); setFilterValue('All'); setIsDropdownOpen(false); }}
                                        className="mt-4 bg-[#111] text-white px-4 py-2 rounded text-xs font-bold"
                                    >
                                        Áp dụng
                                    </button>
                               </div>
                           )}

                           {/* OPTIONS: STAGE */}
                           {hoveredCategory === 'Stage' && (
                               <div className="space-y-1">
                                   <DropdownItem 
                                        label="Xem tất cả giai đoạn" 
                                        isActive={viewType === 'Stage' && filterValue === 'All'}
                                        onClick={() => { setViewType('Stage'); setFilterValue('All'); setIsDropdownOpen(false); }}
                                   />
                                   <div className="h-px bg-gray-100 my-1"></div>
                                   {STAGE_OPTIONS.map(stage => (
                                       <DropdownItem 
                                            key={stage}
                                            label={stage}
                                            isActive={viewType === 'Stage' && filterValue === stage}
                                            onClick={() => { setViewType('Stage'); setFilterValue(stage); setIsDropdownOpen(false); }}
                                       />
                                   ))}
                               </div>
                           )}

                           {/* OPTIONS: GROUP */}
                           {hoveredCategory === 'Group' && (
                               <div className="space-y-1">
                                   <DropdownItem 
                                        label="Xem tất cả các bảng" 
                                        isActive={viewType === 'Group' && filterValue === 'All'}
                                        onClick={() => { setViewType('Group'); setFilterValue('All'); setIsDropdownOpen(false); }}
                                   />
                                   <div className="h-px bg-gray-100 my-1"></div>
                                   <div className="grid grid-cols-2 gap-1">
                                       {GROUP_OPTIONS.map(group => (
                                           <DropdownItem 
                                                key={group}
                                                label={group}
                                                isActive={viewType === 'Group' && filterValue === group}
                                                onClick={() => { setViewType('Group'); setFilterValue(group); setIsDropdownOpen(false); }}
                                           />
                                       ))}
                                   </div>
                               </div>
                           )}

                           {/* OPTIONS: TEAM (Searchable) */}
                           {hoveredCategory === 'Team' && (
                               <div className="flex flex-col h-full">
                                   <div className="sticky top-0 bg-white pb-2 z-10">
                                       <div className="relative">
                                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                           <input 
                                                autoFocus
                                                type="text"
                                                placeholder="Tìm kiếm đội tuyển..."
                                                value={teamSearchQuery}
                                                onChange={(e) => setTeamSearchQuery(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#9f224e]"
                                           />
                                       </div>
                                   </div>
                                   
                                   <div className="flex-1 space-y-1 overflow-y-auto">
                                       {!teamSearchQuery && (
                                            <div className="mb-2">
                                                 <DropdownItem 
                                                    label="Xem tất cả lịch thi đấu" 
                                                    isActive={viewType === 'Team' && filterValue === 'All'}
                                                    onClick={() => { setViewType('Date'); setFilterValue('All'); setIsDropdownOpen(false); }}
                                                />
                                                <div className="h-px bg-gray-100 my-2"></div>
                                            </div>
                                       )}
                                       
                                       {teamsForDropdown.length > 0 ? teamsForDropdown.map(team => (
                                           <button 
                                                key={team.id}
                                                onClick={() => { setViewType('Team'); setFilterValue(team.name); setIsDropdownOpen(false); }}
                                                className={`w-full text-left px-3 py-2 text-sm rounded flex items-center gap-3 transition-colors ${viewType === 'Team' && filterValue === team.name ? 'bg-red-50 text-[#9f224e] font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                                           >
                                                <img src={team.flag} className="w-5 h-3.5 object-cover shadow-sm rounded-[1px]" />
                                                {team.name}
                                                {viewType === 'Team' && filterValue === team.name && <Check className="w-3.5 h-3.5 ml-auto"/>}
                                           </button>
                                       )) : (
                                           <div className="text-center py-8 text-gray-400 text-xs">Không tìm thấy đội tuyển</div>
                                       )}
                                   </div>
                               </div>
                           )}
                       </div>
                   </div>
               )}
           </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-6">
                {['TRẬN ĐẤU', 'SƠ ĐỒ', 'CẦU THỦ', 'BẢNG XẾP HẠNG'].map((tab) => {
                    const isActive = activeTab === 'matches' && tab === 'TRẬN ĐẤU';
                    return (
                        <button
                            key={tab}
                            className={`py-4 text-sm font-bold transition-colors whitespace-nowrap border-b-4 ${isActive ? 'border-[#9f224e] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            {tab}
                        </button>
                    )
                })}
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-8 pb-20 min-h-[600px]">
         {renderContent()}
      </div>

    </div>
  );
};

// --- Sub-components ---

const DropdownItem: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left px-3 py-2 text-sm rounded flex items-center justify-between transition-colors ${isActive ? 'bg-red-50 text-[#9f224e] font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
    >
        {label}
        {isActive && <Check className="w-3.5 h-3.5"/>}
    </button>
);

// Updated MatchRow Component - Single line FIFA style
const MatchRow: React.FC<{ match: Match; onClick: (m: Match) => void; showDateBadge?: boolean; showStageBadge?: boolean }> = ({ match, onClick, showDateBadge, showStageBadge }) => (
    <div 
        onClick={() => onClick(match)}
        className="group bg-white rounded-lg md:rounded-md shadow-sm border border-gray-200 hover:border-[#9f224e] transition-all cursor-pointer overflow-hidden p-3 md:px-5 md:py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:h-[72px]"
    >
        {/* Mobile: Top Metadata Row */}
        <div className="flex md:hidden justify-between items-center text-[10px] text-gray-500 font-medium uppercase tracking-wide border-b border-gray-100 pb-2 mb-1">
             <div className="flex items-center gap-2">
                 <span>{match.time}</span>
                 {showDateBadge && <span className="text-gray-400">• {match.date}</span>}
             </div>
             <span>{match.round}</span>
        </div>

        {/* Desktop Left: Time & Round */}
        <div className="hidden md:flex flex-col w-28 shrink-0 justify-center gap-0.5 border-r border-gray-100 pr-4">
             <div className="flex items-center gap-2">
                 <span className="text-base font-bold text-gray-900 leading-none">{match.time}</span>
                 {showDateBadge && <span className="text-[10px] text-gray-400 font-medium mt-0.5">{match.date}</span>}
             </div>
             {(showStageBadge || !showDateBadge) && (
                 <span className="text-[10px] text-gray-400 font-medium uppercase truncate">{match.round}</span>
             )}
        </div>

        {/* Center: Teams */}
        <div className="flex-1 flex items-center justify-between md:justify-center md:gap-12 px-1">
            {/* Home Team */}
            <div className="flex items-center gap-3 flex-1 md:justify-end min-w-0">
                <span className="text-sm md:text-[15px] font-bold text-gray-900 truncate order-2 md:order-1">{match.homeTeam}</span>
                <img src={match.homeFlag} className="w-6 h-4 md:w-8 md:h-5 object-cover shadow-sm rounded-sm order-1 md:order-2" alt={match.homeTeam} />
            </div>

            {/* Score / VS Status */}
            <div className="shrink-0 flex justify-center min-w-[40px]">
                 {match.status === 'finished' ? (
                     <span className="text-lg font-black text-gray-900 tracking-tight">{match.score}</span>
                 ) : (
                     <div className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">VS</div>
                 )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 flex-1 justify-end md:justify-start min-w-0">
                <img src={match.awayFlag} className="w-6 h-4 md:w-8 md:h-5 object-cover shadow-sm rounded-sm" alt={match.awayTeam} />
                <span className="text-sm md:text-[15px] font-bold text-gray-900 truncate">{match.awayTeam}</span>
            </div>
        </div>

        {/* Desktop Right: Venue */}
        <div className="hidden md:flex flex-col w-48 shrink-0 items-end justify-center text-right border-l border-gray-100 pl-4 h-full">
             <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 w-full justify-end">
                 <MapPin className="w-3 h-3 text-gray-300" />
                 <span className="truncate max-w-[140px]">{match.stadium}</span>
             </div>
        </div>
        
        {/* Mobile Bottom: Stadium */}
        <div className="md:hidden flex items-center gap-1.5 text-[10px] text-gray-400">
             <MapPin className="w-3 h-3" />
             <span className="truncate">{match.stadium}</span>
        </div>
    </div>
);

export default SchedulePage;
