import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CopyPasteDetection, UserProgress } from '@/types';

interface AppContextType {
  code: string;
  setCode: (code: string) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  copyPasteAlert: CopyPasteDetection;
  setCopyPasteAlert: (alert: CopyPasteDetection) => void;
  pendingPaste: string | null;
  setPendingPaste: (paste: string | null) => void;
  confusionDetected: string | null;
  setConfusionDetected: (topic: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState(`// Welcome to DevAssistant! 
// Start coding and I'll help you learn.

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Developer"));
`);

  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedTopics: [],
    quizScores: {},
    currentStreak: 3,
    totalPoints: 150
  });

  const [copyPasteAlert, setCopyPasteAlert] = useState<CopyPasteDetection>({ detected: false });
  const [pendingPaste, setPendingPaste] = useState<string | null>(null);
  const [confusionDetected, setConfusionDetected] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{
      code,
      setCode,
      userProgress,
      setUserProgress,
      copyPasteAlert,
      setCopyPasteAlert,
      pendingPaste,
      setPendingPaste,
      confusionDetected,
      setConfusionDetected,
      sidebarOpen,
      setSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};