import React, { useState } from 'react';
import { Team, Match, NewsItem } from '../types';
import { UPCOMING_MATCHES, NEWS_DATA } from '../constants';
import { ChevronLeft, Calendar, User, Shield, Zap, TrendingUp, Users } from 'lucide-react';

interface TeamDetailPageProps {
  team: Team;
  onBack: () => void;
  onMatchClick: (match: Match) => void;
}

// Mock Squad Generator
const getMockSquad = (teamId: string) => {
  return {
    gk: [
        { no: 1, name: "Thủ môn chính", age: 28 },
        { no: 23, name: "Thủ môn dự bị", age: 22 }
    ],
    df: [
        { no: 3, name: "Trung vệ thòng", age: 29 },
        { no: 4, name: "Trung vệ dập", age: 24 },
        { no: 2, name: "Hậu vệ phải", age: 26 },
        { no: 5, name: "Hậu vệ trái", age: 21 },
        { no: 15, name: "Dự bị chiến lược", age: 20 }
    ],
    mf: [
        { no: 8, name: "Nhạc trưởng", age: 31 },
        { no: 6, name: "Tiền vệ phòng ngự", age: 27 },
        { no: 14, name: "Tiền vệ con thoi", age: 25 },
        { no: 19, name: "Tiền vệ cánh", age: 23 }
    ],
    fw: [
        { no: 9, name: "Trung phong cắm", age: 28 },
        { no: 10, name: "Hộ công", age: 26 },
        { no: 11, name: "Tiền đạo cánh", age: 22 }
    ]
  };
};

