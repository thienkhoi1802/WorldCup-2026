
import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

const ExplainerCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm mb-6 transition-all hover:shadow-md border-l-[6px] border-l-[#9f224e] p-7">
      <div className="flex items-start gap-5">
        <div className="bg-gray-100 p-3 rounded-full text-[#9f224e] shrink-0">
          <Info className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-gray-900 text-[18px] uppercase tracking-tight">
            Thể thức mới 48 đội?
          </h3>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            World Cup 2026 sẽ có <span className="text-[#9f224e] font-bold">12 bảng đấu</span> với 4 đội mỗi bảng. 
            Suất đi tiếp dành cho 2 đội dẫn đầu và 8 đội hạng 3 xuất sắc nhất.
          </p>
          <button className="flex items-center gap-2 text-[13px] font-black text-[#9f224e] hover:opacity-80 transition-opacity uppercase tracking-wider mt-2">
            Chi tiết phân nhánh <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplainerCard;
