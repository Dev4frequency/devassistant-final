import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Trophy, Flame, Star, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { LearningSidebar } from '@/components/LearningSidebar';
import { learningModules } from '@/data/learningModules';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const LearnPage = () => {
  const { userProgress } = useApp();

  return (
    <Layout 
      showSidebar 
      sidebar={
        <LearningSidebar
          modules={learningModules}
          selectedModuleId={null}
          onSelectModule={() => {}}
          userProgress={userProgress}
        />
      }
    >
      <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Learning Path
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Master Programming Concepts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured lessons with interactive examples, explanations, and quizzes to help you truly understand programming.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="glass-panel p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-foreground">{userProgress.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="glass-panel p-6 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-destructive" />
              <div className="text-2xl font-bold text-foreground">{userProgress.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="glass-panel p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{userProgress.completedTopics.length}</div>
              <div className="text-sm text-muted-foreground">Topics Done</div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="space-y-4">
            {learningModules.map((module, index) => {
              const completedTopicsCount = module.topics.filter(t => 
                userProgress.completedTopics.includes(t.id)
              ).length;
              const progressPercent = Math.round((completedTopicsCount / module.topics.length) * 100);

              return (
                <Link
                  key={module.id}
                  to={`/learn/${module.id}`}
                  className="glass-panel p-6 flex items-center gap-6 group hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl flex-shrink-0">
                    {module.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold text-foreground">{module.title}</h3>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        module.difficulty === 'beginner' && "bg-success/20 text-success",
                        module.difficulty === 'intermediate' && "bg-warning/20 text-warning",
                        module.difficulty === 'advanced' && "bg-destructive/20 text-destructive"
                      )}>
                        {module.difficulty}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
                    
                    {/* Progress bar */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-primary transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {completedTopicsCount}/{module.topics.length} topics
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              );
            })}
          </div>

          {/* Learning Tips */}
          <div className="mt-12 glass-panel p-6">
            <h3 className="font-semibold text-foreground mb-4">💡 Learning Tips</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Complete lessons in order for the best learning experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Try the code examples yourself in the Code Editor</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Take quizzes to test your understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Ask the AI Assistant when you're stuck</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearnPage;