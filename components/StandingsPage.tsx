
import React, { useState } from 'react';
import { WC_GROUPS_MOCK, ALL_TEAMS } from '../constants';
import { Search, X } from 'lucide-react';
import { Team } from '../types';
import MatchScheduleBox from './MatchScheduleBox';
import PollWidget from './PollWidget';
import TriviaWidget from './TriviaWidget';

interface StandingsPageProps {
    onBack?: () => void;
    onTeamClick?: (team: Team) => void;
}

const StandingsPage: React.FC<StandingsPageProps> = ({ onBack, onTeamClick }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const allGroups = Object.keys(WC_GROUPS_MOCK);

  // Filter groups based on selection
  const displayedGroups = activeFilter === 'ALL' 
    ? allGroups 
    : allGroups.filter(g => g === activeFilter);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
        
        <div className="max-w-[1140px] mx-auto px-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* --- LEFT COLUMN: MAIN CONTENT (760px) --- */}
                <div className="min-w-0">
                    
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                            <h1 className="text-3xl text-gray-900 font-serif font-bold leading-none">Bảng xếp hạng</h1>
                            
                            {/* Search Bar */}
                            <div className="relative w-full md:w-64">
                                <input 
                                    type="text" 
                                    placeholder="Tìm đội tuyển..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e] transition-all shadow-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Filter Controls */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button 
                                onClick={() => setActiveFilter('ALL')}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all shadow-sm ${
                                    activeFilter === 'ALL' 
                                    ? 'bg-[#9f224e] border-[#9f224e] text-white' 
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black'
                                }`}
                            >
                                Tất cả
                            </button>
                            <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
                            <div className="flex flex-wrap gap-2">
                                {allGroups.map(group => (
                                    <button
                                        key={group}
                                        onClick={() => setActiveFilter(group)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border transition-all shadow-sm ${
                                            activeFilter === group 
                                            ? 'bg-[#9f224e] border-[#9f224e] text-white' 
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black'
                                        }`}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        {displayedGroups.map((group) => {
                            const standings = WC_GROUPS_MOCK[group];
                            
                            // Filter teams by search query
                            const filteredStandings = standings.filter(team => 
                                team.team.toLowerCase().includes(searchQuery.toLowerCase())
                            );

                            // Hide group if no teams match search
                            if (filteredStandings.length === 0) return null;

                            return (
                                <div key={group} className="bg-white shadow-sm border border-gray-200 overflow-hidden flex flex-col rounded-lg animate-in fade-in duration-500">
                                    {/* Table Header */}
                                    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
                                        <h2 className="text-lg font-black uppercase font-serif text-gray-900 border-l-4 border-[#9f224e] pl-3">Nhóm {group}</h2>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-white text-[10px] text-gray-500 font-bold uppercase border-b border-gray-100">
                                                <tr>
                                                    <th className="px-4 py-3 min-w-[180px] pl-6">Đội tuyển</th>
                                                    <th className="px-2 py-3 text-center w-10 text-gray-400" title="Số trận đã đấu">Tr</th>
                                                    <th className="px-2 py-3 text-center w-10 text-gray-400" title="Hiệu số bàn thắng bại">HS</th>
                                                    <th className="px-2 py-3 text-center w-10 text-black font-black" title="Tổng điểm">Đ</th>
                                                    <th className="px-4 py-3 text-center w-32 pr-6">Phong độ</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {filteredStandings.map((row, index) => {
                                                    const isQualified = index < 2; 
                                                    const teamData = ALL_TEAMS.find(t => t.name.toLowerCase() === row.team.toLowerCase());

                                                    return (
                                                        <tr 
                                                            key={row.team} 
                                                            onClick={() => teamData && onTeamClick && onTeamClick(teamData)}
                                                            className={`hover:bg-gray-50 transition-colors h-14 group ${teamData ? 'cursor-pointer' : ''}`}
                                                        >
                                                            <td className="px-4 py-3 pl-6">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="relative w-6 flex justify-center">
                                                                        {isQualified && !searchQuery && (
                                                                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r"></div>
                                                                        )}
                                                                        <span className={`text-gray-500 font-medium ${index < 2 ? 'text-black font-bold' : ''}`}>
                                                                            {row.rank}
                                                                        </span>
                                                                    </div>
                                                                    
                                                                    <div className="flex items-center gap-3">
                                                                        <img src={row.flag} alt={row.team} className="w-8 h-5 object-contain shadow-sm border border-gray-100 rounded-[2px]" />
                                                                        <span className={`text-[14px] font-bold text-gray-800 transition-colors ${teamData ? 'group-hover:text-[#9f224e]' : ''}`}>
                                                                            {searchQuery ? (
                                                                                <>
                                                                                    {row.team.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                                                                                        part.toLowerCase() === searchQuery.toLowerCase() ? <span key={i} className="bg-yellow-200">{part}</span> : part
                                                                                    )}
                                                                                </>
                                                                            ) : row.team}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-2 py-3 text-center text-gray-600">{row.played}</td>
                                                            <td className="px-2 py-3 text-center text-gray-600">{row.gd}</td>
                                                            <td className="px-2 py-3 text-center font-bold text-black bg-gray-50/50">{row.points}</td>
                                                            <td className="px-4 py-3 text-center pr-6">
                                                                <div className="flex items-center justify-center gap-1">
                                                                    {['W', 'D', 'L', '-', '-'].slice(0, 5).map((r, i) => (
                                                                        <span key={i} className={`w-1.5 h-1.5 rounded-full ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-gray-400' : r === 'L' ? 'bg-red-500' : 'bg-gray-200'}`}></span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {/* No Results Message */}
                        {displayedGroups.every(group => WC_GROUPS_MOCK[group].filter(t => t.team.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                                <p>Không tìm thấy đội tuyển nào phù hợp với "{searchQuery}"</p>
                                <button onClick={() => setSearchQuery('')} className="text-[#9f224e] font-bold hover:underline mt-2">Xóa tìm kiếm</button>
                            </div>
                        )}

                        {/* --- LEGEND --- */}
                        <div className="bg-white p-5 rounded-lg border border-gray-200 text-xs text-gray-600 shadow-sm">
                            <div className="flex flex-wrap gap-x-8 gap-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-green-500 rounded"></span>
                                    <span className="font-bold text-gray-900">Vào vòng trong</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex gap-1"><strong className="text-gray-900">Tr</strong>: Số trận</span>
                                    <span className="flex gap-1"><strong className="text-gray-900">HS</strong>: Hiệu số</span>
                                    <span className="flex gap-1"><strong className="text-gray-900">Đ</strong>: Điểm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: SIDEBAR (300px) --- */}
                <aside className="w-full flex flex-col gap-6">
                    <MatchScheduleBox />
                    <PollWidget />
                    <TriviaWidget />
                </aside>

            </div>
        </div>
    </div>
  );
};

export default StandingsPage;
