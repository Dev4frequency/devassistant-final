export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  examples: CodeExample[];
  quiz: Quiz | null;
  completed: boolean;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeContext?: string;
}

export interface CopyPasteDetection {
  detected: boolean;
  originalCode?: string;
  pastedCode?: string;
  similarity?: number;
  questions?: UnderstandingQuestion[];
}

export interface UnderstandingQuestion {
  id: string;
  question: string;
  relatedTopic: string;
  moduleId: string;
}

export interface UserProgress {
  completedTopics: string[];
  quizScores: Record<string, number>;
  currentStreak: number;
  totalPoints: number;
}
