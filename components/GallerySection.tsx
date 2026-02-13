
import React from 'react';
import { Image as ImageIcon, Camera } from 'lucide-react';

const GallerySection: React.FC = () => {
  const images = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      src: `https://placehold.co/600x400/e2e8f0/94a3b8?text=PHOTO-${i+1}`,
      caption: `Khoảnh khắc ấn tượng từ SVĐ ${['Azteca', 'MetLife', 'SoFi', 'AT&T', 'BMO Field'][i]} trong ngày khai mạc`
  }));

  return (
    <div className="bg-[#111] py-8 mb-8">
        <div className="max-w-[1100px] mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-2xl font-serif uppercase flex items-center gap-3">
                    <span className="w-10 h-10 bg-[#9f224e] rounded-full flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                    </span>
                    Hình ảnh đáng nhớ
                </h2>
                <a href="#" className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-wide transition-colors">Xem thư viện &rarr;</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:h-[450px]">
                {/* Main Large Image */}
                <div className="md:col-span-6 relative group cursor-pointer overflow-hidden h-[300px] md:h-full">
                    <img src={images[0].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <p className="text-white font-bold text-lg leading-snug">{images[0].caption}</p>
                    </div>
                </div>

                {/* Grid of smaller images */}
                <div className="md:col-span-6 grid grid-cols-2 gap-1 h-full">
                    {images.slice(1).map((img, idx) => (
                        <div key={img.id} className="relative group cursor-pointer overflow-hidden h-[200px] md:h-auto">
                            <img src={img.src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform">
                                <p className="text-white text-xs truncate">{img.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default GallerySection;
