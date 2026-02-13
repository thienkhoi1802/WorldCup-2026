
import React, { useState } from 'react';
import { NewsItem } from '../types';
import { MessageSquare, ArrowRight, Clock } from 'lucide-react';

interface NewsFeedProps {
    newsItems: NewsItem[];
    title?: string;
    hasPagination?: boolean;
    itemsPerPage?: number;
    showViewMore?: boolean;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ 
    newsItems, 
    title, 
    hasPagination = false, 
    itemsPerPage = 10,
    showViewMore = false
}) => {
  const [page, setPage] = useState(1);
  
  // Calculate display items
  const displayItems = hasPagination 
    ? newsItems.slice(0, page * itemsPerPage) 
    : newsItems;

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'Phân tích': return 'text-blue-700 bg-blue-50 border-blue-100';
          case 'Chuyển nhượng': return 'text-green-700 bg-green-50 border-green-100';
          case 'Bên lề': return 'text-purple-700 bg-purple-50 border-purple-100';
          default: return 'text-gray-600 bg-gray-100 border-gray-200';
      }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
       {/* Section Header */}
       {title && (
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-[#9f224e] font-black text-xl uppercase font-serif tracking-tight pl-2 border-l-4 border-[#9f224e] rounded-sm">
                    {title}
                </h2>
                {showViewMore && (
                     <a href="#" className="text-xs font-bold text-gray-500 hover:text-[#9f224e] flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full transition-colors">
                        Xem tất cả <ArrowRight className="w-3 h-3" />
                     </a>
                )}
            </div>
       )}

      <div className="flex flex-col gap-6">
        {/* === LISTING SECTION: Timeline Style === */}
        <div className="flex flex-col gap-0 divide-y divide-gray-50">
          {displayItems.map((news) => (
            <article key={news.id} className="group cursor-pointer flex flex-row gap-5 items-start py-6 first:pt-0 last:pb-0">
              <div className="w-[30%] shrink-0 overflow-hidden rounded-xl relative aspect-[4/3] shadow-sm">
                 <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
              </div>
              
              <div className="flex flex-col flex-1 min-h-[100px]">
                <div>
                    <h3 className="text-[18px] font-bold text-gray-900 leading-snug mb-2 font-serif group-hover:text-[#9f224e] transition-colors">
                        {news.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3 hidden sm:block">
                        {news.excerpt}
                    </p>
                </div>
                <div className="mt-auto flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${getCategoryColor(news.category)}`}>{news.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {news.time}</span>
                    <span className="flex items-center gap-1 hover:text-gray-600 ml-auto bg-gray-50 px-2 py-1 rounded-full"><MessageSquare className="w-3 h-3" /> {Math.floor(Math.random() * 50)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {hasPagination && (page * itemsPerPage < newsItems.length) && (
          <div className="mt-4 pt-4 border-t border-gray-50 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#9f224e] hover:text-[#9f224e] text-gray-600 text-sm font-bold uppercase tracking-wide rounded-full transition-all shadow-sm group hover:shadow-md"
            >
              Xem thêm tin khác
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
