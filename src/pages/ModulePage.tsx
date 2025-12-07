import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, BookOpen, Code2, Trophy, Play, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { learningModules } from '@/data/learningModules';
import { useApp } from '@/context/AppContext';
import { Topic, QuizQuestion } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { userProgress, setUserProgress, setCode, confusionDetected, setConfusionDetected } = useApp();
  
  const module = learningModules.find(m => m.id === moduleId);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Auto-select topic if coming from confusion detection
  useEffect(() => {
    if (confusionDetected && module) {
      const relatedTopic = module.topics[0];
      if (relatedTopic) {
        setSelectedTopic(relatedTopic);
        toast.success(`Redirected to ${module.title} to help you understand better!`);
        setConfusionDetected(null);
      }
    }
  }, [confusionDetected, module, setConfusionDetected]);

  if (!module) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Module Not Found</h2>
            <Button asChild>
              <Link to="/learn">Back to Learning</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    setShowResults(true);
    if (selectedTopic) {
      handleTopicComplete(selectedTopic.id);
    }
  };

  const handleTopicComplete = (topicId: string) => {
    if (!userProgress.completedTopics.includes(topicId)) {
      setUserProgress(prev => ({
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
        totalPoints: prev.totalPoints + 25
      }));
      toast.success('+25 points! Great job!');
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

  const tryInEditor = (code: string) => {
    setCode(code);
    navigate('/editor');
    toast.success('Code loaded in editor!');
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
  };

  const goToNextTopic = () => {
    if (!selectedTopic || !module) return;
    const currentIndex = module.topics.findIndex(t => t.id === selectedTopic.id);
    if (currentIndex < module.topics.length - 1) {
      setSelectedTopic(module.topics[currentIndex + 1]);
      resetQuiz();
    }
  };

  const goToPrevTopic = () => {
    if (!selectedTopic || !module) return;
    const currentIndex = module.topics.findIndex(t => t.id === selectedTopic.id);
    if (currentIndex > 0) {
      setSelectedTopic(module.topics[currentIndex - 1]);
      resetQuiz();
    }
  };

  // Topic View
  if (selectedTopic) {
    const currentIndex = module.topics.findIndex(t => t.id === selectedTopic.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < module.topics.length - 1;

    return (
      <Layout>
        <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedTopic(null);
                  resetQuiz();
                }}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {module.title}
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevTopic}
                  disabled={!hasPrev}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground px-2">
                  {currentIndex + 1} / {module.topics.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextTopic}
                  disabled={!hasNext}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Topic Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">{selectedTopic.title}</h1>
              <p className="text-muted-foreground">{module.title} • {module.difficulty}</p>
            </div>

            {/* Content */}
            <div className="glass-panel p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Concept</h3>
              </div>
              <div className="prose prose-invert max-w-none">
                {selectedTopic.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground mb-3 leading-relaxed">
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-ai" />
                    <h3 className="font-semibold text-foreground">{example.title}</h3>
                  </div>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => tryInEditor(example.code)}
                    className="gap-2"
                  >
                    <Play className="w-3 h-3" />
                    Try in Editor
                  </Button>
                </div>
                <pre className="bg-code-bg rounded-lg p-4 overflow-x-auto mb-4">
                  <code className="text-sm font-mono text-foreground whitespace-pre-wrap">{example.code}</code>
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

                <div className="flex gap-3 mt-6">
                  {!showResults ? (
                    <Button 
                      onClick={submitQuiz}
                      className="flex-1"
                      disabled={Object.keys(quizAnswers).length !== selectedTopic.quiz.questions.length}
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={resetQuiz} className="flex-1">
                        Retry Quiz
                      </Button>
                      {hasNext && (
                        <Button onClick={goToNextTopic} className="flex-1 gap-2">
                          Next Topic
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* No quiz - just navigation */}
            {!selectedTopic.quiz && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleTopicComplete(selectedTopic.id)}
                  className="flex-1 gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Complete
                </Button>
                {hasNext && (
                  <Button onClick={goToNextTopic} className="flex-1 gap-2">
                    Next Topic
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // Module Overview
  return (
    <Layout>
      <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto animate-fade-in">
          {/* Back */}
          <Button variant="ghost" asChild className="mb-6 gap-2">
            <Link to="/learn">
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </Link>
          </Button>

          {/* Module Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-5xl">
              {module.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{module.title}</h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
            <div className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              module.difficulty === 'beginner' && "bg-success/20 text-success",
              module.difficulty === 'intermediate' && "bg-warning/20 text-warning",
              module.difficulty === 'advanced' && "bg-destructive/20 text-destructive"
            )}>
              {module.difficulty}
            </div>
          </div>

          {/* Progress */}
          <div className="glass-panel p-4 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="text-foreground font-medium">
                {module.topics.filter(t => userProgress.completedTopics.includes(t.id)).length} / {module.topics.length} topics
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full gradient-primary transition-all duration-500"
                style={{ 
                  width: `${(module.topics.filter(t => userProgress.completedTopics.includes(t.id)).length / module.topics.length) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Topics */}
          <h2 className="text-xl font-semibold text-foreground mb-4">Topics</h2>
          <div className="space-y-3">
            {module.topics.map((topic, index) => {
              const isCompleted = userProgress.completedTopics.includes(topic.id);
              
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="w-full glass-panel p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </div>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-foreground">{topic.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {topic.examples.length} example{topic.examples.length !== 1 ? 's' : ''}
                      {topic.quiz ? ' • Quiz included' : ''}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
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

export default ModulePage;