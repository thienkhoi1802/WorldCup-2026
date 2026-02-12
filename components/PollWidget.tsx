import React, { useState } from 'react';
import { POLL_OPTIONS } from '../constants';

const PollWidget: React.FC = () => {
  const [voted, setVoted] = useState<string | null>(null);
  
  // Calculate total votes (mock calculation)
  const totalVotes = POLL_OPTIONS.reduce((acc, curr) => acc + curr.votes, 0) + (voted ? 1 : 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-[#9f224e] font-bold text-sm uppercase font-serif">Góc Khán đài</h3>
      </div>
      <div className="p-4">
        <p className="text-sm font-bold text-gray-900 mb-4 leading-tight">
          Cơ hội nào cho Đội tuyển Việt Nam lọt vào Vòng loại 3 World Cup 2026?
        </p>
        
        <div className="flex flex-col gap-3">
          {POLL_OPTIONS.map((option) => {
            const isSelected = voted === option.id;
            const currentVotes = option.votes + (isSelected ? 1 : 0);
            const percentage = Math.round((currentVotes / totalVotes) * 100);

            return (
              <div key={option.id} className="relative">
                {voted ? (
                  // Result View
                  <div className="relative h-9 bg-gray-100 rounded-md overflow-hidden">
                     <div 
                        className={`absolute top-0 left-0 h-full ${isSelected ? 'bg-[#9f224e]' : 'bg-gray-300'} transition-all duration-1000 ease-out`} 
                        style={{ width: `${percentage}%` }}
                     ></div>
                     <div className="absolute inset-0 flex items-center justify-between px-3 z-10">
                        <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>{option.label}</span>
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{percentage}%</span>
                     </div>
                  </div>
                ) : (
                  // Voting View
                  <button 
                    onClick={() => setVoted(option.id)}
                    className="w-full text-left px-3 py-2.5 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm text-gray-700 flex items-center justify-between group"
                  >
                    <span>{option.label}</span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-[#9f224e]"></span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-3 text-right">
           <span className="text-[10px] text-gray-400 font-medium">{totalVotes.toLocaleString()} lượt bình chọn</span>
        </div>
      </div>
    </div>
  );
};

export default PollWidget;