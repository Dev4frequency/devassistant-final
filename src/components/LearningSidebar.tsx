import React from 'react';
import { BookOpen, Trophy, Flame, Star } from 'lucide-react';
import { LearningModule } from '@/types';
import { cn } from '@/lib/utils';

interface LearningSidebarProps {
  modules: LearningModule[];
  selectedModuleId: string | null;
  onSelectModule: (moduleId: string) => void;
  userProgress: {
    totalPoints: number;
    currentStreak: number;
    completedTopics: string[];
  };
}

export const LearningSidebar: React.FC<LearningSidebarProps> = ({
  modules,
  selectedModuleId,
  onSelectModule,
  userProgress
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Learning Path</h3>
            <p className="text-xs text-muted-foreground">Master coding concepts</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="glass-panel p-2 text-center">
            <Star className="w-4 h-4 mx-auto mb-1 text-warning" />
            <p className="text-lg font-bold text-foreground">{userProgress.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="glass-panel p-2 text-center">
            <Flame className="w-4 h-4 mx-auto mb-1 text-destructive" />
            <p className="text-lg font-bold text-foreground">{userProgress.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="glass-panel p-2 text-center">
            <Trophy className="w-4 h-4 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold text-foreground">{userProgress.completedTopics.length}</p>
            <p className="text-xs text-muted-foreground">Done</p>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {modules.map((module) => {
          const isSelected = selectedModuleId === module.id;
          const completedCount = module.topics.filter(t => 
            userProgress.completedTopics.includes(t.id)
          ).length;
          
          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={cn(
                "w-full p-3 rounded-xl text-left transition-all",
                isSelected 
                  ? "bg-primary/20 border border-primary" 
                  : "glass-panel hover:bg-accent/50"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{module.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "font-medium truncate",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>
                    {module.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {completedCount}/{module.topics.length} topics
                  </p>
                </div>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                  completedCount === module.topics.length 
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {Math.round((completedCount / module.topics.length) * 100)}%
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-500",
                    isSelected ? "bg-primary" : "bg-muted-foreground"
                  )}
                  style={{ width: `${(completedCount / module.topics.length) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
