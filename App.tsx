
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuickAccess from './components/QuickAccess';
import NewsFeed from './components/NewsFeed';
import HomeHero from './components/HomeHero';
import MatchScheduleBox from './components/MatchScheduleBox';
import ExplainerCard from './components/ExplainerCard';
import VideoShorts from './components/VideoShorts';
import PopularTeams from './components/PopularTeams';
import PollWidget from './components/PollWidget';
import StandingsWidget from './components/StandingsWidget';
import StadiumSpotlight from './components/StadiumSpotlight';
import MyTeamWidget from './components/MyTeamWidget';
import GallerySection from './components/GallerySection'; 
import GlobalSearchModal from './components/GlobalSearchModal';
import TriviaWidget from './components/TriviaWidget';
import SchedulePage from './components/SchedulePage';
import TeamsPage from './components/TeamsPage';
import StandingsPage from './components/StandingsPage';
import TeamDetailPage from './components/TeamDetailPage';
import MatchDetailPage from './components/MatchDetailPage';
import UpcomingTicker from './components/UpcomingTicker';
import { NEWS_DATA } from './constants';
import { Match, Team } from './types';

type ViewType = 'home' | 'schedule' | 'standings' | 'teams' | 'team_detail' | 'match_detail' | 'news' | 'video' | 'gallery' | 'stadiums';

const App: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Handle Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsSearchOpen(true);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    const heroNews = NEWS_DATA.slice(0, 3);
    const stream1News = NEWS_DATA.slice(3, 11);
    const stream2News = NEWS_DATA.slice(11, 17);
    const paginationNews = NEWS_DATA.slice(17);

    return (
      <>
        {/* Top News Hero */}
        <div className="max-w-[1100px] mx-auto px-4 mt-8">
           <HomeHero newsItems={heroNews} />
        </div>

        {/* Upcoming Matches Ticker */}
        <div className="max-w-[1100px] mx-auto px-4">
           <UpcomingTicker onMatchClick={handleOpenMatch} />
        </div>

        {/* First News Stream + Sidebar */}
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 mb-12">
            <div className="min-w-0">
               <NewsFeed newsItems={stream1News} />
            </div>

            <aside className="w-full flex flex-col gap-6">
                 <StandingsWidget onTeamClick={handleOpenTeam} />
                 <PollWidget />
                 <TriviaWidget />
            </aside>
        </div>

        {/* My Team Widget */}
        <div className="max-w-[1100px] mx-auto px-4 mb-12">
            <MyTeamWidget onMatchClick={handleOpenMatch} onTeamClick={handleOpenTeam} />
        </div>

        {/* Videos Section */}
        <div className="max-w-[1100px] mx-auto px-4 mb-12">
             <VideoShorts />
        </div>

        {/* Second News Stream */}
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 mb-12">
            <div className="min-w-0">
               <NewsFeed newsItems={stream2News} />
            </div>
            <aside className="w-full flex flex-col gap-6">
                 <ExplainerCard />
            </aside>
        </div>

        <GallerySection />

        {/* Footer News & Stadium Spotlight */}
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[760px_300px] gap-8 mb-8">
             <div className="min-w-0">
                <NewsFeed newsItems={paginationNews} title="Tin tức khác" hasPagination itemsPerPage={10} />
             </div>
             <aside className="w-full flex flex-col gap-6">
                 <StadiumSpotlight />
             </aside>
        </div>

        <div className="max-w-[1100px] mx-auto px-4">
             <PopularTeams />
        </div>
      </>
    );
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'schedule': return <SchedulePage onMatchClick={handleOpenMatch} onTeamClick={handleOpenTeam} />;
      case 'standings': return <StandingsPage onTeamClick={handleOpenTeam} />;
      case 'teams': return <TeamsPage onTeamClick={handleOpenTeam} />;
      case 'team_detail': return selectedTeam ? <TeamDetailPage team={selectedTeam} onBack={() => setCurrentView('teams')} onMatchClick={handleOpenMatch} onTeamClick={handleOpenTeam} /> : <TeamsPage onTeamClick={handleOpenTeam} />;
      case 'match_detail': return selectedMatch ? <MatchDetailPage match={selectedMatch} onBack={() => setCurrentView('home')} onMatchClick={handleOpenMatch} /> : <SchedulePage onMatchClick={handleOpenMatch} onTeamClick={handleOpenTeam} />;
      case 'news': return <div className="max-w-[1100px] mx-auto px-4 mt-6"><NewsFeed newsItems={NEWS_DATA} title="Tin tức mới nhất" hasPagination /></div>;
      case 'video': return <div className="bg-[#111] min-h-screen py-8"><div className="max-w-[1100px] mx-auto px-4"><VideoShorts /></div></div>;
      case 'gallery': return <GallerySection />;
      case 'stadiums': return <div className="max-w-[1100px] mx-auto px-4 mt-6"><StadiumSpotlight /></div>;
      case 'home':
      default: return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 pb-12 bg-[#f0f2f5] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      <Header onSearchClick={() => setIsSearchOpen(true)} onNavigateHome={() => setCurrentView('home')} />
      <QuickAccess onNavigate={setCurrentView} currentView={currentView} />
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <main className="mx-auto">
         {renderMainContent()}
      </main>

      <footer className="mt-20 bg-[#1a1a1a] text-white py-12 border-t-4 border-[#9f224e]">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4 uppercase">FIFA World Cup 2026™ Hub</h2>
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
