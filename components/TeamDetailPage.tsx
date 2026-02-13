
import React, { useState } from 'react';
import { Team, Match, NewsItem } from '../types';
import { UPCOMING_MATCHES, NEWS_DATA } from '../constants';
import { ChevronLeft, Calendar, User, Shield, Zap, TrendingUp, Users, Clock, ArrowRight, FileText } from 'lucide-react';
import MatchScheduleBox from './MatchScheduleBox';
import StandingsWidget from './StandingsWidget';
import PollWidget from './PollWidget';

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

  // Generate 20 specific mock news items for this team
  const EXTENDED_TEAM_NEWS = Array.from({ length: 20 }).map((_, i) => ({
      id: `team-extended-${i}`,
      title: i % 3 === 0 
        ? `Phỏng vấn độc quyền: HLV ${team.name} tiết lộ chiến thuật cho trận đấu tới` 
        : i % 3 === 1 
        ? `Ngôi sao ${team.name} gặp chấn thương nhẹ trong buổi tập chiều qua`
        : `Người hâm mộ ${team.name} xếp hàng dài mua vé xem World Cup`,
      image: `https://picsum.photos/300/200?random=${team.id.charCodeAt(0) + i}`,
      time: `${Math.floor(Math.random() * 48) + 1} giờ trước`,
      category: ['Tin nóng', 'Hậu trường', 'Chuyên môn', 'Chuyển nhượng'][i % 4]
  }));

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pb-12">
        <div className="max-w-[1140px] mx-auto px-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8">
                
                {/* --- LEFT COLUMN: MAIN CONTENT (760px) --- */}
                <div className="min-w-0 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                    
                    {/* 1. HERO HEADER */}
                    <div className="relative bg-gradient-to-r from-[#1a1a1a] to-[#333] h-48 sm:h-56 overflow-hidden">
                        {/* Abstract Background */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#9f224e] via-transparent to-transparent"></div>
                        <img src={team.flag} className="absolute -right-10 -bottom-10 w-64 h-64 object-cover opacity-10 blur-sm rounded-full pointer-events-none" />

                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                            <button 
                                onClick={onBack}
                                className="self-start flex items-center gap-1 text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all text-xs font-bold uppercase tracking-wide"
                            >
                                <ChevronLeft className="w-4 h-4" /> Quay lại
                            </button>

                            <div className="flex items-end gap-5">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-1 rounded-lg shadow-xl shrink-0">
                                    <img src={team.flag} alt={team.name} className="w-full h-full object-cover rounded-[2px]" />
                                </div>
                                <div className="flex flex-col mb-1">
                                    <h1 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight leading-none mb-2">{team.name}</h1>
                                    <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs font-medium">
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded"><TrendingUp className="w-3 h-3 text-[#9f224e]" /> Rank: <strong>#{team.ranking || '--'}</strong></span>
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded"><User className="w-3 h-3" /> HLV: <strong>Head Coach</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. NAVIGATION TABS */}
                    <div className="flex border-b border-gray-200 bg-white sticky top-0 z-20 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'overview', label: 'Tổng quan', icon: <Shield className="w-3.5 h-3.5"/> },
                            { id: 'squad', label: 'Đội hình', icon: <Users className="w-3.5 h-3.5"/> },
                            { id: 'fixtures', label: 'Lịch thi đấu', icon: <Calendar className="w-3.5 h-3.5"/> },
                            { id: 'news', label: 'Tin tức', icon: <Zap className="w-3.5 h-3.5"/> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-[#9f224e] border-b-2 border-[#9f224e] bg-gray-50' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* 3. CONTENT AREA */}
                    <div className="p-6 min-h-[400px]">
                        
                        {/* --- OVERVIEW TAB --- */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Next Match Card */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-[#9f224e]" /> Trận đấu tiếp theo
                                        </h3>
                                    </div>
                                    <div className="p-5">
                                        {teamMatches.length > 0 ? (
                                            <div onClick={() => onMatchClick(teamMatches[0])} className="cursor-pointer group">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="text-center w-1/3">
                                                        <img src={teamMatches[0].homeFlag} className="w-10 h-7 object-cover mx-auto mb-2 shadow-sm rounded-[2px]" />
                                                        <span className="block font-bold text-gray-900 text-sm">{teamMatches[0].homeTeam}</span>
                                                    </div>
                                                    <div className="text-center w-1/3 flex flex-col items-center">
                                                        <span className="text-xl font-black text-gray-300 font-serif mb-1">VS</span>
                                                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">{teamMatches[0].time}</span>
                                                        <span className="text-[10px] text-gray-500 mt-1">{teamMatches[0].date}</span>
                                                    </div>
                                                    <div className="text-center w-1/3">
                                                        <img src={teamMatches[0].awayFlag} className="w-10 h-7 object-cover mx-auto mb-2 shadow-sm rounded-[2px]" />
                                                        <span className="block font-bold text-gray-900 text-sm">{teamMatches[0].awayTeam}</span>
                                                    </div>
                                                </div>
                                                <div className="text-center text-xs text-[#9f224e] font-bold group-hover:underline uppercase tracking-wide">Xem chi tiết &rarr;</div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-sm italic text-center py-4">Chưa có lịch thi đấu mới.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Guide */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                     <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5 text-[#9f224e]" /> Phong độ gần đây
                                        </h3>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex gap-2 mb-3">
                                            {['W', 'D', 'W', 'L', 'W'].map((res, i) => (
                                                <div key={i} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-white text-xs ${res === 'W' ? 'bg-green-500' : res === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>
                                                    {res}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium">Thắng 3, Hòa 1, Thua 1 trong 5 trận gần nhất.</p>
                                    </div>
                                </div>

                                {/* EXTENDED NEWS SECTION (Modified to Single Column) */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-black uppercase text-gray-900 font-serif flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-[#9f224e]" /> 
                                            Tin tức về {team.name}
                                        </h3>
                                        <button 
                                            onClick={() => setActiveTab('news')}
                                            className="text-xs font-bold text-gray-500 hover:text-[#9f224e] flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            Xem tất cả <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {/* Single Column List Layout */}
                                    <div className="flex flex-col gap-5">
                                        {EXTENDED_TEAM_NEWS.map((news) => (
                                            <article 
                                                key={news.id} 
                                                className="flex gap-4 group cursor-pointer border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                                            >
                                                <div className="w-32 h-20 shrink-0 overflow-hidden rounded border border-gray-100 bg-gray-100">
                                                    <img 
                                                        src={news.image} 
                                                        alt="Thumbnail" 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-between py-0.5">
                                                    <h4 className="text-base font-bold text-gray-900 leading-tight group-hover:text-[#9f224e] transition-colors line-clamp-2">
                                                        {news.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded uppercase border border-gray-200">
                                                            {news.category}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {news.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-8 text-center">
                                        <button 
                                            onClick={() => setActiveTab('news')}
                                            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold text-sm rounded-full hover:border-[#9f224e] hover:text-[#9f224e] transition-colors shadow-sm"
                                        >
                                            Xem thêm tin tức khác
                                        </button>
                                    </div>
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
                                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-bold text-xs text-gray-700 uppercase">
                                            {section.title}
                                        </div>
                                        <div className="divide-y divide-gray-100">
                                            {section.data.map((player) => (
                                                <div key={player.no} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <span className="w-6 text-center font-black text-gray-300 text-base font-serif">{player.no}</span>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-900 text-sm">{player.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">{player.age} tuổi</span>
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
                                        className="bg-white p-3 rounded-lg border border-gray-200 hover:border-[#9f224e] hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-3 w-1/4">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold">{match.date}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase truncate">{match.round}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-3 font-bold text-gray-900 flex-1">
                                            <span className={`text-sm text-right flex-1 ${match.homeTeam === team.name ? 'text-black' : 'text-gray-500'}`}>{match.homeTeam}</span>
                                            <span className="text-gray-300 text-[10px]">VS</span>
                                            <span className={`text-sm text-left flex-1 ${match.awayTeam === team.name ? 'text-black' : 'text-gray-500'}`}>{match.awayTeam}</span>
                                        </div>
                                        <div className="w-1/4 text-right">
                                            <span className="bg-black text-white px-2 py-1 rounded text-[10px] font-bold group-hover:bg-[#9f224e] transition-colors">{match.time}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-10 text-gray-500 text-sm border-2 border-dashed border-gray-100 rounded-lg">Không tìm thấy trận đấu nào sắp tới.</div>
                                )}
                            </div>
                        )}

                        {/* --- NEWS TAB --- */}
                        {activeTab === 'news' && (
                            <div className="grid grid-cols-1 gap-4">
                                {teamNews.length > 0 ? teamNews.map(news => (
                                    <div key={news.id} className="flex gap-4 bg-white border-b border-gray-100 last:border-0 pb-4 last:pb-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="w-24 h-16 shrink-0 overflow-hidden rounded border border-gray-100">
                                            <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div className="flex flex-col justify-between py-0.5">
                                            <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#9f224e] transition-colors leading-tight line-clamp-2">{news.title}</h4>
                                            <span className="text-[10px] text-gray-400 font-medium">{news.time}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-10 text-gray-500 text-sm">Chưa có tin tức nào liên quan.</div>
                                )}
                            </div>
                        )}

                    </div>
                </div>

                {/* --- RIGHT COLUMN: SIDEBAR (300px) --- */}
                <aside className="w-full flex flex-col gap-6">
                    <MatchScheduleBox />
                    <StandingsWidget />
                    <PollWidget />
                </aside>

            </div>
        </div>
    </div>
  );
};

export default TeamDetailPage;
