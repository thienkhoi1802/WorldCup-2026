
import React, { useState } from 'react';
import Header from './components/Header';
import QuickAccess from './components/QuickAccess';
import NewsFeed from './components/NewsFeed';
import HomeHero from './components/HomeHero'; // New Component
import StoryRail from './components/StoryRail'; // New Component
import MatchScheduleBox from './components/MatchScheduleBox';
import ExplainerCard from './components/ExplainerCard';
import VideoShorts from './components/VideoShorts';
import PopularTeams from './components/PopularTeams';
import TrendingBar from './components/TrendingBar';
import PollWidget from './components/PollWidget';
import StandingsWidget from './components/StandingsWidget';
import QualifiedCounter from './components/QualifiedCounter';
import StadiumSpotlight from './components/StadiumSpotlight';
import MyTeamWidget from './components/MyTeamWidget';
import MatchDetailModal from './components/MatchDetailModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import TriviaWidget from './components/TriviaWidget';
import SchedulePage from './components/SchedulePage';
import TeamsPage from './components/TeamsPage';
import StandingsPage from './components/StandingsPage';
import TeamDetailPage from './components/TeamDetailPage';
import { NEWS_DATA, UPCOMING_MATCHES, HOST_STADIUMS } from './constants';
import { Match, Team } from './types';

type ViewType = 'home' | 'schedule' | 'standings' | 'teams' | 'team_detail' | 'news' | 'video' | 'gallery' | 'stadiums';

