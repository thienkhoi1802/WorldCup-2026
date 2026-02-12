import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingBar: React.FC = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1 text-[#9f224e] font-bold uppercase whitespace-nowrap">
            <TrendingUp className="w-3 h-3" />
            Xu hướng:
        </div>
        <div className="flex gap-4 overflow-hidden whitespace-nowrap mask-gradient">
            <a href="#" className="text-gray-600 hover:text-black font-medium">#VeKetChungKet</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-600 hover:text-black font-medium">#Messi2026</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-600 hover:text-black font-medium">#SanVanDongMoi</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-600 hover:text-black font-medium">#AoDauTuyenDuc</a>
             <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-600 hover:text-black font-medium">#FIFA_Ranking</a>
        </div>
      </div>
    </div>
  );
};

export default TrendingBar;