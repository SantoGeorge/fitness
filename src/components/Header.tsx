import { Search, Bell, Dumbbell } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-sm h-16 flex items-center justify-between px-6 transition-all">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-all"
          id="header-brand-container"
        >
          <div className="w-8 h-8 rounded-lg flow-gradient flex items-center justify-center text-on-primary">
            <Dumbbell className="w-4 h-4 shadow-sm" />
          </div>
          <span className="text-xl font-display font-bold font-title-md tracking-tight text-primary">
            FitSkill
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-navbar">
          <button
            onClick={() => setCurrentTab('home')}
            className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-primary ${
              currentTab === 'home' ? 'text-primary' : 'text-on-surface-variant'
            }`}
            id="nav-btn-home"
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('assessment')}
            className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-primary ${
              currentTab === 'assessment' ? 'text-primary' : 'text-on-surface-variant'
            }`}
            id="nav-btn-assessment"
          >
            Assessments
          </button>
          <button
            onClick={() => setCurrentTab('analytics')}
            className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-primary ${
              currentTab === 'analytics' ? 'text-primary' : 'text-on-surface-variant'
            }`}
            id="nav-btn-analytics"
          >
            Analytics
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-primary ${
              currentTab === 'profile' ? 'text-primary' : 'text-on-surface-variant'
            }`}
            id="nav-btn-profile"
          >
            Profile
          </button>
        </nav>

        {/* Action icons (Search / Notification) */}
        <div className="flex items-center gap-3" id="header-actions">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 active:scale-95 duration-200 text-on-surface transition-all"
            id="btn-search-trigger"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-on-surface" />
          </button>
          <button 
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 active:scale-95 duration-200 text-on-surface transition-all"
            id="btn-notifications-trigger"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-on-surface" />
            <span className="absolute top-2 right-2 w-2,5 h-2,5 bg-secondary rounded-full border-2 border-surface animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
}
