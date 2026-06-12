import React, { useState } from 'react';
import { 
  Sparkles, ChevronRight, TrendingUp, TrendingDown, Target, Brain, Shield, Info, Dumbbell, Award, Flame, Timer
} from 'lucide-react';
import { VitalMetrics, TabType } from '../types';

interface AnalyticsProps {
  metrics: VitalMetrics;
  setCurrentTab: (tab: TabType) => void;
}

export default function Analytics({ metrics, setCurrentTab }: AnalyticsProps) {
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);

  // Dynamically compute dimensions based on actual metrics entry!
  const getRadarValues = () => {
    // scale metrics factors into percentages
    const str = Math.min(Math.max((metrics.gripStrength || 45) * 1.6, 30), 100);
    const end = Math.min(Math.max((metrics.pushUpsCount || 25) * 1.8, 30), 100);
    const mbl = 75; // baseline mobility
    const pwr = Math.round(str * 0.9);
    const agl = 85; // baseline agility
    const bal = 80; // baseline balance

    return {
      Strength: str,
      Endurance: end,
      Power: pwr,
      Agility: agl,
      Mobility: mbl,
      Balance: bal
    };
  };

  const radarData = getRadarValues();

  // Create coordinates for a hexagonal SVG Radar map centering at (50, 50) with radius 40
  const getPentagonPoints = (values: typeof radarData) => {
    const keys = Object.keys(values) as Array<keyof typeof radarData>;
    const center = 50;
    const maxRadius = 40;

    return keys.map((key, i) => {
      const angle = (i * 2 * Math.PI) / 6; // 6-axis hexagon
      const val = values[key] / 100;
      const x = center + maxRadius * val * Math.cos(angle);
      const y = center + maxRadius * val * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activePolygonPoints = getPentagonPoints(radarData);

  return (
    <div className="pt-8 pb-20 max-w-7xl mx-auto px-6 space-y-8 font-sans text-left transition-all">
      
      {/* Header telemetry rating */}
      <section className="relative flex flex-col items-center justify-center py-10 overflow-hidden rounded-[2.5rem] bg-surface-container/20 border border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full animate-pulse-glow" />
        </div>
        
        <div className="relative z-10 text-center space-y-2">
          <p className="text-[10px] font-sans font-bold tracking-widest text-secondary uppercase">
            Overall AI Fitness Rating
          </p>
          <div className="flex items-baseline justify-center">
            <span className="text-6xl sm:text-7xl font-display font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary animate-float">
              88
            </span>
            <span className="text-3xl font-display font-semibold text-primary/45">/100</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20 text-xs">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <p className="text-on-surface-variant font-medium">
              <span className="text-white font-bold">+4.2%</span> from last assessment
            </p>
          </div>
        </div>
      </section>

      {/* Grid: Skill Profile Radar & Coach recommendation card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Chart Panel */}
        <div className="glass-card lg:col-span-8 p-6 sm:p-8 rounded-[2.5rem] flex flex-col items-center border border-white/10 hover:border-white/15 transition-all">
          <h2 className="text-xl font-display font-bold self-start mb-6 text-on-surface flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Physiological Skill Profile</span>
          </h2>

          {/* Interactive SVG Radar Map */}
          <div className="relative w-full aspect-square max-w-[340px]" id="radar-visualizer-container">
            <svg 
              className="w-full h-full transform -rotate-90 select-none drop-shadow-lg" 
              viewBox="0 0 100 100"
            >
              {/* Concentric Hexagonal Guidelines */}
              {[40, 30, 20, 10].map((r, i) => {
                const points = Array.from({ length: 6 }).map((_, j) => {
                  const angle = (j * 2 * Math.PI) / 6;
                  return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                }).join(' ');
                
                return (
                  <polygon 
                    key={i} 
                    points={points} 
                    fill="none" 
                    stroke="rgba(140, 144, 159, 0.15)" 
                    strokeWidth="0.8" 
                  />
                );
              })}

              {/* Six Axes Lines */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 2 * Math.PI) / 6;
                return (
                  <line 
                    key={i} 
                    x1="50" 
                    y1="50" 
                    x2={50 + 40 * Math.cos(angle)} 
                    y2={50 + 40 * Math.sin(angle)} 
                    stroke="rgba(140, 144, 159, 0.2)" 
                    strokeWidth="0.8" 
                  />
                );
              })}

              {/* Dynamic Active Polygons based on actual metric equations */}
              <polygon 
                points={activePolygonPoints} 
                fill="rgba(173, 198, 255, 0.25)" 
                stroke="#adc6ff" 
                strokeWidth="1.5" 
                className="transition-all duration-700 ease-in-out"
              />

              {/* Highlight Vector Vertice Markers */}
              {activePolygonPoints.split(' ').map((point, i) => {
                const [x, y] = point.split(',').map(Number);
                return (
                  <circle 
                    key={i} 
                    cx={x} 
                    cy={y} 
                    r="2" 
                    fill="#4edea3" 
                    stroke="#ffffff" 
                    strokeWidth="0.8" 
                    className="hover:scale-150 transition-transform cursor-pointer"
                  />
                );
              })}
            </svg>

            {/* Hexagonal Node Labels */}
            <div className="absolute inset-x-0 inset-y-0 w-full h-full flex items-center justify-center pointer-events-none text-[9px] sm:text-[10px]" id="radar-nodes-labels">
              <span className="absolute top-1 font-sans font-bold text-on-surface-variant uppercase tracking-widest">Strength</span>
              <span className="absolute top-1/4 right-0 font-sans font-bold text-on-surface-variant uppercase tracking-widest pl-4">Endurance</span>
              <span className="absolute bottom-1/4 right-0 font-sans font-bold text-on-surface-variant uppercase tracking-widest pl-4">Power</span>
              <span className="absolute bottom-1 font-sans font-bold text-on-surface-variant uppercase tracking-widest">Agility</span>
              <span className="absolute bottom-1/4 left-0 font-sans font-bold text-on-surface-variant uppercase tracking-widest pr-4">Mobility</span>
              <span className="absolute top-1/4 left-0 font-sans font-bold text-on-surface-variant uppercase tracking-widest pr-4">Balance</span>
            </div>
          </div>

          {/* Core highlevel indicators */}
          <div className="grid grid-cols-2 gap-4 w-full mt-6" id="peak-and-growth-panel">
            <div className="p-4 rounded-xl bg-surface-container-high/60 border border-white/5 text-left">
              <p className="text-[10px] font-sans font-bold text-primary mb-1 tracking-widest uppercase">Peak Skill</p>
              <p className="text-lg font-display font-black text-white">Endurance</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-high/60 border border-white/5 text-left">
              <p className="text-[10px] font-sans font-bold text-secondary mb-1 tracking-widest uppercase">Growth Area</p>
              <p className="text-lg font-display font-black text-white font-semibold">Mobility</p>
            </div>
          </div>
        </div>

        {/* AI Column Segment split 4 layout */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* AI Coach Container */}
          <div className="glass-card p-6 rounded-[2rem] relative overflow-hidden flex-1 border border-white/10 hover:border-white/15 transition-all">
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-tertiary/10 rounded-full blur-xl animate-pulse" />
            
            <div className="flex items-center gap-3 mb-4 text-left">
              <div className="w-10 h-10 rounded-xl flow-gradient flex items-center justify-center text-on-primary">
                <Brain className="w-5 h-5 shadow-sm" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-on-surface leading-tight">AI Coach Recommendations</h2>
                <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold tracking-wider uppercase">
                  <span>Gemini Calibrated</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans font-normal text-on-surface-variant mb-6 leading-relaxed text-left border-l-2 border-secondary/40 pl-3">
              "Your power output has increased by <span className="text-secondary font-bold">12%</span> following your recent plyometric entries. To further optimize metabolic metrics, we recommend focusing on <span className="text-secondary font-bold">explosive agility</span> drills as detailed below."
            </p>

            <div className="space-y-3" id="coach-active-actions">
              
              {/* Routine 1 */}
              <div 
                onClick={() => setSelectedRoutine('Explosive Agility Routine')}
                className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-xl hover:bg-white/5 transition-all text-left border border-transparent hover:border-white/5"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-highest shrink-0 border border-white/5">
                  <img 
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtRZMur7ajOQ05-NVUvUD9-1ClV2yXmtHQ18U46fR35u-ZmzTc56OHAVU66eEZz7rmLXIb3Ef4BFlqsuqQrPIrjg0Dm_yb3w4QhRk9OjyqzsMgIRPBbn0Bn4Tsm8mBPU816QqLk9HNN_HfbrFCOZjh5Hklfa-jcySZgXsh-YRj-Knc5LreKUmWZKJgNIpltfA7v2_jUEABNivPnEayupHOjeOsh81L8AfDgut-f8LCKEak2fRbOi1BGXlquSxE9usLqEfIgDL55w"
                    alt="Box jumps athlete"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-sans font-bold text-on-surface">Explosive Agility</p>
                  <p className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">Recommended Routine</p>
                </div>
                <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* Routine 2 */}
              <div 
                onClick={() => setSelectedRoutine('Zone 2 Active Recovery Interval')}
                className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-xl hover:bg-white/5 transition-all text-left border border-transparent hover:border-white/5"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-highest shrink-0 border border-white/5">
                  <img 
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEFoM5n0b0c5ibStG7OuFsoTJbT6K5jsYbVW9q2_MC40Q1qXdsWDPxcOiGlXFEmDtyuSQqDDH5gQuH654Z1iUPGIHXuJiwt9Ti1wIIryfaoeOgaOgQxPPvnhvZxhy8PVfGhNqq0_6c3Jasosh5bqjOelhB4EB4tjqxcXuM7j6hWQUX0UDAnSdTeYaZmlIraAZELmSJGmVBWnZhrfpOIjfYdv4LxUVH1bXmowIqg7DFLQH1PVSxulCjW1J5YAUFL_XQA3n7BJC01A"
                    alt="Active stride running shoes"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-sans font-bold text-on-surface">Zone 2 Recovery</p>
                  <p className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">Active Rest Session</p>
                </div>
                <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
              </div>

            </div>
          </div>

          {/* Skill Metrics Panel */}
          <div className="glass-card p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all text-left">
            <h3 className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase mb-4">
              PHYSIOLOGY METRICS
            </h3>
            
            <div className="space-y-4">
              
              {/* Muscle index strength progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-on-surface">Absolute Strength</span>
                  <div className="flex items-end gap-1 font-display">
                    <span className="text-base font-black text-white">92</span>
                    <span className="text-[10px] text-secondary pb-0.5 font-bold flex items-center">▲ 3</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Flexibility metrics */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-on-surface">Mobility & Flex</span>
                  <div className="flex items-end gap-1 font-display">
                    <span className="text-base font-black text-white">64</span>
                    <span className="text-[10px] text-error pb-0.5 font-bold flex items-center">▼ 1</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container" style={{ width: '64%' }} />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Benchmarked Results Section (Desktop grid layout) */}
      <section className="space-y-4">
        <h2 className="text-lg font-display font-black text-on-surface">Benchmarked Clinical Results</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="glass-card p-5 rounded-2xl text-center border border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all">
            <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">VO2 Max Level</p>
            <p className="text-2xl font-display font-black text-secondary my-3">54.2</p>
            <span className="text-[9px] text-on-surface-variant">Top 5% for age bracket</span>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all">
            <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">PWR / WT ratio</p>
            <p className="text-2xl font-display font-black text-primary my-3">4.2w</p>
            <span className="text-[9px] text-on-surface-variant">Elite Class Level</span>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border border-white/5 flex flex-col justify-between hover:border-tertiary/20 transition-all">
            <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">HRV Recovery</p>
            <p className="text-2xl font-display font-black text-tertiary my-3">84ms</p>
            <span className="text-[9px] text-on-surface-variant">Optimal rest response</span>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all">
            <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">Nerve Reaction</p>
            <p className="text-2xl font-display font-black text-secondary my-3">195ms</p>
            <span className="text-[9px] text-on-surface-variant">Pro athletic tier</span>
          </div>

        </div>
      </section>

      {/* Routine Detail Modal */}
      {selectedRoutine && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/90 backdrop-blur-md"
          onClick={() => setSelectedRoutine(null)}
        >
          <div 
            className="glass-card-dense p-6 rounded-[2rem] max-w-sm w-full text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full flow-gradient flex items-center justify-center text-on-primary mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">{selectedRoutine}</h3>
              <p className="text-xs text-on-surface-variant mt-1">Calibrated from assessment data.</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-xl text-left text-xs leading-relaxed space-y-2">
              <p className="font-bold text-primary">Instructions:</p>
              <p className="text-on-surface-variant">1. Rest 3 minutes following the main physical exercises.</p>
              <p className="text-on-surface-variant">2. Perform 4 sets of 15 reps of explosive drills.</p>
              <p className="text-on-surface-variant">3. Focus on horizontal agility limits and lateral speed limits.</p>
            </div>

            <button 
              onClick={() => setSelectedRoutine(null)}
              className="w-full py-3 bg-secondary text-on-secondary font-bold text-xs tracking-wider uppercase rounded-full hover:opacity-90 active:scale-95 transition-all"
            >
              Exit Routine
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
