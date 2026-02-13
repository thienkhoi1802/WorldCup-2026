
import React, { useState } from 'react';
import { POLL_OPTIONS } from '../constants';

const PollWidget: React.FC = () => {
  const [voted, setVoted] = useState<string | null>(null);
  
  const totalVotes = POLL_OPTIONS.reduce((acc, curr) => acc + curr.votes, 0) + (voted ? 1 : 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-[#9f224e] font-black text-sm uppercase tracking-wider">Góc khán đài</h3>
      </div>
      <div className="p-6">
        <p className="text-[15px] font-bold text-gray-900 mb-6 leading-snug">
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
                  <div className="relative h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                     <div 
                        className={`absolute top-0 left-0 h-full ${isSelected ? 'bg-[#9f224e]/10' : 'bg-gray-100'} transition-all duration-700 ease-out`} 
                        style={{ width: `${percentage}%` }}
                     ></div>
                     <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                        <span className={`text-[13px] font-bold ${isSelected ? 'text-[#9f224e]' : 'text-gray-700'}`}>{option.label}</span>
                        <div className="flex items-center gap-2">
                           <span className={`text-[13px] font-black ${isSelected ? 'text-[#9f224e]' : 'text-gray-500'}`}>{percentage}%</span>
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#9f224e]' : 'border-gray-200'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#9f224e]"></div>}
                           </div>
                        </div>
                     </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setVoted(option.id)}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#9f224e]/30 transition-all text-[13px] font-medium text-gray-700 flex items-center justify-between group"
                  >
                    <span>{option.label}</span>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-[#9f224e] transition-colors"></div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-right">
           <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wide">{totalVotes.toLocaleString()} lượt bình chọn</span>
        </div>
      </div>
    </div>
  );
};

export default PollWidget;
