import React, { useState } from 'react';
import { 
  User, Edit, Shield, Flame, Award, ChevronRight, Activity, Moon, Ruler, Lock, 
  CreditCard, Smartphone, Globe, LogOut, Trash2, Camera, Check, X, Watch, HeartPulse
} from 'lucide-react';
import { UserProfile, TabType } from '../types';

interface ProfileProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  setCurrentTab: (tab: TabType) => void;
}

export default function Profile({ profile, setProfile, setCurrentTab }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleSaveProfile = () => {
    setProfile({
      ...profile,
      name: editedName,
      email: editedEmail
    });
    setIsEditing(false);
  };

  const handleUnitToggle = (metric: boolean) => {
    setProfile({
      ...profile,
      metricUnits: metric
    });
  };

  const handleDarkModeToggle = () => {
    setProfile({
      ...profile,
      darkMode: !profile.darkMode
    });
    // Toggle global document class just like tailwind specifications
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  const confirmLogout = () => {
    setLoggedOut(true);
    setShowLogoutConfirm(false);
  };

  return (
    <div className="pt-8 pb-20 px-6 max-w-2xl mx-auto space-y-8 font-sans text-left transition-all">
      
      {/* Top Banner */}
      <section className="flex flex-col items-center text-center space-y-4 mb-4">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 p-1 relative">
            <img 
              alt={profile.name} 
              className="w-full h-full object-cover rounded-full select-none"
              src={profile.avatarUrl}
              referrerPolicy="no-referrer"
            />
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute bottom-0 right-0 bg-primary hover:bg-primary-container text-on-primary p-2.5 rounded-full shadow-lg active:scale-90 transition-transform cursor-pointer"
            aria-label="Upload profile photo"
          >
            <Camera className="w-4 h-4 text-on-primary" />
          </button>
        </div>

        {/* Edit profile state */}
        {isEditing ? (
          <div className="space-y-3 w-full max-w-xs bg-white/5 p-4 rounded-2xl border border-white/10" id="profile-edit-form">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={editedName} 
                onChange={(e) => setEditedName(e.target.value)} 
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={editedEmail} 
                onChange={(e) => setEditedEmail(e.target.value)} 
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleSaveProfile}
                className="flex-1 py-1.5 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:opacity-90 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 py-1.5 bg-white/5 text-on-surface text-xs font-bold rounded-lg hover:bg-white/10 flex items-center justify-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-display font-black text-on-surface">{profile.name}</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">{profile.email}</p>
          </div>
        )}

        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/15 text-[10px] font-sans font-bold tracking-widest uppercase transition-colors active:scale-95 cursor-pointer"
            id="btn-profile-edit-inline"
          >
            Edit Profile
          </button>
        )}
      </section>

      {/* Stats row overview boxes */}
      <section className="grid grid-cols-3 gap-4" id="profile-stats-grid">
        
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 hover:border-primary/10 transition-all">
          <Award className="w-5 h-5 text-primary mb-2 shadow-sm" />
          <span className="text-sm sm:text-base font-display font-black text-primary">{profile.level}</span>
          <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">LEVEL</span>
        </div>

        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 hover:border-secondary/10 transition-all">
          <Flame className="w-5 h-5 text-secondary mb-2 shadow-sm" />
          <span className="text-sm sm:text-base font-display font-black text-secondary">{profile.streakDays} Day</span>
          <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">STREAK</span>
        </div>

        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 hover:border-tertiary/10 transition-all">
          <Award className="w-5 h-5 text-tertiary mb-2 shadow-sm" />
          <span className="text-sm sm:text-base font-display font-black text-tertiary">{profile.badgesCount}</span>
          <span className="text-[9px] font-sans font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">BADGES</span>
        </div>

      </section>

      {/* Account Activity achievements list */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest text-on-surface uppercase px-1">Account Achievements</h3>
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
          
          {/* Activity 1 */}
          <div className="p-4 border-b border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed-dim border border-primary/20 shrink-0">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-sans font-bold text-on-surface">Iron Lungs</h4>
              <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mt-0.5">Completed 10km run achievement</p>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform shrink-0" />
          </div>

          {/* Activity 2 */}
          <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
              <Award className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-sans font-bold text-on-surface">Early Bird</h4>
              <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mt-0.5">5 sessions before 7 AM this week</p>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform shrink-0" />
          </div>

        </div>
      </section>

      {/* Preferences Section options */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest text-on-surface uppercase px-1">Preferences</h3>
        <div className="glass-card rounded-2xl p-2 space-y-1 border border-white/5">
          
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs font-semibold text-on-surface">Dark theme mode</span>
            </div>
            <button 
              onClick={handleDarkModeToggle}
              className="relative inline-flex items-center cursor-pointer select-none"
              aria-label="Toggle dark mode theme"
            >
              <div className="w-10 h-5 bg-surface-container-highest rounded-full transition-colors relative">
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-all ${
                    profile.darkMode ? 'left-[22px] bg-primary' : 'left-[2px]'
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Unit selector choice pills */}
          <div className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <Ruler className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs font-semibold text-on-surface">Unit Systems choice</span>
            </div>
            <div className="flex bg-surface-container-highest p-1 rounded-lg">
              <button 
                onClick={() => handleUnitToggle(true)}
                className={`px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded-md transition-all ${
                  profile.metricUnits ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                }`}
              >
                Metric
              </button>
              <button 
                onClick={() => handleUnitToggle(false)}
                className={`px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded-md transition-all ${
                  !profile.metricUnits ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          {/* Privacy metrics */}
          <div className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
            <div className="flex items-center gap-3 text-left">
              <Lock className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs font-semibold text-on-surface">Privacy & Bio encryption</span>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </div>

        </div>
      </section>

      {/* Account Management settings */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest text-on-surface uppercase px-1">Account Details</h3>
        <div className="glass-card rounded-2xl p-2 space-y-1 border border-white/5">
          
          {/* Subscription Tiers */}
          <div className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs font-semibold text-on-surface">Subscription Status</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">PRO MEMBER</span>
              <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Connected Devices smart watch icons */}
          <div className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs font-semibold text-on-surface">Connected IoT Sensors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-background" title="Smart Watch Sync">
                <Watch className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-background" title="Heart Rate Monitor">
                <HeartPulse className="w-3.5 h-3.5 text-secondary" />
              </div>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-on-surface-variant" />
              <span className="text-xs font-semibold text-on-surface">Language settings</span>
            </div>
            <span className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-widest">English (US)</span>
          </div>

        </div>
      </section>

      {/* Danger Zone Options */}
      <section className="pt-4" id="danger-zone-settings">
        <div className="glass-card rounded-2xl p-2 space-y-1 border border-error/20 bg-error/5">
          
          {/* Logout Action */}
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-between p-3.5 text-error hover:bg-error/10 transition-colors rounded-xl text-left"
            id="btn-logout-trigger"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Sign out from App</span>
            </div>
          </button>

          {/* Delete account */}
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-between p-3.5 text-error/60 hover:bg-error/10 transition-colors rounded-xl text-left font-medium"
            id="btn-delete-trigger"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-4 h-4" />
              <span className="text-xs font-normal">Permanently Delete Account</span>
            </div>
          </button>

        </div>
      </section>

      {/* CONFIRM LOGOUT MODAL OVERLAY */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/90 backdrop-blur-md">
          <div className="glass-card-dense p-6 rounded-[2rem] max-w-sm w-full text-center space-y-4 border border-error/30 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-error/15 flex items-center justify-center text-error mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">Sign Out</h3>
              <p className="text-xs text-on-surface-variant mt-1">Are you sure you want to end your current session?</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={confirmLogout}
                className="flex-1 py-2.5 bg-error text-on-error font-bold text-xs uppercase rounded-full hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                Log Out
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-white/5 text-on-surface font-bold text-xs uppercase rounded-full hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE ACCOUNT OVERLAY */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/90 backdrop-blur-md">
          <div className="glass-card-dense p-6 rounded-[2rem] max-w-sm w-full text-center space-y-4 border border-error/50 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-error/25 flex items-center justify-center text-error mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">Delete Profile Data</h3>
              <p className="text-xs text-on-surface-variant mt-1">This operation is irreversible! Your baseline clinical indicators and history metrics will be permanently erased.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setProfile({
                    name: 'Guest User',
                    email: 'guest@fitskill.ai',
                    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX4dcL8RBNaYMMCRts8bv7iiTAw9w45uveqqKCA0-qZDvWHlJJwgvpxiPzDLNGfTdyBbl00yxtgqKO_JwbW9LiLbHr2UBnJKhA_IgdlZ8DkJ3a4X7xSY9WIUTBjZIYdGUGsAWlGAPc8wEwjdy6oe94a74_WvtsYcylwnNcfjrwqijW3XkfKAv_3YPb7vywOo5I1bqEF9fwfXxRT8Qyg18pE8hp2yuyVp9-uKKpA_68JcwlSj24uox4Uf-fM9zms86ElHmgg-ZaPg',
                    level: 'Rookie',
                    streakDays: 0,
                    badgesCount: 0,
                    metricUnits: true,
                    darkMode: true,
                    subscription: 'free'
                  });
                  setEditedName('Guest User');
                  setEditedEmail('guest@fitskill.ai');
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 py-2.5 bg-error text-on-error font-bold text-xs uppercase rounded-full hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 bg-white/5 text-on-surface font-bold text-xs uppercase rounded-full hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMED LOGGED OUT STATE */}
      {loggedOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface text-center">
          <div className="glass-card p-8 rounded-[2.5rem] max-w-sm w-full space-y-4">
            <Check className="w-12 h-12 text-secondary mx-auto animate-float" />
            <h3 className="font-display font-black text-xl text-white">Successfully Logged Out</h3>
            <p className="text-xs text-on-surface-variant">Your local cache data continues synchronized securely. Feel free to re-enter at any point.</p>
            <button 
              onClick={() => {
                setLoggedOut(false);
                setCurrentTab('home');
              }}
              className="w-full py-3 flow-gradient text-on-primary-container font-bold text-xs tracking-wider uppercase rounded-full active:scale-95 transition-all cursor-pointer"
            >
              Sign back in
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
