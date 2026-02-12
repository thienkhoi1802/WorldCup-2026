
import React, { useState } from 'react';
import { ALL_TEAMS } from '../constants';
import { Team } from '../types';
import { Search, ArrowUpDown, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface TeamsPageProps {
    onTeamClick?: (team: Team) => void;
}

const REGIONS = [
    { code: 'ALL', name: 'All' },
    { code: 'AFC', name: 'AFC' },
    { code: 'CAF', name: 'CAF' },
    { code: 'CONCACAF', name: 'CONCACAF' },
    { code: 'CONMEBOL', name: 'CONMEBOL' },
    { code: 'OFC', name: 'OFC' },
    { code: 'UEFA', name: 'UEFA' },
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
            className={`${team.displayColor || 'bg-gray-800'} ${textColorClass} h-[240px] p-5 rounded flex flex-col justify-between cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-300 shadow-sm relative overflow-hidden group`}
        >
            {/* Subtle border for light cards to define edges against white page background */}
            {isDarkText && <div className="absolute inset-0 border border-black/5 rounded pointer-events-none"></div>}

            <div>
                <div className="flex items-start justify-between">
                    <img src={team.flag} alt={team.name} className="w-8 h-5 object-cover shadow-sm mb-4 rounded-[2px]" />
                    {label && <span className={`text-[10px] uppercase font-bold ${subTextClass} tracking-wider`}>{label}</span>}
                </div>
                <h3 className="text-3xl font-normal leading-tight font-serif tracking-tight">{team.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 text-[10px] uppercase font-medium mt-4 relative z-10">
                <div className="flex flex-col">
                    <span className={subTextClass}>Stage</span>
                    <span className="font-bold">{team.group || 'TBD'}</span>
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className={subTextClass}>FIFA Ranking</span>
                    <span className="font-bold">{team.ranking || '--'}</span>
                </div>
                 <div className={`flex flex-col col-span-2 border-t ${borderClass} pt-2 mt-2`}>
                    <span className={subTextClass}>Participations</span>
                    <span className="font-bold text-sm">{team.participations || 0}</span>
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
    <div className="bg-[#f5f5f5] min-h-[800px] p-6 font-sans">
       
       {/* Filters Section */}
       <div className="flex flex-col gap-6 mb-12">
           {/* Top Row: Search and Sort */}
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search team..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:block">Sort by:</span>
                    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                        <button 
                            onClick={() => setSortBy('name')}
                            className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${sortBy === 'name' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            A-Z
                        </button>
                        <button 
                            onClick={() => setSortBy('rank')}
                            className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${sortBy === 'rank' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            FIFA Rank
                        </button>
                    </div>
                </div>
           </div>

           {/* Bottom Row: Region Filter */}
           <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-4">
                {REGIONS.map((region) => (
                    <button
                        key={region.code}
                        onClick={() => setSelectedRegion(region.code)}
                        className={`text-sm font-medium transition-colors ${selectedRegion === region.code ? 'text-black font-bold bg-white px-4 py-2 rounded shadow-sm ring-1 ring-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {region.name}
                    </button>
                ))}
           </div>
       </div>

      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* HOST COUNTRY SECTION */}
        {hostTeamsList.length > 0 && (
            <section>
                <h2 className="text-2xl font-normal text-black mb-6 font-serif">Host country</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostTeamsList.map(team => (
                        <TeamCard key={team.id} team={team} label="Host country" onClick={onTeamClick} />
                    ))}
                </div>
            </section>
        )}

        {/* QUALIFIED TEAMS SECTION */}
        {qualifiedTeamsList.length > 0 ? (
            <section>
                <div className="flex items-end gap-3 mb-6">
                    <h2 className="text-2xl font-normal text-black font-serif">Qualified teams</h2>
                    <span className="text-sm font-medium text-gray-400 mb-1">({qualifiedTeamsList.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {qualifiedTeamsList.map(team => (
                        <TeamCard key={team.id} team={team} onClick={onTeamClick} />
                    ))}
                </div>
            </section>
        ) : (
             <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No teams found matching your criteria.</p>
                <button 
                    onClick={() => {setSearchQuery(''); setSelectedRegion('ALL');}}
                    className="mt-3 text-sm text-[#9f224e] font-bold hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
