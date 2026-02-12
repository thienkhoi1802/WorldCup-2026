
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
      case AccessType.HOME:
        onNavigate('home');
        break;
      case AccessType.SCHEDULE:
        onNavigate('schedule');
        break;
      case AccessType.STANDINGS:
        onNavigate('standings');
        break;
      case AccessType.TEAMS:
        onNavigate('teams');
        break;
      case AccessType.NEWS:
        onNavigate('news');
        break;
      case AccessType.VIDEO:
        onNavigate('video');
        break;
      case AccessType.GALLERY:
        onNavigate('gallery');
        break;
      case AccessType.STADIUMS:
        onNavigate('stadiums');
        break;
      default:
        break;
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
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-[1100px] mx-auto px-4">
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          {QUICK_ACCESS_ITEMS.map((item, index) => {
            const active = isActive(item.label);
            return (
                <button
                key={index}
                onClick={() => handleClick(item.label)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap group ${active ? 'bg-[#9f224e] text-white hover:bg-[#851b40]' : 'text-gray-700 hover:text-[#9f224e] hover:bg-gray-50'}`}
                >
                <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-[#9f224e]'} transition-colors`}>{item.icon}</span>
                {item.label}
                </button>
            );
          })}
          <div className="h-4 w-px bg-gray-300 mx-2 hidden sm:block"></div>
          <span className="text-xs text-gray-500 hidden sm:block">Dữ liệu trực tiếp</span>
        </nav>
      </div>
    </div>
  );
};

export default QuickAccess;