const App: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const handleOpenMatch = (match: Match) => {
    setSelectedMatch(match);
  };

  const handleCloseMatch = () => {
    setSelectedMatch(null);
  };

  const handleOpenTeam = (team: Team) => {
    setSelectedTeam(team);
    setCurrentView('team_detail');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'schedule':
        return <SchedulePage onMatchClick={handleOpenMatch} />;
      case 'standings':
        return <StandingsPage onTeamClick={handleOpenTeam} />;
      case 'teams':
        return <TeamsPage onTeamClick={handleOpenTeam} />;
      case 'team_detail':
        return selectedTeam ? (
          <TeamDetailPage 
            team={selectedTeam} 
            onBack={() => setCurrentView('teams')}
            onMatchClick={handleOpenMatch}
          />
        ) : <TeamsPage onTeamClick={handleOpenTeam} />;
      case 'news':
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 font-serif border-l-4 border-[#9f224e] pl-3">Tin tức mới nhất</h2>
                <NewsFeed />
            </div>
        );
      case 'video':
         return (
             <div className="space-y-6">
                 <h2 className="text-2xl font-bold mb-4 font-serif border-l-4 border-[#9f224e] pl-3">Video Highlights</h2>
                 <VideoShorts />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {/* Mock More Videos */}
                    {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white p-2 rounded shadow-sm flex gap-3 cursor-pointer hover:bg-gray-50">
                             <div className="w-32 h-20 bg-gray-200 rounded relative shrink-0">
                                <img src={`https://picsum.photos/200/120?random=${i+100}`} className="w-full h-full object-cover rounded" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                             </div>
                             <div>
                                 <h4 className="font-bold text-sm line-clamp-2 mb-1">Tổng hợp bàn thắng đẹp vòng loại World Cup khu vực Nam Mỹ</h4>
                                 <span className="text-xs text-gray-500">2 giờ trước</span>
                             </div>
                        </div>
                    ))}
                 </div>
             </div>
         );
      case 'gallery':
          return (
              <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif border-l-4 border-[#9f224e] pl-3">Thư viện ảnh</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Array.from({length: 9}).map((_, i) => (
                          <div key={i} className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                              <img src={`https://picsum.photos/400/400?random=${i+200}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                  <p className="text-white text-sm font-bold truncate">Khoảnh khắc ấn tượng #{i+1}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          );
      case 'stadiums':
          return (
              <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif border-l-4 border-[#9f224e] pl-3">Sân vận động World Cup 2026</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {HOST_STADIUMS.map((stadium) => (
                        <div key={stadium.id} className="group cursor-pointer relative rounded-xl overflow-hidden h-[250px] shadow-sm">
                            <img src={stadium.image} alt={stadium.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 p-5 w-full">
                                <h3 className="text-white font-bold text-xl leading-tight mb-1">{stadium.name}</h3>
                                <p className="text-gray-300 text-sm flex items-center justify-between">
                                    <span>{stadium.city}</span>
                                    <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">{stadium.capacity} chỗ ngồi</span>
                                </p>
                            </div>
                        </div>
                    ))}
                  </div>
              </div>
          );
      case 'home':
      default:
        return (
          <>
            {/* 1. HERO SECTION (Dynamic: Featured News + Match Center) */}
            <HomeHero 
                news={NEWS_DATA[0]} 
                match={UPCOMING_MATCHES[0]} 
                onMatchClick={handleOpenMatch}
            />

            {/* 2. DISCOVERY RAIL (Teams/Stories) */}
            <StoryRail onTeamClick={handleOpenTeam} />

            {/* 3. LATEST NEWS LIST (Timeline) */}
            <NewsFeed />

            {/* 4. VIDEO SECTION (Cinematic) */}
            <div className="mt-8">
               <VideoShorts />
            </div>
            
            {/* 5. Stadium Spotlight */}
            <StadiumSpotlight />

            {/* 6. Popular Teams Listing (Footer Style) */}
            <PopularTeams />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 pb-12">
      {/* A. Header (with Search Trigger) */}
      <Header 
        onSearchClick={() => setIsSearchOpen(true)} 
        onNavigateHome={() => setCurrentView('home')}
      />

      {/* Trending Bar */}
      <TrendingBar />

      {/* B. Quick Access (Sticky) */}
      <QuickAccess onNavigate={setCurrentView} currentView={currentView} />

      {/* C. Modals */}
      <MatchDetailModal match={selectedMatch} onClose={handleCloseMatch} />
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Content Container */}
      <main className="max-w-[1140px] mx-auto px-4 mt-6">
        
        {/* Core Grid: Left Content (780px) vs Right Sidebar (320px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          
          {/* LEFT COLUMN: Main Content Switcher */}
          <div className="min-w-0 flex flex-col gap-0 animate-in fade-in duration-300">
            {renderMainContent()}
          </div>

          {/* RIGHT COLUMN: Sidebar (Fixed Width 320px) - Consistent across pages */}
          <aside className="w-full lg:w-[320px] flex flex-col gap-6">
            
            {/* New: Personalization Widget (Top Priority) */}
            <MyTeamWidget onMatchClick={handleOpenMatch} />

            {/* New: Qualified Teams Counter */}
            <QualifiedCounter />

            {/* D. Qualifiers Schedule (Keep it visible even on Schedule Page for quick glance) */}
            {currentView !== 'schedule' && (
               <MatchScheduleBox onMatchClick={handleOpenMatch} />
            )}

             {/* New: Asian Qualifiers Standings - Hide on Standings Page to avoid duplication */}
             {currentView !== 'standings' && (
                <StandingsWidget />
             )}
            
            {/* New: Trivia Game (Interactive) */}
            <TriviaWidget />

            {/* New: Pre-Tournament Poll */}
            <PollWidget />

            {/* E. Explainer Widget */}
            <ExplainerCard />

             {/* Sticky Ad Unit Placeholder */}
             <div className="sticky top-20">
               <div className="bg-gray-100 border border-gray-200 w-full h-[500px] flex flex-col items-center justify-center text-gray-400 text-sm rounded-lg relative overflow-hidden shadow-inner">
                  <span className="z-10 bg-white/80 px-3 py-1 rounded shadow-sm">Tài trợ trang phục</span>
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-200 to-transparent"></div>
               </div>
             </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-[#1a1a1a] text-white py-12 border-t-4 border-[#9f224e]">
        <div className="max-w-[1140px] mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">World Cup 2026 Hub</h2>
          <div className="flex justify-center gap-6 mb-8 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Về chúng tôi</a>
            <a href="#" className="hover:text-white transition-colors">Liên hệ quảng cáo</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
          </div>
          <p className="text-gray-600 text-sm">© 2026 Design inspired by VnExpress. Built for football fans.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
