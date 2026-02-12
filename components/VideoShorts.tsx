import React from 'react';
import { VIDEO_HIGHLIGHTS } from '../constants';
import { Play, Film } from 'lucide-react';

const VideoShorts: React.FC = () => {
  return (
    <div className="bg-[#111] rounded-xl overflow-hidden shadow-lg border border-gray-800 relative group">
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#9f224e] opacity-20 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="p-5 pb-2 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
            <div className="bg-[#9f224e] p-1.5 rounded text-white">
                <Film className="w-4 h-4" />
            </div>
            <h2 className="text-white font-bold text-xl uppercase font-serif tracking-tight">
            Khoảnh khắc đáng nhớ
            </h2>
        </div>
        <a href="#" className="text-gray-400 text-xs hover:text-white transition-colors uppercase font-bold tracking-wider">Xem tất cả video &rarr;</a>
      </div>
      
      {/* Container */}
      <div className="overflow-x-auto no-scrollbar px-5 pb-6 pt-2">
        <div className="flex gap-4">
          {VIDEO_HIGHLIGHTS.map((video, index) => (
            <div key={video.id} className="relative flex-none w-[200px] h-[320px] group/item cursor-pointer rounded-lg overflow-hidden bg-gray-900 shadow-md border border-gray-800 hover:border-gray-600 transition-all hover:-translate-y-1">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 transition-opacity duration-500 scale-105 group-hover/item:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Duration Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-white font-bold border border-white/10">
                {video.duration}
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300 scale-50 group-hover/item:scale-100">
                 <div className="bg-[#9f224e]/90 backdrop-blur-sm p-4 rounded-full shadow-xl shadow-black/50">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                 </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="inline-block px-2 py-0.5 bg-white/10 text-[10px] text-gray-200 rounded mb-2 backdrop-blur-sm border border-white/5">Highlights</span>
                <h3 className="text-white text-[15px] font-bold leading-snug line-clamp-3 font-serif drop-shadow-md group-hover/item:text-[#ff9bb8] transition-colors">
                  {video.title}
                </h3>
              </div>
              
              {/* Number overlay for visual interest */}
              <div className="absolute -bottom-4 -right-2 text-6xl font-black text-white/5 z-0 pointer-events-none italic">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoShorts;