export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in' | 'visual_choice';

export interface QuizQuestion {
  id: string;
  topicId: number;
  lessonId: number;
  question: string;
  subText?: string;
  diagramType?: 'angle' | 'clock' | 'place_value' | 'shapes' | 'weights' | 'tape_diagram' | 'coins';
  diagramData?: any;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Lesson {
  id: number;
  topicId: number;
  title: string;
  pageRange: string;
  summary: string[];
  keyRules: string[];
  examples: {
    problem: string;
    solution: string;
    note?: string;
  }[];
  interactiveTool?: 'angle_ruler' | 'place_value_board' | 'sum_diff_solver' | 'unit_converter';
}

export interface Topic {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderLight: string;
  lessons: Lesson[];
}

export interface QuizAttempt {
  id: string;
  date: string;
  topicId: number | 'all';
  topicTitle: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    questionText: string;
    userSelectedId: string;
    correctOptionId: string;
    isCorrect: boolean;
  }[];
}

export interface TopicMastery {
  topicId: number;
  topicTitle: string;
  attempted: number;
  correct: number;
  percentage: number;
  status: 'mastered' | 'improving' | 'needs_practice';
  weakConcepts: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  stars: number;
  streakDays: number;
  lastActiveDate: string;
  totalTimeMinutes: number;
  dailyGoalMinutes: number;
  todayMinutes: number;
  unlockedBadges: string[];
  history: QuizAttempt[];
  gameHighScores: {
    pomeloHarvest: number;
    speedMath: number;
    unitRacer: number;
    angleHunter: number;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'quiz' | 'streak' | 'game' | 'mastery';
}
