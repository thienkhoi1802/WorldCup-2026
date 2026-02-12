import React from 'react';
import { HOST_STADIUMS } from '../constants';
import { MapPin } from 'lucide-react';

const StadiumSpotlight: React.FC = () => {
  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#9f224e] font-bold text-lg uppercase font-serif tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Khám phá 16 Sân Vận Động
        </h2>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-black">Xem bản đồ &rarr;</a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HOST_STADIUMS.map((stadium) => (
            <div key={stadium.id} className="group cursor-pointer relative rounded-lg overflow-hidden h-[180px] shadow-sm">
                <img src={stadium.image} alt={stadium.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-3 w-full">
                    <h3 className="text-white font-bold text-sm leading-tight mb-0.5">{stadium.name}</h3>
                    <p className="text-gray-300 text-[11px] flex items-center justify-between">
                        <span>{stadium.city}</span>
                        <span className="font-mono bg-white/20 px-1 rounded">{stadium.capacity}</span>
                    </p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumSpotlight;