import React, { useState } from 'react';
import { 
  Heart, Timer, ChevronRight, Info, Award, Circle, ArrowLeft, ArrowRight, Activity, HandMetal, Play
} from 'lucide-react';
import { VitalMetrics, TabType } from '../types';

interface AssessmentFormProps {
  metrics: VitalMetrics;
  setMetrics: (metrics: VitalMetrics) => void;
  setCurrentTab: (tab: TabType) => void;
}

export default function AssessmentForm({ metrics, setMetrics, setCurrentTab }: AssessmentFormProps) {
  // Wizard steps: Step 1 (Welcome), Step 2 (Vital Metrics - shown as screen 2 in mock), Step 3 (Confirmation/Complete)
  const [currentStep, setCurrentStep] = useState(2); 
  const [localMetrics, setLocalMetrics] = useState<VitalMetrics>({ ...metrics });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: keyof VitalMetrics, value: any) => {
    setLocalMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAndContinue = () => {
    // Save to global state
    setMetrics(localMetrics);
    setSaveSuccess(true);
    
    // Smooth transition
    setTimeout(() => {
      setSaveSuccess(false);
      setCurrentTab('home'); // Redirects to tab home (Dashboard displays home context)
      // Switch focus to home dashboard view
    }, 1500);
  };

  return (
    <div className="pt-8 pb-20 px-6 max-w-lg mx-auto w-full font-sans transition-all">
      
      {/* Top Header Navigation for wizard pages */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-display font-black text-primary tracking-widest uppercase">FitSkill assessments</span>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8" id="assessment-progress-indicator">
        <div className="flex justify-between items-end mb-2">
          <p className="text-[10px] font-sans font-bold tracking-widest text-on-surface-variant uppercase">
            Step {currentStep} of 5
          </p>
          <p className="text-[10px] font-sans font-bold text-secondary uppercase">
            {currentStep === 2 ? '40%' : currentStep === 3 ? '60%' : '20%'} Complete
          </p>
        </div>
        <div className="h-[4px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: currentStep === 2 ? '40%' : currentStep === 3 ? '60%' : '20%' }}
          />
        </div>
      </div>

      {/* Instructional Section */}
      <section className="mb-8 text-center" id="vitalmetrics-instruction">
        <h1 className="text-3xl font-display font-black text-on-surface mb-2">Vital Metrics</h1>
        <p className="text-sm text-on-surface-variant leading-relaxed font-normal">
          Enter your current physical performance metrics below to calibrate your personalized training program.
        </p>
      </section>

      {/* Form Fields (Bento-styled Glass Cards) */}
      <div className="space-y-4" id="vitalmetrics-form-grid">
        
        {/* Resting Heart Rate Card */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/25 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-sm text-on-surface leading-tight">Resting Heart Rate</h3>
              <p className="text-[10px] text-on-surface-variant">Measure while seated and relaxed</p>
            </div>
          </div>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 text-on-surface font-semibold text-lg focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-surface-variant" 
              type="number"
              placeholder="72"
              value={localMetrics.restingHeartRate || ''}
              onChange={(e) => handleInputChange('restingHeartRate', parseInt(e.target.value) || 0)}
              id="input-resting-hr"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-sans font-bold text-primary tracking-widest uppercase">
              BPM
            </span>
          </div>
        </div>

        {/* Strength & Endurance grid (Push-ups & Plank) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Push Ups Card */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between hover:border-secondary/25 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-secondary" />
              <h3 className="text-[10px] font-sans font-bold text-on-surface uppercase tracking-wider">Push-ups</h3>
            </div>
            <div className="space-y-2 text-left">
              <input 
                className="w-full bg-surface-container-high border-none rounded-xl py-2 px-3 text-on-surface font-semibold text-lg focus:ring-2 focus:ring-secondary outline-none transition-all placeholder:text-surface-variant" 
                type="number"
                placeholder="25"
                value={localMetrics.pushUpsCount || ''}
                onChange={(e) => handleInputChange('pushUpsCount', parseInt(e.target.value) || 0)}
                id="input-push-ups"
              />
              <span className="block text-[8px] text-on-surface-variant tracking-widest uppercase font-bold">
                REPS / 1 MIN
              </span>
            </div>
          </div>

          {/* Plank Duration Card */}
          <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:border-tertiary/25 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-4 h-4 text-tertiary" />
              <h3 className="text-[10px] font-sans font-bold text-on-surface uppercase tracking-wider">Plank</h3>
            </div>
            <div className="space-y-2 text-left">
              <input 
                className="w-full bg-surface-container-high border-none rounded-xl py-2 px-3 text-on-surface font-semibold text-lg focus:ring-2 focus:ring-tertiary outline-none transition-all placeholder:text-surface-variant" 
                type="text"
                placeholder="02:30"
                value={localMetrics.plankDuration || ''}
                onChange={(e) => handleInputChange('plankDuration', e.target.value)}
                id="input-plank"
              />
              <span className="block text-[8px] text-on-surface-variant tracking-widest uppercase font-bold">
                MM:SS
              </span>
            </div>
          </div>

        </div>

        {/* Running Time Card */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-secondary/25 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-on-surface">Running Time</h3>
            </div>
            <select 
              value={localMetrics.runningDistance}
              onChange={(e) => handleInputChange('runningDistance', e.target.value)}
              className="bg-surface-container-low border border-white/5 text-[10px] font-bold text-on-surface-variant rounded-full px-3 py-1 focus:ring-1 focus:ring-secondary cursor-pointer"
            >
              <option value="1 KM">1 KM</option>
              <option value="5 KM">5 KM</option>
            </select>
          </div>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 text-on-surface font-semibold text-lg focus:ring-2 focus:ring-secondary outline-none transition-all placeholder:text-surface-variant" 
              type="text"
              placeholder="05:15"
              value={localMetrics.runningTime}
              onChange={(e) => handleInputChange('runningTime', e.target.value)}
              id="input-running-time"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-sans font-bold text-secondary tracking-widest uppercase">
              MM:SS
            </span>
          </div>
        </div>

        {/* Grip Strength Card */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-tertiary/25 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
              <HandMetal className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-sm text-on-surface leading-tight">Grip Strength</h3>
              <p className="text-[10px] text-on-surface-variant">Dynamometer reading (dominant hand)</p>
            </div>
          </div>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 text-on-surface font-semibold text-lg focus:ring-2 focus:ring-tertiary outline-none transition-all placeholder:text-surface-variant" 
              type="number"
              step="0.1"
              placeholder="45.0"
              value={localMetrics.gripStrength || ''}
              onChange={(e) => handleInputChange('gripStrength', parseFloat(e.target.value) || 0)}
              id="input-grip-strength"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-sans font-bold text-tertiary tracking-widest uppercase">
              KG
            </span>
          </div>
        </div>

      </div>

      {/* Instructional Subtext Box */}
      <div className="mt-8 p-4 glass-card rounded-xl border-dashed border-primary/30 flex items-start gap-3 text-left">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-on-surface-variant leading-relaxed italic font-normal">
          Data accuracy is essential for "FitSkill" AI to generate your optimal load zones. Ensure you are well-rested before testing. Saving updates will calibrate your score indicators.
        </p>
      </div>

      {/* Continue Action Container (Sticky or Floating layout with state animation) */}
      <div className="mt-10">
        <button 
          onClick={handleSaveAndContinue}
          className="w-full py-4 rounded-full flow-gradient text-on-primary-container font-display font-bold shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 hover:opacity-90 cursor-pointer"
          id="btn-assessment-continue"
        >
          {saveSuccess ? (
            <span className="animate-pulse">Calibrating telemetry data...</span>
          ) : (
            <>
              <span>Calibrate & Save</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Calibrate Success Toast Notification */}
      {saveSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-secondary border border-black/10 px-6 py-3 rounded-full text-xs font-bold text-on-secondary shadow-2xl flex items-center gap-2 z-50">
          <Award className="w-4 h-4 text-on-secondary animate-spin" />
          <span>Biometric load zones updated successfully!</span>
        </div>
      )}

    </div>
  );
}
