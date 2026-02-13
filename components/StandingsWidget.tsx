
import React, { useState, useEffect } from 'react';
import { WC_GROUPS_MOCK, ALL_TEAMS } from '../constants';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Team } from '../types';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

interface StandingsWidgetProps {
    onTeamClick?: (team: Team) => void;
    initialGroup?: string;
}

const StandingsWidget: React.FC<StandingsWidgetProps> = ({ onTeamClick, initialGroup }) => {
  const [activeGroup, setActiveGroup] = useState(initialGroup || 'A');

  // Cập nhật activeGroup khi props initialGroup thay đổi (ví dụ khi chuyển trận đấu khác)
  useEffect(() => {
    if (initialGroup) {
        setActiveGroup(initialGroup);
    }
  }, [initialGroup]);

  const handleNext = () => {
    const idx = GROUPS.indexOf(activeGroup);
    if (idx < GROUPS.length - 1) setActiveGroup(GROUPS[idx + 1]);
  };

  const handlePrev = () => {
    const idx = GROUPS.indexOf(activeGroup);
    if (idx > 0) setActiveGroup(GROUPS[idx - 1]);
  };

  const handleTeamClick = (teamName: string) => {
      const team = ALL_TEAMS.find(t => t.name === teamName);
      if (team && onTeamClick) {
          onTeamClick(team);
      }
  };

  const currentStandings = WC_GROUPS_MOCK[activeGroup] || [];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex flex-col">
            <h3 className="text-gray-900 font-bold text-sm uppercase font-serif">BXH Vòng Bảng WC 2026</h3>
            <span className="text-[10px] text-gray-500 font-medium">(Dự kiến)</span>
        </div>
        <a href="#" className="text-xs text-[#9f224e] font-bold hover:underline">Chi tiết</a>
      </div>

      {/* Group Selector */}
      <div className="flex items-center justify-between bg-white border-b border-gray-100 px-2 py-2">
         <button onClick={handlePrev} disabled={activeGroup === 'A'} className="p-1 text-gray-400 hover:text-black disabled:opacity-30"><ChevronLeft className="w-4 h-4"/></button>
         <div className="flex gap-1 overflow-x-auto no-scrollbar px-1">
            {GROUPS.map(g => (
                <button
                    key={g}
                    onClick={() => setActiveGroup(g)}
                    className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${activeGroup === g ? 'bg-[#9f224e] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    {g}
                </button>
            ))}
         </div>
         <button onClick={handleNext} disabled={activeGroup === 'L'} className="p-1 text-gray-400 hover:text-black disabled:opacity-30"><ChevronRight className="w-4 h-4"/></button>
      </div>
      
      <table className="w-full text-sm text-left">
        <thead className="bg-white text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100">
          <tr>
            <th className="px-3 py-2 text-center w-8">#</th>
            <th className="px-2 py-2">Đội tuyển</th>
            <th className="px-2 py-2 text-center">Trận</th>
            <th className="px-2 py-2 text-center">HS</th>
            <th className="px-2 py-2 text-center text-gray-900">Điểm</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {currentStandings.map((row) => {
            const isClickable = !row.team.includes('Thắng') && !row.team.includes('nhánh');
            return (
              <tr key={row.team} className={`hover:bg-gray-50 transition-colors ${row.team === 'Việt Nam' ? 'bg-yellow-50' : ''}`}>
                <td className="px-3 py-3 text-center">
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${row.rank <= 2 ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}>
                      {row.rank}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div 
                      className={`flex items-center gap-2 group ${isClickable ? 'cursor-pointer' : ''}`}
                      onClick={() => isClickable && handleTeamClick(row.team)}
                  >
                    <img src={row.flag} alt={row.team} className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm border border-gray-200" />
                    <span className={`font-semibold text-xs transition-colors ${isClickable ? 'group-hover:text-[#9f224e]' : ''} ${row.team === 'Việt Nam' ? 'text-[#9f224e]' : 'text-gray-800'}`}>
                        {row.team}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center text-gray-500 text-xs">{row.played}</td>
                <td className="px-2 py-3 text-center text-gray-400 text-xs">{row.gd}</td>
                <td className="px-2 py-3 text-center font-bold text-gray-900">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Legend */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-4">
         <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Vòng knock-out</span>
         </div>
      </div>
    </div>
  );
};

export default StandingsWidget;
