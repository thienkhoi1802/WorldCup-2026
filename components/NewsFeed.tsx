import React, { useState } from 'react';
import { NEWS_DATA } from '../constants';
import { MessageSquare, ArrowDown, Clock } from 'lucide-react';

const NewsFeed: React.FC = () => {
  // Since we moved the "Hero" news to HomeHero component, we start listing from index 1
  // Or utilize the main news in the list but smaller. 
  // Let's list everything from index 1 to avoid duplication with HomeHero
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Skip the first item as it is shown in HomeHero
  const listNews = NEWS_DATA.slice(1, visibleCount + 1);
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, NEWS_DATA.length - 1));
  };

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'Phân tích': return 'bg-blue-100 text-blue-700';
          case 'Chuyển nhượng': return 'bg-green-100 text-green-700';
          case 'Bên lề': return 'bg-purple-100 text-purple-700';
          default: return 'bg-gray-100 text-gray-600';
      }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
       {/* Section Header */}
       <div className="flex items-center justify-between border-b-2 border-[#9f224e] pb-3 mb-6">
          <h2 className="text-[#9f224e] font-black text-xl uppercase font-serif tracking-tight">
            Dòng sự kiện
          </h2>
          <div className="hidden sm:flex gap-2 text-xs font-bold text-gray-500">
             <span className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors text-black bg-gray-100">Mới nhất</span>
             <span className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors">Đọc nhiều</span>
          </div>
       </div>

      <div className="flex flex-col gap-6">
        {/* === LISTING SECTION: Timeline Style === */}
        <div className="flex flex-col gap-0 divide-y divide-gray-100">
          {listNews.map((news) => (
            <article key={news.id} className="group cursor-pointer flex flex-row gap-5 items-start py-5 first:pt-0 hover:bg-gray-50/50 -mx-2 px-2 rounded-lg transition-colors">
              <div className="w-[140px] sm:w-[180px] shrink-0 overflow-hidden rounded-lg relative aspect-[4/3]">
                 <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
              </div>
              
              <div className="flex flex-col justify-between py-1 w-full min-h-[100px]">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${getCategoryColor(news.category)}`}>
                            {news.category}
                        </span>
                    </div>
                    <h3 className="text-[16px] sm:text-[18px] font-bold text-gray-900 leading-snug mb-2 font-serif group-hover:text-[#9f224e] transition-colors">
                        {news.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 hidden sm:block">
                        {news.excerpt}
                    </p>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {news.time}</span>
                    <span className="flex items-center gap-1 hover:text-gray-600"><MessageSquare className="w-3 h-3" /> {Math.floor(Math.random() * 50)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < NEWS_DATA.length - 1 && (
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 hover:border-[#9f224e] hover:text-[#9f224e] text-gray-600 text-sm font-bold uppercase tracking-wide rounded-full transition-all shadow-sm hover:shadow-md group"
            >
              Xem thêm tin khác
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;