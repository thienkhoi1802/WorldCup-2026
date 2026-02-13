
import React, { useState, useEffect, useMemo } from 'react';
import { UPCOMING_MATCHES } from '../constants';
import { Match } from '../types';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';

interface MatchScheduleBoxProps {
    onMatchClick?: (match: Match) => void;
    filterGroup?: string;
}

const MatchScheduleBox: React.FC<MatchScheduleBoxProps> = ({ onMatchClick, filterGroup }) => {
  // Lọc danh sách trận đấu nếu có filterGroup
  const displayMatches = useMemo(() => {
      if (filterGroup) {
          // Lọc các trận có round chứa "Bảng X"
          return UPCOMING_MATCHES.filter(m => m.round === `Bảng ${filterGroup}`);
      }
      return UPCOMING_MATCHES;
  }, [filterGroup]);

  // Lấy danh sách ngày thi đấu từ các trận đã lọc (tối đa 3 ngày để làm Tabs)
  const availableDates = useMemo(() => {
      const dates = Array.from(new Set(displayMatches.map(m => m.date)));
      return dates.slice(0, 3);
  }, [displayMatches]);

  const [activeTab, setActiveTab] = useState<string>('');

  // Tự động chọn tab đầu tiên khi danh sách ngày thay đổi
  useEffect(() => {
      if (availableDates.length > 0) {
          if (!activeTab || !availableDates.includes(activeTab)) {
              setActiveTab(availableDates[0]);
          }
      }
  }, [availableDates, activeTab]);

  const matches = displayMatches.filter(m => m.date === activeTab);
  const title = filterGroup ? `Lịch đấu Bảng ${filterGroup}` : 'Lịch thi đấu';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[400px]">
      <div className="bg-[#9f224e] px-5 py-4 flex items-center justify-between shrink-0">
        <h3 className="text-white font-bold text-sm uppercase font-serif tracking-wide flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {title}
        </h3>
        <a href="#" className="text-xs text-white/90 hover:text-white font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors flex items-center gap-1">
            Chi tiết <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* TABS NGÀY */}
      {availableDates.length > 0 ? (
          <div className="flex border-b border-gray-100 bg-gray-50/50 shrink-0 p-2 gap-2 overflow-x-auto no-scrollbar">
             {availableDates.map(date => (
                 <button
                    key={date}
                    onClick={() => setActiveTab(date)}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === date 
                        ? 'bg-white text-[#9f224e] shadow-sm border border-gray-200' 
                        : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                    }`}
                 >
                     {/* Cắt bớt phần thứ để hiển thị gọn hơn nếu cần, ở đây giữ nguyên hoặc lấy phần ngày */}
                     {date.split(',')[1] || date}
                 </button>
             ))}
          </div>
      ) : (
          <div className="p-4 text-center text-xs text-gray-400 italic bg-gray-50">
              Chưa có lịch thi đấu
          </div>
      )}

      {/* DANH SÁCH TRẬN ĐẤU */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50/30 custom-scrollbar">
          {matches.length > 0 ? (
              matches.map(match => (
                <div 
                    key={match.id} 
                    onClick={() => onMatchClick && onMatchClick(match)}
                    className="bg-white p-3 rounded-xl border border-gray-200 hover:border-[#9f224e] shadow-sm cursor-pointer transition-all group relative overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded-full">{match.round}</span>
                         <span className="text-[10px] font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-[#9f224e] group-hover:text-white transition-colors">{match.time}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-xs font-bold text-gray-900 truncate order-2">{match.homeTeam}</span>
                            <img src={match.homeFlag} className="w-6 h-4 object-cover rounded-[2px] shadow-sm order-1" alt={match.homeTeam} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-300">VS</span>
                        <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                            <span className="text-xs font-bold text-gray-900 truncate">{match.awayTeam}</span>
                            <img src={match.awayFlag} className="w-6 h-4 object-cover rounded-[2px] shadow-sm" alt={match.awayTeam} />
                        </div>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-1 text-[10px] text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{match.stadium}</span>
                    </div>
                </div>
              ))
          ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-xs">Không có trận đấu</span>
              </div>
          )}
      </div>
    </div>
  );
};

export default MatchScheduleBox;
