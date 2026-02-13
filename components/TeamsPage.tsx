
import React, { useState } from 'react';
import { ALL_TEAMS } from '../constants';
import { Team } from '../types';
import { Search, ArrowUpDown, SlidersHorizontal, AlertCircle } from 'lucide-react';
import MatchScheduleBox from './MatchScheduleBox';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';

interface TeamsPageProps {
    onTeamClick?: (team: Team) => void;
}

const REGIONS = [
    { code: 'ALL', name: 'Tất cả' },
    { code: 'AFC', name: 'Châu Á' },
    { code: 'UEFA', name: 'Châu Âu' },
    { code: 'CONMEBOL', name: 'Nam Mỹ' },
    { code: 'CONCACAF', name: 'Bắc Mỹ' },
    { code: 'CAF', name: 'Châu Phi' },
];

const TeamCard: React.FC<{ team: Team; label?: string; onClick?: (team: Team) => void }> = ({ team, label, onClick }) => {
    // Determine text contrast based on the background class provided in constants
    const isDarkText = team.displayColor?.includes('text-black');
    
    const textColorClass = isDarkText ? 'text-gray-900' : 'text-white';
    const subTextClass = isDarkText ? 'text-gray-900/60' : 'text-white/80';
    const borderClass = isDarkText ? 'border-black/10' : 'border-white/10';

    return (
        <div 
            onClick={() => onClick && onClick(team)}
            className={`${team.displayColor || 'bg-gray-800'} ${textColorClass} h-[200px] p-4 rounded-lg flex flex-col justify-between cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sm relative overflow-hidden group`}
        >
            {/* Subtle border for light cards to define edges against white page background */}
            {isDarkText && <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none"></div>}
            
            <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                    <img src={team.flag} alt={team.name} className="w-8 h-5 object-cover shadow-sm rounded-[2px]" />
                    {label && <span className={`text-[9px] uppercase font-bold ${subTextClass} tracking-wider bg-white/20 px-1.5 py-0.5 rounded`}>{label}</span>}
                </div>
                <h3 className="text-2xl font-bold leading-tight font-serif tracking-tight">{team.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-y-1 text-[10px] uppercase font-medium mt-2 relative z-10">
                <div className="flex flex-col">
                    <span className={subTextClass}>Bảng đấu</span>
                    <span className="font-bold">{team.group || 'TBD'}</span>
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className={subTextClass}>Hạng FIFA</span>
                    <span className="font-bold text-lg leading-none">{team.ranking || '--'}</span>
                </div>
            </div>
        </div>
    );
};

const TeamsPage: React.FC<TeamsPageProps> = ({ onTeamClick }) => {
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rank'>('name');

  const hosts = ['us', 'ca', 'mx'];
  
  // Filter Logic
  const filteredTeams = ALL_TEAMS.filter(t => {
      // Basic qualified check
      if (!t.isQualified) return false;
      
      // Region check
      if (selectedRegion !== 'ALL' && t.region !== selectedRegion) return false;

      // Search check
      if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
  });

  const hostTeamsList = filteredTeams.filter(t => hosts.includes(t.id));
  
  // Sort Logic for Qualified Teams
  const qualifiedTeamsList = filteredTeams
    .filter(t => !hosts.includes(t.id))
    .sort((a, b) => {
        if (sortBy === 'rank') {
            return (a.ranking || 999) - (b.ranking || 999);
        }
        return a.name.localeCompare(b.name);
    });

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
        
       <div className="max-w-[1140px] mx-auto px-4 mt-6">
           <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* --- LEFT COLUMN: MAIN CONTENT (760px) --- */}
                <div className="min-w-0">
                    
                    {/* Header & Controls - Optimized Layout */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <h1 className="text-2xl text-gray-900 font-serif font-black uppercase tracking-tight shrink-0">Đội tuyển</h1>
                            
                            <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
                                {/* Search */}
                                <div className="relative flex-1 max-w-md ml-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Tìm kiếm đội tuyển..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e] transition-all placeholder:text-gray-400"
                                    />
                                </div>
                                
                                {/* Sort (Desktop) */}
                                <div className="hidden md:flex items-center gap-2 shrink-0">
                                    <span className="text-xs font-bold text-gray-400 uppercase mr-1">Sắp xếp:</span>
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                        <button 
                                            onClick={() => setSortBy('name')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${sortBy === 'name' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                        >
                                            A-Z
                                        </button>
                                        <button 
                                            onClick={() => setSortBy('rank')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${sortBy === 'rank' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                        >
                                            Hạng FIFA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Filters & Mobile Sort */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-gray-100 pt-4">
                             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full pb-1 sm:pb-0">
                                <button
                                    onClick={() => setSelectedRegion('ALL')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${selectedRegion === 'ALL' ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                                >
                                    Tất cả
                                </button>
                                <div className="w-px h-5 bg-gray-300 mx-1 shrink-0 hidden sm:block"></div>
                                {REGIONS.filter(r => r.code !== 'ALL').map((region) => (
                                    <button
                                        key={region.code}
                                        onClick={() => setSelectedRegion(region.code)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${selectedRegion === region.code ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                                    >
                                        {region.name}
                                    </button>
                                ))}
                            </div>
                             
                             {/* Mobile Sort */}
                             <div className="md:hidden flex items-center gap-2 shrink-0 ml-auto w-full justify-end border-t border-gray-50 sm:border-0 pt-3 sm:pt-0">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Xếp theo:</span>
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                        <button 
                                            onClick={() => setSortBy('name')}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${sortBy === 'name' ? 'bg-white text-black shadow-sm' : 'text-gray-500'}`}
                                        >
                                            A-Z
                                        </button>
                                        <button 
                                            onClick={() => setSortBy('rank')}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${sortBy === 'rank' ? 'bg-white text-black shadow-sm' : 'text-gray-500'}`}
                                        >
                                            Hạng
                                        </button>
                                    </div>
                             </div>
                        </div>
                    </div>

                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* HOST COUNTRY SECTION */}
                        {hostTeamsList.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 uppercase font-serif mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-[#9f224e] rounded"></span>
                                    Chủ nhà
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {hostTeamsList.map(team => (
                                        <TeamCard key={team.id} team={team} label="Chủ nhà" onClick={onTeamClick} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* QUALIFIED TEAMS SECTION */}
                        {qualifiedTeamsList.length > 0 ? (
                            <section>
                                <div className="flex items-end gap-3 mb-4 border-b border-gray-200 pb-2">
                                    <h2 className="text-lg font-bold text-gray-900 uppercase font-serif flex items-center gap-2">
                                        <span className="w-1.5 h-6 bg-gray-900 rounded"></span>
                                        Đội tuyển tham dự
                                    </h2>
                                    <span className="text-sm font-bold text-gray-400 mb-1">({qualifiedTeamsList.length})</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {qualifiedTeamsList.map(team => (
                                        <TeamCard key={team.id} team={team} onClick={onTeamClick} />
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl bg-white">
                                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">Không tìm thấy đội tuyển nào.</p>
                                <button 
                                    onClick={() => {setSearchQuery(''); setSelectedRegion('ALL');}}
                                    className="mt-3 text-sm text-[#9f224e] font-bold hover:underline"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: SIDEBAR (300px) --- */}
                <aside className="w-full flex flex-col gap-6">
                    <MatchScheduleBox />
                    <StandingsWidget />
                    <PollWidget />
                </aside>
           </div>
       </div>
    </div>
  );
};

export default TeamsPage;
