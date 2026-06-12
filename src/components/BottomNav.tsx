import { Home, Dumbbell, TrendingUp, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export default function BottomNav({ currentTab, setCurrentTab }: BottomNavProps) {
  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-2xl border-t border-white/10 shadow-2xl flex justify-around items-center px-4 pb-5 pt-2 transition-all duration-350"
      id="mobile-bottom-navbar"
    >
      <button
        onClick={() => setCurrentTab('home')}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-90 ${
          currentTab === 'home' 
            ? 'text-primary font-bold' 
            : 'text-on-surface-variant opacity-70 hover:opacity-100'
        }`}
        id="navbar-mobile-home"
      >
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-wider uppercase">Home</span>
      </button>

      <button
        onClick={() => setCurrentTab('assessment')}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-90 ${
          currentTab === 'assessment' 
            ? 'text-primary font-bold' 
            : 'text-on-surface-variant opacity-70 hover:opacity-100'
        }`}
        id="navbar-mobile-assessment"
      >
        <Dumbbell className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-wider uppercase">Assess</span>
      </button>

      <button
        onClick={() => setCurrentTab('analytics')}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-90 ${
          currentTab === 'analytics' 
            ? 'text-primary font-bold' 
            : 'text-on-surface-variant opacity-70 hover:opacity-100'
        }`}
        id="navbar-mobile-analytics"
      >
        <TrendingUp className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-wider uppercase">Metrics</span>
      </button>

      <button
        onClick={() => setCurrentTab('profile')}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-90 ${
          currentTab === 'profile' 
            ? 'bg-primary-container text-on-primary-container font-bold px-4 py-1.5 rounded-full' 
            : 'text-on-surface-variant opacity-70 hover:opacity-100'
        }`}
        id="navbar-mobile-profile"
      >
        <User className="w-5 h-5 mb-1 md:mb-0" />
        <span className="text-[10px] tracking-wider uppercase font-semibold">Profile</span>
      </button>
    </nav>
  );
}
