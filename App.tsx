
import React, { useState } from 'react';
import Header from './components/Header';
import QuickAccess from './components/QuickAccess';
import NewsFeed from './components/NewsFeed';
import HomeHero from './components/HomeHero';
import StoryRail from './components/StoryRail';
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
import GallerySection from './components/GallerySection'; // New Import
import GlobalSearchModal from './components/GlobalSearchModal';
import TriviaWidget from './components/TriviaWidget';
import SchedulePage from './components/SchedulePage';
import TeamsPage from './components/TeamsPage';
import StandingsPage from './components/StandingsPage';
import TeamDetailPage from './components/TeamDetailPage';
import MatchDetailPage from './components/MatchDetailPage';
import { NEWS_DATA, UPCOMING_MATCHES, HOST_STADIUMS } from './constants';
import { Match, Team } from './types';

type ViewType = 'home' | 'schedule' | 'standings' | 'teams' | 'team_detail' | 'match_detail' | 'news' | 'video' | 'gallery' | 'stadiums';

const App: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const handleOpenMatch = (match: Match) => {
    setSelectedMatch(match);
    setCurrentView('match_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeam = (team: Team) => {
    setSelectedTeam(team);
    setCurrentView('team_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHomeContent = () => {
    // Slice data for specific sections
    const heroNews = NEWS_DATA.slice(0, 3);
    const stream1News = NEWS_DATA.slice(3, 9); // Indices 3-8 (6 items). Index 8 is Mbappe news.
    const stream2News = NEWS_DATA.slice(9, 15); // 6 items
    const paginationNews = NEWS_DATA.slice(15); // Remaining

    return (
      <>
        {/* CONTAINER 1: Hero & Rail (Max Width 1140px) */}
        <div className="max-w-[1140px] mx-auto px-4 mt-6">
           {/* 1. TOP 3 NEWS (Hero) */}
           <HomeHero newsItems={heroNews} />

           {/* 2. THEO DÕI ĐỘI TUYỂN (Rail) */}
           <StoryRail onTeamClick={handleOpenTeam} />
        </div>

        {/* CONTAINER 2: First Main Grid (Fixed 760px + 300px) */}
        <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 mb-12">
            {/* Main Content Column (760px) */}
            <div className="min-w-0 flex flex-col gap-8">
               {/* 3. DÒNG SỰ KIỆN (Stream 1) */}
               <NewsFeed newsItems={stream1News} title="Dòng sự kiện" />

               {/* 4. THEO DÕI ĐỘI BÓNG CỦA BẠN */}
               <MyTeamWidget onMatchClick={handleOpenMatch} />
            </div>

            {/* Sidebar (300px) */}
            <aside className="w-full flex flex-col gap-6">
                 <MatchScheduleBox onMatchClick={handleOpenMatch} />
                 <StandingsWidget />
                 <PollWidget />
                 <TriviaWidget />
            </aside>
        </div>

        {/* CONTAINER 3: VIDEO SHORTS (Standalone 1100px Container) */}
        <div className="max-w-[1100px] mx-auto px-4 mb-12">
             <VideoShorts />
        </div>

        {/* CONTAINER 4: Second Main Grid (Stream 2) */}
        <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 mb-12">
            <div className="min-w-0">
               {/* 5. NEXT NEWS ITEMS (Stream 2) */}
               <NewsFeed newsItems={stream2News} />
            </div>
            
            <aside className="w-full flex flex-col gap-6">
                 <ExplainerCard />
                 <QualifiedCounter />
            </aside>
        </div>

        {/* CONTAINER 5: FULL WIDTH GALLERY */}
        <GallerySection />

        {/* CONTAINER 6: FINAL GRID (Remaining News with Pagination) */}
        <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 mb-8">
             <div className="min-w-0">
                {/* 6. REMAINING NEWS (Pagination) */}
                <NewsFeed newsItems={paginationNews} title="Tin tức khác" hasPagination itemsPerPage={10} />
             </div>
             <aside className="w-full flex flex-col gap-6">
                 <StadiumSpotlight />
             </aside>
        </div>

        {/* Final Footer Component */}
        <div className="max-w-[1140px] mx-auto px-4">
             <PopularTeams />
        </div>
      </>
    );
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'schedule': return <SchedulePage onMatchClick={handleOpenMatch} />;
      case 'standings': return <StandingsPage onTeamClick={handleOpenTeam} />;
      case 'teams': return <TeamsPage onTeamClick={handleOpenTeam} />;
      case 'team_detail': return selectedTeam ? <TeamDetailPage team={selectedTeam} onBack={() => setCurrentView('teams')} onMatchClick={handleOpenMatch} /> : <TeamsPage onTeamClick={handleOpenTeam} />;
      case 'match_detail': return selectedMatch ? <MatchDetailPage match={selectedMatch} onBack={() => setCurrentView('home')} onMatchClick={handleOpenMatch} /> : <SchedulePage onMatchClick={handleOpenMatch} />;
      case 'news': return <div className="max-w-[1140px] mx-auto px-4 mt-6"><NewsFeed newsItems={NEWS_DATA} title="Tin tức mới nhất" hasPagination /></div>;
      case 'video': return <div className="bg-[#111] min-h-screen py-8"><div className="max-w-[1100px] mx-auto px-4"><VideoShorts /></div></div>;
      case 'gallery': return <GallerySection />;
      case 'stadiums': return <div className="max-w-[1140px] mx-auto px-4 mt-6"><StadiumSpotlight /></div>;
      case 'home':
      default: return renderHomeContent();
    }
  };

  const isFullPage = currentView === 'match_detail';

  return (
    <div className="min-h-screen font-sans text-gray-900 pb-12 bg-[#f0f2f5] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      <Header onSearchClick={() => setIsSearchOpen(true)} onNavigateHome={() => setCurrentView('home')} />
      {!isFullPage && <TrendingBar />}
      {!isFullPage && <QuickAccess onNavigate={setCurrentView} currentView={currentView} />}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <main className="mx-auto">
         {renderMainContent()}
      </main>

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
