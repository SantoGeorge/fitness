export type TabType = 'home' | 'assessment' | 'analytics' | 'profile';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  level: string;
  streakDays: number;
  badgesCount: number;
  metricUnits: boolean; // true = metric, false = imperial
  darkMode: boolean;
  subscription: 'free' | 'pro' | 'elite';
}

export interface VitalMetrics {
  restingHeartRate: number; // BPM
  pushUpsCount: number;     // reps
  plankDuration: string;    // MM:SS
  runningTime: string;      // MM:SS
  runningDistance: string;  // "1 KM" or "5 KM"
  gripStrength: number;     // KG
}

export interface SkillProfile {
  strength: number;
  endurance: number;
  power: number;
  agility: number;
  mobility: number;
  balance: number;
}

export interface ActiveClass {
  id: string;
  title: string;
  category: 'HIIT' | 'YOGA' | 'STRENGTH';
  durationMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  imageAlt: string;
}

export interface CoachInsight {
  quote: string;
  focusArea: string;
  recommendations: Array<{
    title: string;
    type: string;
    imageUrl: string;
    duration: string;
  }>;
}

export interface GoalProgress {
  steps: { current: number; target: number };
  water: { current: number; target: number }; // ml
  sleep: { current: number; target: number }; // minutes
  stand: { current: number; target: number }; // hours
}
