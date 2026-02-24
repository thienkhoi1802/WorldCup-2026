
import React from 'react';
import { Info, ArrowRight, HelpCircle } from 'lucide-react';

const ExplainerCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
      {/* Standard Widget Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-white">
        <h3 className="text-[#9f224e] font-black text-sm uppercase tracking-wider flex items-center gap-2">
           <HelpCircle className="w-4 h-4" /> Thông tin giải đấu
        </h3>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
                <div className="bg-[#9f224e]/10 p-2.5 rounded-full text-[#9f224e]">
                     <Info className="w-5 h-5" />
                </div>
            </div>
            <div>
                 <h4 className="font-bold text-gray-900 text-base uppercase leading-tight mb-2">
                    Thể thức mới 48 đội?
                 </h4>
                 <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    World Cup 2026 sẽ có <span className="font-bold text-[#9f224e]">12 bảng đấu</span> với 4 đội mỗi bảng. 
                    Suất đi tiếp dành cho 2 đội dẫn đầu và 8 đội hạng 3 xuất sắc nhất.
                 </p>
                 <a href="#" className="inline-flex items-center gap-1 text-xs font-black text-[#9f224e] hover:opacity-80 transition-opacity uppercase tracking-wider">
                    Chi tiết phân nhánh <ArrowRight className="w-3 h-3" />
                 </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainerCard;
