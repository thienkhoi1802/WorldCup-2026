
import React from 'react';
import { NewsItem } from '../types';
import { Clock } from 'lucide-react';

interface HomeHeroProps {
  newsItems: NewsItem[];
}

const HomeHero: React.FC<HomeHeroProps> = ({ newsItems }) => {
  // Ensure we have 3 items
  const mainNews = newsItems[0];
  const subNews1 = newsItems[1];
  const subNews2 = newsItems[2];

  if (!mainNews) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[500px] mb-8 font-serif">
      
      {/* 1. LEFT MAIN STORY (Col Span 8) */}
      <div className="md:col-span-8 relative group cursor-pointer overflow-hidden h-[400px] md:h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        {/* Image with zoom effect */}
        <img 
            src={mainNews.image} 
            alt={mainNews.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-10">
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3 drop-shadow-md">
                {mainNews.title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 hidden md:block opacity-90 font-sans leading-relaxed max-w-2xl">
                {mainNews.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-bold font-sans tracking-wider">
                <span className="bg-[#9f224e] text-white px-3 py-1.5 rounded-full uppercase shadow-sm">
                    {mainNews.category || 'Tiêu điểm'}
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                    <Clock className="w-3.5 h-3.5" /> {mainNews.time}
                </span>
            </div>
        </div>
      </div>

      {/* 2. RIGHT SUB STORIES (Col Span 4) */}
      <div className="md:col-span-4 flex flex-col gap-4 h-full">
         
         {/* Sub Story 1 */}
         {subNews1 && (
             <div className="flex-1 relative group cursor-pointer overflow-hidden h-[200px] md:h-auto rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                 <img 
                    src={subNews1.image} 
                    alt={subNews1.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                    <span className="inline-block bg-white text-[#9f224e] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full mb-2 font-sans tracking-wide shadow-sm">
                        {subNews1.category || 'Tin nóng'}
                    </span>
                    <h3 className="text-white font-bold text-lg md:text-xl leading-snug drop-shadow-sm group-hover:text-gray-200 transition-colors line-clamp-3">
                        {subNews1.title}
                    </h3>
                 </div>
             </div>
         )}
         
         {/* Sub Story 2 */}
         {subNews2 && (
             <div className="flex-1 relative group cursor-pointer overflow-hidden h-[200px] md:h-auto rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                 <img 
                    src={subNews2.image} 
                    alt={subNews2.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                    <span className="inline-block bg-white text-[#9f224e] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full mb-2 font-sans tracking-wide shadow-sm">
                        {subNews2.category || 'Hậu trường'}
                    </span>
                    <h3 className="text-white font-bold text-lg md:text-xl leading-snug drop-shadow-sm group-hover:text-gray-200 transition-colors line-clamp-3">
                        {subNews2.title}
                    </h3>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default HomeHero;
