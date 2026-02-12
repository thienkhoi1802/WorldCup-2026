
import React, { useState } from 'react';
import { WC_GROUPS_MOCK, ALL_TEAMS } from '../constants';
import { Search, X } from 'lucide-react';
import { Team } from '../types';

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
    <div className="bg-[#f9f9f9] min-h-screen font-sans pb-12">
        {/* Header - Optional Context */}
        <div className="bg-[#f9f9f9] py-6 mb-2 sticky top-[50px] z-30 shadow-sm/50 backdrop-blur-sm bg-[#f9f9f9]/90 border-b border-gray-200/50">
            <div className="max-w-[1140px] mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                    <h1 className="text-3xl text-black font-sans font-bold">Bảng xếp hạng</h1>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <input 
                            type="text" 
                            placeholder="Tìm đội tuyển..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e] transition-all shadow-sm"
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
                        className={`px-5 py-1.5 rounded-full text-sm font-bold border transition-all shadow-sm ${
                            activeFilter === 'ALL' 
                            ? 'bg-[#9f224e] border-[#9f224e] text-white' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black'
                        }`}
                    >
                        Tất cả
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-2 hidden sm:block"></div>
                    <div className="flex flex-wrap gap-2">
                        {allGroups.map(group => (
                            <button
                                key={group}
                                onClick={() => setActiveFilter(group)}
                                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold border transition-all shadow-sm ${
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
        </div>

      <div className="max-w-[1140px] mx-auto px-4 flex flex-col gap-8 mt-6">
        {displayedGroups.map((group) => {
            const standings = WC_GROUPS_MOCK[group];
            
            // Filter teams by search query
            const filteredStandings = standings.filter(team => 
                team.team.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Hide group if no teams match search
            if (filteredStandings.length === 0) return null;

            return (
                <div key={group} className="bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col rounded-lg animate-in fade-in duration-500">
                    {/* Table Header */}
                    <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
                        <h2 className="text-xl font-bold text-black">Nhóm {group}</h2>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/50 text-[12px] text-gray-500 font-normal border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 min-w-[200px] font-normal pl-6">Đội tuyển</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Số trận đã đấu">Trận</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Số trận thắng">T</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Số trận hòa">H</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Số trận thua">B</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Bàn thắng ghi được">BT</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Bàn thua">BB</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Hiệu số bàn thắng bại">HS</th>
                                    <th className="px-2 py-3 text-center w-12 font-normal text-xs text-gray-500 uppercase" title="Tổng điểm">Điểm</th>
                                    <th className="px-4 py-3 text-center w-32 font-normal text-xs text-gray-500 pr-6">Phong độ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredStandings.map((row, index) => {
                                    // Logic giả định: 2 đội đầu bảng sẽ có vạch xanh (đủ điều kiện)
                                    // Trong thực tế cần dựa vào isQualified hoặc logic bảng đấu
                                    const isQualified = index < 2; 

                                    // Find team object for linking
                                    const teamData = ALL_TEAMS.find(t => t.name.toLowerCase() === row.team.toLowerCase());

                                    return (
                                        <tr 
                                            key={row.team} 
                                            onClick={() => teamData && onTeamClick && onTeamClick(teamData)}
                                            className={`hover:bg-gray-50 transition-colors h-14 group ${teamData ? 'cursor-pointer' : ''}`}
                                            title={teamData ? "Xem chi tiết đội bóng" : ""}
                                        >
                                            <td className="px-4 py-3 pl-6">
                                                <div className="flex items-center gap-4">
                                                    {/* Rank & Qualification Indicator */}
                                                    <div className="relative w-6 flex justify-center">
                                                        {isQualified && !searchQuery && (
                                                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-600 rounded-r"></div>
                                                        )}
                                                        <span className={`text-gray-500 font-medium ${index < 2 ? 'text-black font-bold' : ''}`}>
                                                            {row.rank}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3">
                                                        <img src={row.flag} alt={row.team} className="w-8 h-5 object-contain shadow-sm border border-gray-100 rounded-[2px]" />
                                                        <span className={`text-[15px] font-semibold text-gray-900 transition-colors ${teamData ? 'group-hover:text-[#9f224e] group-hover:underline decoration-1 underline-offset-2' : ''}`}>
                                                            {/* Highlight search match */}
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
                                            <td className="px-2 py-3 text-center text-gray-600">{row.won}</td>
                                            <td className="px-2 py-3 text-center text-gray-600">{row.drawn}</td>
                                            <td className="px-2 py-3 text-center text-gray-600">{row.lost}</td>
                                            <td className="px-2 py-3 text-center text-gray-600">{row.gf}</td>
                                            <td className="px-2 py-3 text-center text-gray-600">{row.ga}</td>
                                            <td className="px-2 py-3 text-center text-gray-600">{row.gd}</td>
                                            <td className="px-2 py-3 text-center font-bold text-black bg-gray-50/50">{row.points}</td>
                                            <td className="px-4 py-3 text-center pr-6">
                                                <div className="flex items-center justify-center gap-1 text-gray-300 font-mono tracking-widest text-xs">
                                                    - - - - -
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
            <div className="text-center py-12 text-gray-500">
                <p>Không tìm thấy đội tuyển nào phù hợp với "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="text-[#9f224e] font-bold hover:underline mt-2">Xóa tìm kiếm</button>
            </div>
        )}

        {/* --- LEGEND / FOOTER --- */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-sm text-gray-600 shadow-sm mt-4">
             <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Column 1: Qualification */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                         <span className="w-1.5 h-6 bg-green-600 rounded"></span>
                         <span className="font-semibold text-gray-900">Vào vòng trong</span>
                    </div>
                </div>

                {/* Column 2: Stats Abbreviations */}
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                     <span className="flex gap-1"><strong className="text-gray-900">Trận</strong>: Số trận đã đấu</span>
                     <span className="flex gap-1"><strong className="text-gray-900">T</strong>: Thắng</span>
                     <span className="flex gap-1"><strong className="text-gray-900">H</strong>: Hòa</span>
                     <span className="flex gap-1"><strong className="text-gray-900">B</strong>: Bại</span>
                     <span className="flex gap-1"><strong className="text-gray-900">BT</strong>: Bàn thắng</span>
                     <span className="flex gap-1"><strong className="text-gray-900">BB</strong>: Bàn bại (thua)</span>
                     <span className="flex gap-1"><strong className="text-gray-900">HS</strong>: Hiệu số</span>
                     <span className="flex gap-1"><strong className="text-gray-900">Điểm</strong>: Tổng điểm</span>
                </div>
             </div>

             {/* Row 2: Form Guide */}
             <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6">
                <span className="font-bold text-gray-900">Phong độ:</span>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <span>Thắng</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                    <span>Hòa</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span>Thua</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-400">-</span>
                    <span>Chưa thi đấu</span>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;