const TeamDetailPage: React.FC<TeamDetailPageProps> = ({ team, onBack, onMatchClick }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'squad' | 'fixtures' | 'news'>('overview');

  // Filter Data
  const teamMatches = UPCOMING_MATCHES.filter(m => m.homeTeam === team.name || m.awayTeam === team.name);
  const teamNews = NEWS_DATA.filter(n => n.title.toLowerCase().includes(team.name.toLowerCase()));
  const squad = getMockSquad(team.id);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[800px] animate-in slide-in-from-right-4 duration-300">
      
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-r from-[#1a1a1a] to-[#333] h-48 md:h-64 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#9f224e] via-transparent to-transparent"></div>
        <img src={team.flag} className="absolute -right-20 -bottom-20 w-80 h-80 object-cover opacity-20 blur-sm rounded-full" />

        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
            <button 
                onClick={onBack}
                className="self-start flex items-center gap-1 text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all text-sm font-medium"
            >
                <ChevronLeft className="w-4 h-4" /> Quay lại
            </button>

            <div className="flex items-end gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white p-1 rounded-lg shadow-xl shrink-0">
                    <img src={team.flag} alt={team.name} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex flex-col mb-2">
                    <h1 className="text-3xl md:text-5xl font-black text-white font-serif tracking-tight leading-none mb-2">{team.name}</h1>
                    <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                        <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-[#9f224e]" /> FIFA Rank: <strong>#{Math.floor(Math.random() * 100) + 1}</strong></span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> HLV: <strong>Head Coach Name</strong></span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-20 overflow-x-auto no-scrollbar">
        {[
            { id: 'overview', label: 'Tổng quan', icon: <Shield className="w-4 h-4"/> },
            { id: 'squad', label: 'Đội hình', icon: <Users className="w-4 h-4"/> },
            { id: 'fixtures', label: 'Lịch thi đấu', icon: <Calendar className="w-4 h-4"/> },
            { id: 'news', label: 'Tin tức', icon: <Zap className="w-4 h-4"/> }
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-[#9f224e] border-b-2 border-[#9f224e] bg-gray-50' : 'text-gray-500 hover:text-gray-800'}`}
            >
                {tab.icon} {tab.label}
            </button>
        ))}
      </div>

      {/* 3. CONTENT AREA */}
      <div className="p-6 bg-gray-50/30 min-h-[400px]">
        
        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Next Match Card */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Trận đấu tiếp theo
                    </h3>
                    {teamMatches.length > 0 ? (
                        <div onClick={() => onMatchClick(teamMatches[0])} className="cursor-pointer group">
                             <div className="flex justify-between items-center mb-4">
                                <div className="text-center w-1/3">
                                    <img src={teamMatches[0].homeFlag} className="w-12 h-8 object-cover mx-auto mb-2 shadow-sm rounded-sm" />
                                    <span className="block font-bold text-gray-900 text-sm">{teamMatches[0].homeTeam}</span>
                                </div>
                                <div className="text-center w-1/3 flex flex-col items-center">
                                    <span className="text-2xl font-black text-gray-300 font-serif mb-1">VS</span>
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">{teamMatches[0].time}</span>
                                    <span className="text-[10px] text-gray-500 mt-1">{teamMatches[0].date}</span>
                                </div>
                                <div className="text-center w-1/3">
                                    <img src={teamMatches[0].awayFlag} className="w-12 h-8 object-cover mx-auto mb-2 shadow-sm rounded-sm" />
                                    <span className="block font-bold text-gray-900 text-sm">{teamMatches[0].awayTeam}</span>
                                </div>
                             </div>
                             <div className="text-center text-xs text-[#9f224e] font-medium group-hover:underline">Xem chi tiết &rarr;</div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm italic">Chưa có lịch thi đấu mới.</p>
                    )}
                </div>

                {/* Form Guide */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                     <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Phong độ gần đây
                    </h3>
                    <div className="flex gap-2">
                        {['W', 'D', 'W', 'L', 'W'].map((res, i) => (
                            <div key={i} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-white text-sm ${res === 'W' ? 'bg-green-500' : res === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>
                                {res}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-600">Thắng 3, Hòa 1, Thua 1 trong 5 trận gần nhất.</p>
                </div>
            </div>
        )}

        {/* --- SQUAD TAB --- */}
        {activeTab === 'squad' && (
            <div className="space-y-6">
                {[
                    { title: 'Thủ môn', data: squad.gk },
                    { title: 'Hậu vệ', data: squad.df },
                    { title: 'Tiền vệ', data: squad.mf },
                    { title: 'Tiền đạo', data: squad.fw },
                ].map((section) => (
                    <div key={section.title} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 font-bold text-sm text-gray-700 uppercase">
                            {section.title}
                        </div>
                        <div className="divide-y divide-gray-50">
                            {section.data.map((player) => (
                                <div key={player.no} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <span className="w-6 text-center font-black text-gray-300 text-lg">{player.no}</span>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{player.name}</span>
                                            <span className="text-xs text-gray-500">Tuổi: {player.age}</span>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* --- FIXTURES TAB --- */}
        {activeTab === 'fixtures' && (
             <div className="space-y-3">
                {teamMatches.length > 0 ? teamMatches.map(match => (
                    <div 
                        key={match.id}
                        onClick={() => onMatchClick(match)}
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{match.date}</span>
                            <span className="text-sm text-gray-500">{match.round}</span>
                        </div>
                        <div className="flex items-center gap-4 font-bold text-gray-900">
                             <span>{match.homeTeam}</span>
                             <span className="text-gray-400 text-xs">vs</span>
                             <span>{match.awayTeam}</span>
                        </div>
                         <span className="bg-black text-white px-2 py-1 rounded text-xs font-bold">{match.time}</span>
                    </div>
                )) : (
                    <div className="text-center py-10 text-gray-500">Không tìm thấy trận đấu nào sắp tới.</div>
                )}
             </div>
        )}

        {/* --- NEWS TAB --- */}
        {activeTab === 'news' && (
             <div className="grid grid-cols-1 gap-4">
                {teamNews.length > 0 ? teamNews.map(news => (
                    <div key={news.id} className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition-shadow group">
                         <div className="w-32 h-20 shrink-0 overflow-hidden rounded">
                            <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-[#9f224e] transition-colors leading-tight mb-1">{news.title}</h4>
                            <span className="text-xs text-gray-500">{news.time}</span>
                         </div>
                    </div>
                )) : (
                     <div className="text-center py-10 text-gray-500">Chưa có tin tức nào liên quan.</div>
                )}
             </div>
        )}

      </div>
    </div>
  );
};

export default TeamDetailPage;