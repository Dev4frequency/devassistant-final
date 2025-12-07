import React, { useState } from 'react';
import { AlertTriangle, BookOpen, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UnderstandingQuestion } from '@/types';
import { cn } from '@/lib/utils';

interface CopyPasteGuardProps {
  isOpen: boolean;
  pastedCode: string;
  questions: UnderstandingQuestion[];
  onClose: () => void;
  onRedirectToModule: (moduleId: string) => void;
  onAllowPaste: () => void;
}

export const CopyPasteGuard: React.FC<CopyPasteGuardProps> = ({
  isOpen,
  pastedCode,
  questions,
  onClose,
  onRedirectToModule,
  onAllowPaste
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [passed, setPassed] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Simple check - if all answers are non-empty, consider it passed
      const allAnswered = newAnswers.every(a => a.trim().length > 10);
      setPassed(allAnswered);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setPassed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg glass-panel p-6 animate-scale-in glow-warning">
        {/* Warning Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Copy-Paste Detected!</h2>
            <p className="text-sm text-muted-foreground">Let's make sure you understand this code</p>
          </div>
        </div>

        {/* Code Preview */}
        <div className="bg-code-bg rounded-lg p-3 mb-6 max-h-32 overflow-auto">
          <pre className="text-xs font-mono text-muted-foreground">
            {pastedCode.slice(0, 200)}{pastedCode.length > 200 ? '...' : ''}
          </pre>
        </div>

        {!showResult ? (
          <>
            {/* Progress */}
            <div className="flex gap-1 mb-4">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= currentQuestion ? "bg-warning" : "bg-muted"
                  )}
                />
              ))}
            </div>

            {/* Question */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <p className="text-foreground font-medium mb-4">
                {questions[currentQuestion]?.question}
              </p>
              
              <textarea
                className="w-full bg-muted rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-warning min-h-[100px] resize-none"
                placeholder="Type your answer here..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    e.preventDefault();
                    const target = e.target as HTMLTextAreaElement;
                    if (target.value.trim()) {
                      handleAnswer(target.value);
                      target.value = '';
                    }
                  }
                }}
              />
              
              <p className="text-xs text-muted-foreground mt-2">
                Press Shift + Enter to submit
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => onRedirectToModule(questions[currentQuestion]?.moduleId)}
                className="flex-1"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Learn This First
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  const textarea = document.querySelector('textarea');
                  if (textarea && textarea.value.trim()) {
                    handleAnswer(textarea.value);
                    textarea.value = '';
                  }
                }}
                className="flex-1"
              >
                Submit Answer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Result */}
            <div className={cn(
              "text-center p-6 rounded-xl mb-6",
              passed ? "bg-success/20" : "bg-destructive/20"
            )}>
              {passed ? (
                <>
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Great Understanding!</h3>
                  <p className="text-sm text-muted-foreground">
                    You've shown you understand this code. Keep up the great work!
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Let's Learn More</h3>
                  <p className="text-sm text-muted-foreground">
                    It seems like you might benefit from reviewing this topic first.
                  </p>
                </>
              )}
            </div>

            {/* Result Actions */}
            <div className="flex gap-3">
              {passed ? (
                <>
                  <Button variant="ghost" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={onAllowPaste} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Use This Code
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={resetQuiz} className="flex-1">
                    Try Again
                  </Button>
                  <Button 
                    variant="warning"
                    onClick={() => onRedirectToModule(questions[0]?.moduleId)}
                    className="flex-1"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Go to Learning Module
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
