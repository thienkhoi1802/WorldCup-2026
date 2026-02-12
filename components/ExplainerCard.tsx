import React from 'react';
import { Info } from 'lucide-react';

const ExplainerCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#333] text-white p-5 rounded-sm shadow-md mb-6 relative overflow-hidden group cursor-pointer">
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
      
      <div className="flex items-start gap-3 relative z-10">
        <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-base mb-1">Thể thức mới 48 đội?</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            <span className="text-yellow-400 font-bold">12 bảng đấu</span> (4 đội/bảng). 
            2 đội nhất nhì mỗi bảng và 8 đội hạng 3 tốt nhất sẽ vào vòng 1/16.
          </p>
          <span className="inline-block text-xs font-semibold text-white bg-white/20 px-3 py-1.5 rounded hover:bg-white/30 transition-colors">
            Xem chi tiết phân nhánh &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExplainerCard;