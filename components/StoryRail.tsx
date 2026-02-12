
import React from 'react';
import { ALL_TEAMS } from '../constants';
import { Plus } from 'lucide-react';
import { Team } from '../types';

interface StoryRailProps {
  onTeamClick?: (team: Team) => void;
}

const StoryRail: React.FC<StoryRailProps> = ({ onTeamClick }) => {
  // Lọc chỉ lấy các đội đã có vé (isQualified = true) dựa trên danh sách 42 đội
  // Sắp xếp theo thứ hạng FIFA để đưa các đội mạnh lên đầu
  const stories = ALL_TEAMS.filter(t => t.isQualified).sort((a, b) => (a.ranking || 100) - (b.ranking || 100));

  return (
    <div className="mb-8 relative group/rail">
       {/* Gradient masks for scrolling indication */}
       <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f0f2f5] to-transparent z-10 pointer-events-none"></div>
       <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f0f2f5] to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-start gap-5 overflow-x-auto no-scrollbar py-4 px-4">
        {/* 'Add Your Team' Action */}
        <div className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group shrink-0">
            <div className="w-[68px] h-[68px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-hover:border-[#9f224e] transition-colors shadow-sm">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#9f224e]" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 text-center leading-tight">Theo dõi<br/>Đội tuyển</span>
        </div>

        {/* Stories List (42 Teams) */}
        {stories.map((team, idx) => {
             // Giả lập trạng thái LIVE cho một số đội top đầu để demo
             const isLive = idx === 0 || idx === 4 || idx === 12; 
             
             return (
                <div 
                    key={team.id} 
                    onClick={() => onTeamClick && onTeamClick(team)}
                    className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group shrink-0 relative"
                >
                    <div className={`p-[2px] rounded-full ${isLive ? 'bg-gradient-to-tr from-[#9f224e] to-red-500 animate-pulse' : 'bg-gradient-to-tr from-gray-200 to-gray-300 group-hover:from-[#9f224e] group-hover:to-[#9f224e] transition-colors'}`}>
                        <div className="w-[64px] h-[64px] rounded-full p-0.5 bg-white">
                            <img 
                                src={team.flag} 
                                alt={team.name} 
                                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    
                    <span className="text-[10px] font-bold text-gray-700 text-center truncate w-[74px] group-hover:text-[#9f224e] transition-colors leading-tight">
                        {team.name.replace(' (Chủ nhà)', '')}
                    </span>

                    {isLive && (
                        <span className="absolute top-[54px] bg-[#9f224e] text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-sm border border-white z-10 tracking-wider">
                            LIVE
                        </span>
                    )}
                </div>
             );
        })}
      </div>
    </div>
  );
};

export default StoryRail;
