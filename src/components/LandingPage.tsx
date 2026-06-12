import React, { useState } from 'react';
import { Play, Bolt, Dumbbell, ArrowRight, Trophy, Info, Sparkles, Check, PlayCircle, TrendingUp } from 'lucide-react';
import { TabType } from '../types';

interface LandingPageProps {
  setCurrentTab: (tab: TabType) => void;
}

export default function LandingPage({ setCurrentTab }: LandingPageProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="relative pt-10 pb-16 overflow-x-hidden min-h-screen font-sans kinetic-bg">
      {/* Background radial blobs for immersive depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/25 blur-[120px] rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-tertiary/25 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[700px] flex items-center justify-center pt-8 pb-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Hero Left Content */}
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Calibration Engine</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight text-on-surface">
                Discover Your <br />
                <span className="text-transparent bg-clip-text flow-gradient">True Fitness</span> Level
              </h1>
              
              <p className="text-base sm:text-lg text-on-surface-variant max-w-lg font-normal leading-relaxed">
                Go beyond simple tracking. Our clinical-grade assessment engine and AI coaching help you reach elite performance tiers with precision and style.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setCurrentTab('assessment')}
                  className="px-8 py-4 flow-gradient hover:opacity-90 hover:scale-[1.02] text-on-primary-container font-black rounded-2xl shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
                  id="btn-get-started"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="px-8 py-4 bg-surface-container-highest/50 hover:bg-surface-container-highest backdrop-blur-md border border-white/10 hover:border-white/25 text-on-surface font-bold rounded-2xl flex items-center gap-2 active:scale-95 transition-all duration-200 cursor-pointer"
                  id="btn-watch-demo"
                >
                  <PlayCircle className="w-5 h-5 text-primary" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Hero Right Graphic - High-Fidelity Interactive Overlay Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card p-4 rounded-[2.5rem] w-full max-w-sm relative animate-float">
                
                {/* Floating Badge top right */}
                <div className="absolute -top-4 -right-4 glass-card-dense p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center">
                    <Bolt className="w-5 h-5 text-secondary animate-bounce" />
                  </div>
                  <div>
                    <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">CURRENT LEVEL</p>
                    <p className="text-lg font-display font-black text-secondary">Elite 84%</p>
                  </div>
                </div>

                {/* Primary Athlete Image */}
                <div className="rounded-3xl overflow-hidden aspect-[4/5] relative" id="photo-container-athlete">
                  <img 
                    alt="Elite Fitness Athlete" 
                    className="w-full h-full object-cover select-none"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl4N5nRAolJ67KNrn9kaHHVdeTIPbOMRZBasWUCAYmqY8gAKtz4NSMdxr6lcSy3nbm-I3jmOlOr7xsIv2pC-tMFSP-uXzN6vImIIe53dNsDGM2nlUB0j3qothGQs25gbltPVZ2Y9fPLXgB3Ta6ecIuSelXDiI7f9CX6yDYo4crt1dda5E8w264STUA84GXC7cqFy2wWtbVJ-jEgSIT427FzbLwD8wEutcpuoFv3qklT7gwSWhel3sRneDnkBFPqXGIBjXMAgLO8Q"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-65" />
                </div>

                {/* Floating Badge bottom left */}
                <div className="absolute -bottom-4 -left-4 glass-card-dense p-4 rounded-2xl shadow-2xl z-20 max-w-[190px]">
                  <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase mb-1">Weekly Goal</p>
                  <div className="w-28 bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                    <div className="h-full energy-gradient w-[75%]" />
                  </div>
                  <p className="text-xs font-semibold text-on-surface">Daily Goal: 75%</p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest text-primary mb-2 uppercase">WHY FITSKILL</p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-on-surface">Precision Features for Precision Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Feature 1 (Large Panel Web-Assessment) */}
            <div className="md:col-span-8 glass-card p-8 rounded-[2rem] flex flex-col sm:flex-row gap-8 items-center hover:border-primary/30 transition-all duration-300">
              <div className="flex-1 space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Bolt className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-on-surface">Fitness Assessment</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-normal">
                  Our 360° clinical-grade assessment evaluates your mobility, strength, and endurance through computer vision analysis and user vitals.
                </p>
                <button 
                  onClick={() => setCurrentTab('assessment')}
                  className="inline-flex items-center gap-2 text-primary text-xs font-extrabold group/btn hover:underline cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex-1 w-full h-44 bg-surface-variant/30 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
                <div className="w-28 h-28 rounded-full border-8 border-primary/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-2xl font-display font-black text-primary">88</span>
                </div>
              </div>
            </div>

            {/* Feature 2 (Small Panel AI Coach) */}
            <div className="md:col-span-4 glass-card p-6 rounded-[2rem] flex flex-col justify-between text-left hover:border-secondary/35 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-on-surface">AI Coach</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-normal">
                  Real-time adaptive feedback that adjusts your intensity levels, reps, and running thresholds based on biometric metrics.
                </p>
              </div>
              <div className="pt-6 text-xs text-secondary font-bold inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                <span>Continuous Personalization Active</span>
              </div>
            </div>

            {/* Feature 3 (Small Panel Skill Challenges) */}
            <div className="md:col-span-4 glass-card p-6 rounded-[2rem] flex flex-col justify-between text-left hover:border-tertiary/35 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-on-surface">Skill Challenges</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-normal">
                  Gamified milestones that push you beyond your perceived limit. Compete with 50,000+ elite athletes in global skill brackets.
                </p>
              </div>
              <div className="pt-6 font-display text-sm font-semibold text-tertiary">
                Next bracket starts in 1d 12h
              </div>
            </div>

            {/* Feature 4 (Large Panel Progress Analytics) */}
            <div className="md:col-span-8 glass-card p-8 rounded-[2rem] flex flex-col sm:flex-row-reverse gap-8 items-center hover:border-primary/30 transition-all duration-300">
              <div className="flex-1 space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-on-surface">Progress Analytics</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-normal">
                  Deep-dive into metabolic health, force production curves, and recovery metrics with beautiful glassmorphic analytics.
                </p>
                <button 
                  onClick={() => setCurrentTab('analytics')}
                  className="inline-flex items-center gap-2 text-primary text-xs font-extrabold group/btn hover:underline cursor-pointer"
                >
                  <span>View Dashboards</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex-1 w-full space-y-4" id="visualizer-tracks">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                    <span>Cardio Endurance</span>
                    <span>80%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full flow-gradient rounded-full w-[80%]" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                    <span>Explosive Strength</span>
                    <span>66%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full w-[66%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                    <span>Flexibility Rating</span>
                    <span>50%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full w-[50%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto glass-card p-10 sm:p-14 rounded-[3rem] border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-[50px] pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-on-surface mb-4">Ready to Level Up?</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-lg mx-auto">
              Join 50,000+ elite athletes who are optimizing their physiological performance through clinical assessment telemetry metrics.
            </p>
            <button
              onClick={() => setCurrentTab('assessment')}
              className="px-12 py-5 flow-gradient hover:scale-[1.03] hover:opacity-95 text-on-primary-container font-black rounded-2xl shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              Start Your Assessment
            </button>
          </div>
        </section>

      </div>

      {/* WATCH DEMO POPUP MODAL */}
      {showDemoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/90 backdrop-blur-md" 
          onClick={() => setShowDemoModal(false)}
        >
          <div 
            className="glass-card-dense p-6 rounded-3xl max-w-xl w-full border border-primary/20 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-display font-black text-on-surface flex items-center gap-2">
                <Play className="w-5 h-5 text-secondary" />
                <span>FitSkill Assessment Tutorial</span>
              </h3>
              <button 
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Visual Screen placeholder */}
            <div className="aspect-video font-sans flex flex-col items-center justify-center bg-surface-container-lowest rounded-2xl border border-white/5 relative overflow-hidden p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-primary/10 opacity-40 pointer-events-none" />
              <div className="w-16 h-16 rounded-full flow-gradient flex items-center justify-center text-on-primary mb-4 animate-float shadow-lg">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <h4 className="font-semibold text-on-surface text-sm mb-1">Self-Guided Clinical Assesment</h4>
              <p className="text-xs text-on-surface-variant max-w-sm">
                Watch how proprietary computer-vision models calculate mobility limits, VO2 thresholds, and cardiovascular metrics on the go.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-3 bg-white/5 rounded-xl text-center space-y-1">
                <Check className="w-4 h-4 text-secondary mx-auto" />
                <p className="text-[10px] text-on-surface font-semibold">1. Vitals entry</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-center space-y-1">
                <Check className="w-4 h-4 text-secondary mx-auto" />
                <p className="text-[10px] text-on-surface font-semibold">2. Live calibration</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-center space-y-1">
                <Check className="w-4 h-4 text-secondary mx-auto" />
                <p className="text-[10px] text-on-surface font-semibold">3. Skill profile load</p>
              </div>
            </div>

            <p className="text-[10px] text-on-surface-variant text-center pt-2 italic">
              Ready to start? Exit this modal and click "Get Started" to launch your clinical evaluation!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
