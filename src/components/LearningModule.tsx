import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Circle, BookOpen, Code2, Trophy } from 'lucide-react';
import { LearningModule as LearningModuleType, Topic, QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LearningModuleProps {
  module: LearningModuleType;
  onTopicComplete: (topicId: string) => void;
}

export const LearningModule: React.FC<LearningModuleProps> = ({ module, onTopicComplete }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    setShowResults(true);
    if (selectedTopic) {
      onTopicComplete(selectedTopic.id);
    }
  };

  const getScore = () => {
    if (!selectedTopic?.quiz) return 0;
    let correct = 0;
    selectedTopic.quiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / selectedTopic.quiz.questions.length) * 100);
  };

  if (selectedTopic) {
    return (
      <div className="animate-fade-in">
        {/* Topic Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSelectedTopic(null);
              setQuizAnswers({});
              setShowResults(false);
            }}
          >
            ← Back
          </Button>
          <div>
            <h2 className="text-xl font-bold text-foreground">{selectedTopic.title}</h2>
            <p className="text-sm text-muted-foreground">{module.title}</p>
          </div>
        </div>

        {/* Content */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Concept</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            {selectedTopic.content.split('\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground mb-3">
                {paragraph.split('**').map((part, j) => 
                  j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Examples */}
        {selectedTopic.examples.map((example) => (
          <div key={example.id} className="glass-panel p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-ai" />
              <h3 className="font-semibold text-foreground">{example.title}</h3>
            </div>
            <pre className="bg-code-bg rounded-lg p-4 overflow-x-auto mb-4">
              <code className="text-sm font-mono text-foreground">{example.code}</code>
            </pre>
            <p className="text-sm text-muted-foreground">{example.explanation}</p>
          </div>
        ))}

        {/* Quiz */}
        {selectedTopic.quiz && (
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Quick Quiz</h3>
            </div>

            {showResults && (
              <div className={cn(
                "mb-6 p-4 rounded-lg text-center",
                getScore() >= 70 ? "bg-success/20" : "bg-warning/20"
              )}>
                <p className="text-2xl font-bold mb-1">
                  {getScore() >= 70 ? '🎉' : '💪'} {getScore()}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {getScore() >= 70 ? 'Great job! You got it!' : 'Keep practicing, you\'re getting there!'}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {selectedTopic.quiz.questions.map((question, qIndex) => (
                <QuizQuestionCard
                  key={question.id}
                  question={question}
                  questionNumber={qIndex + 1}
                  selectedAnswer={quizAnswers[question.id]}
                  onAnswer={(answer) => handleQuizAnswer(question.id, answer)}
                  showResult={showResults}
                />
              ))}
            </div>

            {!showResults && (
              <Button 
                onClick={submitQuiz}
                className="w-full mt-6"
                disabled={Object.keys(quizAnswers).length !== selectedTopic.quiz.questions.length}
              >
                Submit Answers
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl">
          {module.icon}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">{module.title}</h2>
          <p className="text-sm text-muted-foreground">{module.description}</p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          module.difficulty === 'beginner' && "bg-success/20 text-success",
          module.difficulty === 'intermediate' && "bg-warning/20 text-warning",
          module.difficulty === 'advanced' && "bg-destructive/20 text-destructive"
        )}>
          {module.difficulty}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{module.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary transition-all duration-500"
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-3">
        {module.topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="w-full glass-panel p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors group"
          >
            {topic.completed ? (
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
            <div className="flex-1 text-left">
              <h4 className="font-medium text-foreground">{topic.title}</h4>
              <p className="text-xs text-muted-foreground">
                {topic.examples.length} examples{topic.quiz ? ' • Quiz included' : ''}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

interface QuizQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  selectedAnswer?: number;
  onAnswer: (answer: number) => void;
  showResult: boolean;
}

const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  showResult
}) => {
  return (
    <div>
      <p className="font-medium text-foreground mb-3">
        {questionNumber}. {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let optionClass = "w-full text-left p-3 rounded-lg border transition-all ";
          
          if (showResult) {
            if (isCorrect) {
              optionClass += "border-success bg-success/20 text-foreground";
            } else if (isSelected && !isCorrect) {
              optionClass += "border-destructive bg-destructive/20 text-foreground";
            } else {
              optionClass += "border-border text-muted-foreground";
            }
          } else {
            optionClass += isSelected 
              ? "border-primary bg-primary/20 text-foreground"
              : "border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground";
          }
          
          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswer(index)}
              className={optionClass}
              disabled={showResult}
            >
              <span className="font-mono text-sm mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>
      
      {showResult && selectedAnswer !== undefined && (
        <p className={cn(
          "mt-3 text-sm p-3 rounded-lg",
          selectedAnswer === question.correctAnswer 
            ? "bg-success/10 text-success" 
            : "bg-muted text-muted-foreground"
        )}>
          {question.explanation}
        </p>
      )}
    </div>
  );
};
