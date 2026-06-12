import React, { useState, useEffect } from 'react';
import { 
  Timer, Flame, Award, Heart, Shield, Lock, Play, Sparkles, Plus, Clock, Signal, X, CheckCircle
} from 'lucide-react';
import { VitalMetrics, TabType, ActiveClass } from '../types';

interface DashboardProps {
  metrics: VitalMetrics;
  setCurrentTab: (tab: TabType) => void;
}

export default function Dashboard({ metrics, setCurrentTab }: DashboardProps) {
  const [activeWorkout, setActiveWorkout] = useState<ActiveClass | null>(null);
  const [workoutTimer, setWorkoutTimer] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [workoutComplete, setWorkoutComplete] = useState<boolean>(false);

  // Dynamically calculate fitness score from user metrics data!
  const calculateScore = () => {
    let score = 55; // baseline
    if (metrics.restingHeartRate < 70) score += 10;
    if (metrics.restingHeartRate < 60) score += 5;
    if (metrics.pushUpsCount > 20) score += 10;
    if (metrics.pushUpsCount > 40) score += 5;
    if (metrics.gripStrength > 40) score += 10;
    if (metrics.gripStrength > 55) score += 5;
    return Math.min(score, 100);
  };

  const dynamicScore = calculateScore();

  // Active workout mock timer
  useEffect(() => {
    let interval: any;
    if (activeWorkout && !isPaused && !workoutComplete) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => {
          if (prev <= 1) {
            setWorkoutComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeWorkout, isPaused, workoutComplete]);

  const startWorkout = (workout: ActiveClass) => {
    setActiveWorkout(workout);
    setWorkoutTimer(workout.durationMinutes * 60);
    setIsPaused(false);
    setWorkoutComplete(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const recommendedWorkouts: ActiveClass[] = [
    {
      id: 'wc-1',
      title: 'Core Crusher Pro',
      category: 'HIIT',
      durationMinutes: 25,
      level: 'Advanced',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWwWdk-pBaIeY5zSmv1hqJsr4ahJAEtVMFuKZR5rwQHA0_iiXyhYy_IU725KJZoeN3zNjee8-8926JOQgitTpieGBXqmRNocXJaw9YKOMunfsCWfz0iYkSJ8Hnm_jH5jK4PBdZJP6yujgd5klmIeAEZBBTfpC8E7q197XFlPOp4IHEYKvdLT_mXVYhMZj5GS1Z1NqIfFQdexnD0KjvhA3TreMxGr4MCGXNMENybSt57Y5ncyQOJ2WZuDfCLFbnaLTUpFXc5-p9Mg',
      imageAlt: 'Focused female athlete performing explosive high-intensity training.'
    },
    {
      id: 'wc-2',
      title: 'Flow & Restore',
      category: 'YOGA',
      durationMinutes: 45,
      level: 'Intermediate',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1ptAkOfoz1G7hEtRQTDQVAwzXxWusZ8lfsy53Wev2Ma5vtDp8mlm3MhZo0rznHtcrHCIN-GYRljtunYQPUQ-FHyy7ceX5KjAojhgXazWWgmebk4crhIpYFC_qr4Gba-nNkv783f6zZCdnW0W-TWw1O3JJIvH_qg-_POlhBVOWYsmUMHqCpCG_FPjAh1nJCX4shyqv0m9JYU2hKObGHsesgL9-qmKbsHCZoAicVyesW-OWtNvUKuxq8aWykcUjXHBGJtCb74Uh1g',
      imageAlt: 'Sunrise yoga flow in minimalist glass studio.'
    },
    {
      id: 'wc-3',
      title: 'Power Foundations',
      category: 'STRENGTH',
      durationMinutes: 50,
      level: 'Beginner',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVXGbUO0ZQroFkmKVVGLRSCRS9LVqjOp4JUKWAv2QoiJIkCf0ZJniNPrMjCKW57_AEtknbEF8dlUV0pwJir42EeWt_JWfy_Mz2v0sB5pTKsHid5Q6O1-C64XZ1jkTR7EoT5lDpNVkrU5jTHScXrMAZfMBJDWfDxHg-O_bqmaHKrM19i9Pz5qRQCNaIAeeNM_eimn69vs_fsqvvYMAIQp7xc--73ftbyCPgSmUkSvpQHtgF99KAWmXdT9z-9J6QfZg2uETwZW70Zw',
      imageAlt: "Heavy barbell grip in high-performance crossfit setting."
    }
  ];

  return (
    <div className="pt-8 pb-20 max-w-7xl mx-auto px-6 space-y-8 font-sans text-left transition-all">
      
      {/* Welcome & Sync Banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-sans font-bold text-primary tracking-widest uppercase mb-1">Dashboard</p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-on-surface">Hello, Alex!</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">Ready to hit your targets today?</p>
        </div>
        <div>
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-on-surface">Sync Active</span>
          </div>
        </div>
      </section>

      {/* Main Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Fitness Score Ring Box (Large layout span 2) */}
        <div className="md:col-span-2 glass-card rounded-[2rem] p-6 flex flex-col items-center justify-center relative overflow-hidden group border border-white/10 hover:border-white/20 transition-all">
          <div className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors">
            <Shield className="w-16 h-16" />
          </div>

          <h3 className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase mb-4 text-center">
            TODAY'S FITNESS SCORE
          </h3>

          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Ring Progress */}
            <svg className="w-full h-full -rotate-90">
              <defs>
                <linearGradient id="scoreProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#adc6ff" />
                  <stop offset="100%" stopColor="#4edea3" />
                </linearGradient>
              </defs>
              <circle 
                className="text-white/5" 
                cx="96" 
                cy="96" 
                r="82" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="12" 
              />
              <circle 
                cx="96" 
                cy="96" 
                r="82" 
                fill="transparent" 
                stroke="url(#scoreProgressGradient)" 
                strokeWidth="12" 
                strokeDasharray={515}
                strokeDashoffset={515 - (515 * dynamicScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-black text-primary">{dynamicScore}</span>
              <span className="text-[10px] font-sans font-bold text-on-surface-variant tracking-widest uppercase">OPTIMAL</span>
            </div>
          </div>
          
          <p className="mt-5 text-xs text-center text-on-surface-variant max-w-xs leading-relaxed">
            Your agility index is up 12% compared to last Tuesday. Keep up the high intensity.
          </p>
        </div>

        {/* Weekly Progress Chart Box (Large list span 2) */}
        <div className="md:col-span-2 glass-card rounded-[2rem] p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">
              WEEKLY PROGRESS
            </h3>
            <span className="text-xs font-bold text-secondary">+8.4%</span>
          </div>

          <div className="flex-grow flex items-end justify-between gap-4 h-40">
            {/* Simple Responsive glass bar elements */}
            {[
              { day: 'M', height: 'h-[60%]', opacity: 'bg-primary/40' },
              { day: 'T', height: 'h-[75%]', opacity: 'bg-primary/40' },
              { day: 'W', height: 'h-[95%]', opacity: 'bg-primary/60' },
              { day: 'T', height: 'h-[80%]', opacity: 'bg-primary/40' },
              { day: 'F', height: 'h-[40%]', opacity: 'bg-primary/30' },
              { day: 'S', height: 'h-[70%]', opacity: 'bg-primary/40' },
              { day: 'S', height: 'h-[85%]', opacity: 'bg-primary/50' }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full bg-white/5 rounded-t-xl relative h-36 flex items-end overflow-hidden border border-white/[0.03]">
                  <div className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-300 group-hover:bg-primary ${bar.height} ${bar.opacity}`} />
                </div>
                <span className="text-xs text-on-surface-variant font-bold">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Micro Cards x4 */}
        <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all">
          <div className="flex items-center gap-2 text-primary">
            <Timer className="w-4 h-4" />
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">Active Mins</span>
          </div>
          <div className="text-2xl font-display font-bold mt-3 text-on-surface">
            42 <span className="text-xs font-normal text-on-surface-variant">/ 60</span>
          </div>
        </div>

        <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all">
          <div className="flex items-center gap-2 text-secondary">
            <Flame className="w-4 h-4" />
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">Calories</span>
          </div>
          <div className="text-2xl font-display font-bold mt-3 text-on-surface">
            1,240 <span className="text-xs font-normal text-on-surface-variant">KCAL</span>
          </div>
        </div>

        <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all">
          <div className="flex items-center gap-2 text-tertiary">
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">BMI index</span>
          </div>
          <div className="text-2xl font-display font-bold mt-3 text-on-surface">
            22.4 <span className="text-xs font-normal text-on-surface-variant">NORMAL</span>
          </div>
        </div>

        <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all">
          <div className="flex items-center gap-2 text-error">
            <Heart className="w-4 h-4" />
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">Heart Rate</span>
          </div>
          <div className="text-2xl font-display font-bold mt-3 text-on-surface">
            {metrics.restingHeartRate || 72} <span className="text-xs font-normal text-on-surface-variant">BPM</span>
          </div>
        </div>

      </section>

      {/* Goal Tracks & Streak Widget */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Daily concentric rings */}
        <div className="md:col-span-2 glass-card rounded-[2rem] p-6 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between">
          <h3 className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase mb-6">
            DAILY GOAL PROGRESS
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {[
              { label: 'Steps', percentage: 80, stroke: '#adc6ff' },
              { label: 'Water', percentage: 50, stroke: '#4edea3' },
              { label: 'Sleep', percentage: 90, stroke: '#d0bcff' },
              { label: 'Stand', percentage: 25, stroke: '#ffb4ab' },
            ].map((goal, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2.5">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="33" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="5" 
                      className="text-white/5"
                    />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="33" 
                      fill="transparent" 
                      stroke={goal.stroke} 
                      strokeWidth="5" 
                      strokeDasharray={207}
                      strokeDashoffset={207 - (207 * goal.percentage) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-on-surface">
                    {goal.percentage}%
                  </span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant">{goal.label}</span>
              </div>
            ))}

          </div>
        </div>

        {/* Streak & Badges Widget */}
        <div className="glass-card rounded-[2rem] p-6 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">
                CURRENT STREAK
              </h3>
              <Flame className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-display font-black text-secondary">14</span>
              <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-on-surface-variant">DAYS</span>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase mb-3">
              BADGES EARNED
            </h3>
            <div className="flex gap-3">
              
              <div className="w-10 h-10 rounded-full flow-gradient flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer relative group">
                <Award className="w-5 h-5 text-on-primary-container" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-[8px] bg-surface-container-highest px-2 py-1 rounded text-white font-bold whitespace-nowrap">
                  Power Lifter
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer relative group">
                <Timer className="w-5 h-5 text-on-tertiary" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-[8px] bg-surface-container-highest px-2 py-1 rounded text-white font-bold whitespace-nowrap">
                  Speed King
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-outline-variant flex items-center justify-center opacity-40">
                <Lock className="w-4 h-4 text-on-surface-variant" />
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Classes / Recommended section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-widest text-on-surface uppercase">
            RECOMMENDED CLASSES
          </h3>
          <button 
            onClick={() => setCurrentTab('analytics')}
            className="text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            View analytics
          </button>
        </div>

        {/* 3 Athlete workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedWorkouts.map((workout) => (
            <div 
              key={workout.id} 
              className="glass-card rounded-2xl overflow-hidden group border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="h-44 w-full relative overflow-hidden">
                <img 
                  alt={workout.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={workout.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80" />
                
                {/* Visual Category badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md border border-primary/20">
                    {workout.category}
                  </span>
                </div>

                {/* Instant Play hover overlay */}
                <button
                  onClick={() => startWorkout(workout)}
                  className="absolute inset-x-0 inset-y-0 m-auto w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 transition-all shadow-xl text-surface cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>

              <div className="p-5 text-left space-y-3">
                <h4 className="font-display font-bold text-base text-on-surface">{workout.title}</h4>
                
                <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{workout.durationMinutes}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="w-3.5 h-3.5 text-secondary" />
                    <span>{workout.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVE WORKOUT MODAL OVERLAY */}
      {activeWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/90 backdrop-blur-md">
          <div 
            className="glass-card-dense p-6 rounded-[2.5rem] max-w-md w-full border border-primary/25 shadow-2xl space-y-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-[10px] font-sans font-bold text-primary tracking-widest uppercase">
                Active Assessment Session
              </span>
              <button 
                onClick={() => setActiveWorkout(null)} 
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 text-on-surface-variant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media/Illustration container */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden relative border border-white/5">
              <img 
                src={activeWorkout.imageUrl} 
                alt="Active session" 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                <Sparkles className="w-8 h-8 text-secondary animate-bounce mb-2" />
                <p className="text-white text-xs font-bold tracking-widest uppercase">{activeWorkout.title}</p>
                <p className="text-on-surface-variant text-[10px]">{activeWorkout.level} Track</p>
              </div>
            </div>

            {/* Workout Completed state */}
            {workoutComplete ? (
              <div className="space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mx-auto border border-secondary/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-display font-black text-on-surface">Session Accomplished!</h4>
                  <p className="text-xs text-on-surface-variant">Calorific load zones and metabolic scores updated.</p>
                </div>
                <button 
                  onClick={() => setActiveWorkout(null)}
                  className="px-6 py-2.5 bg-secondary text-on-secondary hover:opacity-90 font-bold text-xs tracking-wider uppercase rounded-full transition-all"
                >
                  Exit Session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Chronometer */}
                <div>
                  <p className="text-5xl font-mono tracking-wider font-extrabold text-on-surface">
                    {formatTimer(workoutTimer)}
                  </p>
                  <p className="text-[10px] text-on-surface-variant tracking-widest uppercase mt-1">Remaining Time</p>
                </div>

                {/* Primary controls */}
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-on-surface font-bold text-xs tracking-wider uppercase active:scale-95 transition-all"
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button 
                    onClick={() => setWorkoutComplete(true)}
                    className="px-6 py-3 rounded-xl bg-error text-on-error font-bold text-xs tracking-wider uppercase active:scale-95 transition-all"
                  >
                    Skip to End
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
