
import React from 'react';
import { ALL_TEAMS } from '../constants';

const QualifiedCounter: React.FC = () => {
  const qualifiedTeams = ALL_TEAMS.filter(team => team.isQualified);
  const count = qualifiedTeams.length;
  const total = 48;
  const percentage = (count / total) * 100;

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 text-white shadow-md relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        
        <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2">Đường đến World Cup</h3>
        
        <div className="flex items-end gap-2 mb-1">
            <span className="text-4xl font-black font-mono leading-none">{count}</span>
            <span className="text-lg font-medium text-blue-300 mb-1">/ {total}</span>
        </div>
        <p className="text-[11px] text-blue-200">Đội tuyển đã chính thức giành vé</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-black/20 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
                className="bg-yellow-400 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
        
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
             {qualifiedTeams.slice(0, 8).map(team => (
                 <img 
                    key={team.id}
                    src={team.flag} 
                    className="w-6 h-4 rounded shadow-sm opacity-80 hover:opacity-100 transition-opacity object-cover" 
                    title={team.name} 
                 />
             ))}
             {qualifiedTeams.length > 8 && (
                 <div className="w-6 h-4 flex items-center justify-center text-[9px] font-bold bg-white/20 rounded text-white cursor-help" title="Và các đội khác">
                     +{count - 8}
                 </div>
             )}
        </div>
    </div>
  );
};

export default QualifiedCounter;
