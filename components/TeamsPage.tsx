
import React, { useState, useRef, useEffect } from 'react';
import { ALL_TEAMS, WC_GROUPS_MOCK } from '../constants';
import { Team } from '../types';
import { Search, Home, X, ChevronRight, Check } from 'lucide-react';
import MatchScheduleBox from './MatchScheduleBox';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';

interface TeamsPageProps {
    onTeamClick?: (team: Team) => void;
}

const REGIONS = [
    { code: 'ALL', name: 'Tất cả' },
    { code: 'AFC', name: 'Châu Á' },
    { code: 'CAF', name: 'Châu Phi' },
    { code: 'CONCACAF', name: 'Bắc Mỹ' },
    { code: 'CONMEBOL', name: 'Nam Mỹ' },
    { code: 'OFC', name: 'Châu Đại Dương' },
    { code: 'UEFA', name: 'Châu Âu' },
];

const findGroup = (teamName: string) => {
    for (const [group, teams] of Object.entries(WC_GROUPS_MOCK)) {
        if (teams.some(t => t.team === teamName)) return group;
    }
    return null;
}

const TeamCard: React.FC<{ team: Team; onClick?: (team: Team) => void }> = ({ team, onClick }) => {
    const isHost = ['México', 'Hoa Kỳ', 'Canada'].includes(team.name);
    
    // Determine text color based on background class provided in constants
    const hasBlackText = team.displayColor?.includes('text-black');
    const titleColor = hasBlackText ? 'text-gray-900' : 'text-white';
    const subTitleColor = hasBlackText ? 'text-gray-800/80' : 'text-white/80';
    
    const participations = team.participations || Math.floor(Math.random() * 10) + 1;
    const group = findGroup(team.name);

    return (
        <div 
            onClick={() => onClick && onClick(team)} 
            className="flex flex-col bg-white rounded-none md:rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full"
        >
            {/* Top Section: Colored Background */}
            <div className={`${team.displayColor || 'bg-gray-800'} h-[160px] p-5 flex flex-col justify-between relative`}>
                 <div className="flex justify-between items-start relative z-10">
                    <img src={team.flag} className="w-9 h-6 object-cover shadow-sm border border-black/10 rounded-[1px]" alt={team.name} />
                 </div>
                 
                 <div className="relative z-10">
                    {isHost && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${subTitleColor}`}>Host country</span>
                    )}
                    <h3 className={`text-2xl md:text-3xl font-sans font-medium leading-none tracking-tight ${titleColor}`}>
                        {team.name}
                    </h3>
                 </div>
            </div>

            {/* Bottom Section: Stats */}
            <div className="p-4 bg-white flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stage</span>
                         <span className="text-xs font-bold text-gray-900">{group ? `Group ${group}` : 'Qualifying'}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">World Ranking</span>
                         <span className="text-xs font-bold text-gray-900">{team.ranking || '--'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Participations</span>
                         <span className="text-xs font-bold text-gray-900">{participations}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TeamsPage: React.FC<TeamsPageProps> = ({ onTeamClick }) => {
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTeams = ALL_TEAMS.filter(t => 
    t.isQualified && 
    (selectedRegion === 'ALL' || t.region === selectedRegion) && 
    (!searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const dropdownTeams = ALL_TEAMS.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRegionSection = (regionCode: string, regionName: string) => {
      const teams = filteredTeams.filter(t => t.region === regionCode);
      if (teams.length === 0) return null;

      return (
          <div key={regionCode} className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
                  <h2 className="text-xl font-black text-gray-900 uppercase font-serif tracking-tight">{regionName}</h2>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">{teams.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map(team => <TeamCard key={team.id} team={team} onClick={onTeamClick} />)}
              </div>
          </div>
      );
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
       <div className="max-w-[1100px] mx-auto px-4 mt-8">
           <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* Main Column: 760px */}
                <div className="min-w-0">
                    
                    {/* Header: Title Left, Search Right */}
                    <div className="bg-white rounded-t-xl border border-gray-200 border-b-0 p-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl text-gray-900 font-serif font-black uppercase tracking-tighter">Đội tuyển</h1>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Danh sách 48 đội bóng tranh tài tại World Cup 2026</p>
                            </div>
                            
                            {/* Search Box with Dropdown */}
                            <div className="relative" ref={searchRef}>
                                <div className={`flex items-center border transition-all rounded-md bg-white ${isSearchFocused ? 'border-[#9f224e] ring-1 ring-[#9f224e] w-full md:w-[280px]' : 'border-gray-300 w-full md:w-[240px] hover:border-gray-400'}`}>
                                    <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
                                    <input 
                                        type="text" 
                                        placeholder="Tìm kiếm đội tuyển..." 
                                        value={searchQuery} 
                                        onFocus={() => setIsSearchFocused(true)}
                                        onChange={(e) => setSearchQuery(e.target.value)} 
                                        className="w-full pl-2 pr-2 py-2 text-sm outline-none bg-transparent placeholder:text-gray-400 text-gray-700" 
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => { setSearchQuery(''); setIsSearchFocused(true); }}
                                            className="mr-2 text-gray-400 hover:text-black"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>

                                {/* Dropdown Results */}
                                {isSearchFocused && (
                                    <div className="absolute top-full right-0 mt-2 w-full md:w-[320px] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-2">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 bg-gray-50/50 rounded-lg mb-1">
                                                {searchQuery ? `Kết quả cho "${searchQuery}"` : 'Tất cả đội tuyển'}
                                            </div>
                                            {dropdownTeams.length > 0 ? (
                                                <div className="space-y-1">
                                                    {dropdownTeams.map(team => (
                                                        <button
                                                            key={team.id}
                                                            onClick={() => {
                                                                if (onTeamClick) onTeamClick(team);
                                                                setIsSearchFocused(false);
                                                                setSearchQuery('');
                                                            }}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                                                        >
                                                            <div className="relative shrink-0">
                                                                <img src={team.flag} alt={team.name} className="w-8 h-6 object-cover shadow-sm rounded-sm border border-gray-100" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-sm font-bold text-gray-900 group-hover:text-[#9f224e] truncate">{team.name}</div>
                                                                <div className="text-[10px] text-gray-500">{team.region}</div>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#9f224e]" />
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="px-3 py-6 text-center text-sm text-gray-500">
                                                    Không tìm thấy đội tuyển nào.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Tabs Bar */}
                    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border border-gray-200 border-t-0 rounded-b-xl shadow-sm px-6 py-3 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {REGIONS.map((region) => (
                                <button 
                                    key={region.code} 
                                    onClick={() => {
                                        setSelectedRegion(region.code);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }} 
                                    className={`px-3 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wide transition-all border ${
                                        selectedRegion === region.code 
                                        ? 'bg-[#9f224e] border-[#9f224e] text-white shadow-md' 
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900'
                                    }`}
                                >
                                    {region.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hosts Highlight (Only on ALL view and no search) */}
                    {(selectedRegion === 'ALL' || selectedRegion === 'CONCACAF') && !searchQuery && (
                         <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
                                <Home className="w-5 h-5 text-[#9f224e]" />
                                <h2 className="text-xl font-black text-gray-900 uppercase font-serif tracking-tight">Nước chủ nhà</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {ALL_TEAMS.filter(t => ['México', 'Hoa Kỳ', 'Canada'].includes(t.name)).map(team => 
                                    <TeamCard key={team.id} team={team} onClick={onTeamClick} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Render Regions */}
                    {selectedRegion === 'ALL' ? (
                        REGIONS.filter(r => r.code !== 'ALL').map(region => renderRegionSection(region.code, region.name))
                    ) : (
                        renderRegionSection(selectedRegion, REGIONS.find(r => r.code === selectedRegion)?.name || '')
                    )}
                </div>

                {/* Sidebar Column: 300px */}
                <aside className="w-full flex flex-col gap-6">
                    <MatchScheduleBox />
                    <StandingsWidget onTeamClick={onTeamClick} />
                    <PollWidget />
                </aside>
           </div>
       </div>
    </div>
  );
};

export default TeamsPage;
