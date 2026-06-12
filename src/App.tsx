import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LandingPage from './components/LandingPage';
import AssessmentForm from './components/AssessmentForm';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import { UserProfile, VitalMetrics, TabType } from './types';
import { Sparkles, ArrowRight, Dumbbell } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  
  // Decide whether to show landing overlay or the dashboard in the home tab
  const [exploreLandingMode, setExploreLandingMode] = useState<boolean>(true);

  // Initialize profile with exact mock records
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.j@fitskill.ai',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX4dcL8RBNaYMMCRts8bv7iiTAw9w45uveqqKCA0-qZDvWHlJJwgvpxiPzDLNGfTdyBbl00yxtgqKO_JwbW9LiLbHr2UBnJKhA_IgdlZ8DkJ3a4X7xSY9WIUTBjZIYdGUGsAWlGAPc8wEwjdy6oe94a74_WvtsYcylwnNcfjrwqijW3XkfKAv_3YPb7vywOo5I1bqEF9fwfXxRT8Qyg18pE8hp2yuyVp9-uKKpA_68JcwlSj24uox4Uf-fM9zms86ElHmgg-ZaPg',
    level: 'Elite',
    streakDays: 14,
    badgesCount: 12,
    metricUnits: true,
    darkMode: true,
    subscription: 'pro'
  });

  // Initialize starting metrics
  const [metrics, setMetrics] = useState<VitalMetrics>({
    restingHeartRate: 72,
    pushUpsCount: 25,
    plankDuration: '02:30',
    runningTime: '05:15',
    runningDistance: '1 KM',
    gripStrength: 45.0
  });

  // Adjust theme class on start-up
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Set exploreLandingMode to false when we save metrics
  const handleSetMetrics = (newMetrics: VitalMetrics) => {
    setMetrics(newMetrics);
    setExploreLandingMode(false); // jump straight to dashboard once metrics are calibrated!
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans antialiased selection:bg-primary-container/30 pb-20 md:pb-6 kinetic-bg">
      
      {/* Universal Sticky Top App Bar */}
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Container Content */}
      <main className="pt-16 pb-12 transition-all duration-300">
        
        {/* Route views dynamically */}
        {currentTab === 'home' && (
          <div>
            {exploreLandingMode ? (
              <div className="space-y-4 animate-fade-in">
                {/* Visual Tab Toggle overlay to switch to dashboard */}
                <div className="bg-surface-container/50 border-b border-white/5 py-3 px-6 select-none shadow-inner">
                  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-on-surface-variant flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                      <span>Welcome! You're in <strong>Explore Mode</strong>. Try your customized home dashboard!</span>
                    </p>
                    <button
                      onClick={() => setExploreLandingMode(false)}
                      className="px-4 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 rounded-full text-xs font-bold leading-none select-none transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>Launch Athlete Dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                {/* Landing page screen */}
                <LandingPage setCurrentTab={setCurrentTab} />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Visual Tab Toggle overlay to switch back to landing */}
                <div className="bg-surface-container/50 border-b border-white/5 py-3 px-6 select-none shadow-inner">
                  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-on-surface-variant flex items-center gap-2">
                      <Dumbbell className="w-3.5 h-3.5 text-primary" />
                      <span>Welcome back, <strong>{profile.name}</strong>. Feel free to preview the product landing layout!</span>
                    </p>
                    <button
                      onClick={() => setExploreLandingMode(true)}
                      className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-on-surface border border-white/10 rounded-full text-xs font-medium leading-none select-none transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>Explore Landing Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Page screen */}
                <Dashboard metrics={metrics} setCurrentTab={setCurrentTab} />
              </div>
            )}
          </div>
        )}

        {currentTab === 'assessment' && (
          <AssessmentForm 
            metrics={metrics} 
            setMetrics={handleSetMetrics} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === 'analytics' && (
          <Analytics metrics={metrics} setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'profile' && (
          <Profile 
            profile={profile} 
            setProfile={setProfile} 
            setCurrentTab={setCurrentTab} 
          />
        )}

      </main>

      {/* Mobile Sticky Navigation Tab bar */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}
