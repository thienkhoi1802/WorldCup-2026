import React from 'react';
import { POPULAR_TEAMS } from '../constants';

const PopularTeams: React.FC = () => {
  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="text-[#9f224e] font-bold text-lg mb-4 uppercase">Đội tuyển được quan tâm</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {POPULAR_TEAMS.map((team) => (
          <div 
            key={team.id} 
            className="flex items-center gap-3 p-3 border border-gray-100 bg-white rounded hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
          >
            <img src={team.flag} alt={team.name} className="w-10 h-7 object-cover shadow-sm" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTeams;