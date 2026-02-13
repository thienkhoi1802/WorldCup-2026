
import React from 'react';
import { QUICK_ACCESS_ITEMS } from '../constants';
import { AccessType } from '../types';

interface QuickAccessProps {
  onNavigate: (view: any) => void;
  currentView: string;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate, currentView }) => {
  const handleClick = (label: string) => {
    switch (label) {
      case AccessType.HOME: onNavigate('home'); break;
      case AccessType.SCHEDULE: onNavigate('schedule'); break;
      case AccessType.STANDINGS: onNavigate('standings'); break;
      case AccessType.TEAMS: onNavigate('teams'); break;
      case AccessType.NEWS: onNavigate('news'); break;
      case AccessType.VIDEO: onNavigate('video'); break;
      case AccessType.GALLERY: onNavigate('gallery'); break;
      case AccessType.STADIUMS: onNavigate('stadiums'); break;
      default: break;
    }
  };

  const isActive = (label: string) => {
      switch(label) {
          case AccessType.HOME: return currentView === 'home';
          case AccessType.SCHEDULE: return currentView === 'schedule';
          case AccessType.STANDINGS: return currentView === 'standings';
          case AccessType.TEAMS: return currentView === 'teams' || currentView === 'team_detail';
          case AccessType.NEWS: return currentView === 'news';
          case AccessType.VIDEO: return currentView === 'video';
          case AccessType.GALLERY: return currentView === 'gallery';
          case AccessType.STADIUMS: return currentView === 'stadiums';
          default: return false;
      }
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1100px] mx-auto px-4">
        <nav className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {QUICK_ACCESS_ITEMS.map((item, index) => {
              const active = isActive(item.label);
              return (
                  <button
                    key={index}
                    onClick={() => handleClick(item.label)}
                    className={`flex items-center gap-2 px-4 py-2 text-[14px] font-bold rounded-full transition-all whitespace-nowrap group ${
                      active 
                      ? 'bg-[#9f224e] text-white' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>{item.icon}</span>
                    {item.label}
                  </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
             <div className="h-4 w-px bg-gray-200"></div>
             <span className="text-[12px] font-bold text-gray-400 uppercase tracking-tight">Dữ liệu trực tiếp</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default QuickAccess;
