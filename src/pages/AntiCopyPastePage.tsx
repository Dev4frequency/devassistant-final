import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, BookOpen, CheckCircle, Brain, ArrowRight, Code2, Copy, Eye } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CopyPasteGuard } from '@/components/CopyPasteGuard';
import { cn } from '@/lib/utils';

const AntiCopyPastePage = () => {
  const [showDemo, setShowDemo] = useState(false);

  const demoQuestions = [
    {
      id: 'demo-q1',
      question: 'What type of loop is used in this code, and why might it be the best choice here?',
      relatedTopic: 'Loops & Iteration',
      moduleId: 'loops'
    },
    {
      id: 'demo-q2',
      question: 'What would happen if you changed the loop condition? Explain the potential consequences.',
      relatedTopic: 'Loop Conditions',
      moduleId: 'loops'
    }
  ];

  const demoCode = `for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i];
  }
}`;

  const features = [
    {
      icon: Eye,
      title: 'Pattern Detection',
      description: 'Identifies complex code structures, multiple functions, and patterns that suggest copied code.'
    },
    {
      icon: AlertTriangle,
      title: 'Understanding Check',
      description: 'Asks targeted questions about the pasted code to verify genuine understanding.'
    },
    {
      icon: BookOpen,
      title: 'Learning Redirection',
      description: 'Guides users to relevant learning modules when they need to build foundational knowledge.'
    },
    {
      icon: CheckCircle,
      title: 'Smart Approval',
      description: 'Allows code usage once understanding is demonstrated, rewarding genuine comprehension.'
    }
  ];

  const detectionTypes = [
    {
      title: 'Multi-line Code Blocks',
      description: 'Code pastes with more than 10 lines are flagged for review',
      example: 'Long function implementations, class definitions'
    },
    {
      title: 'Complex Patterns',
      description: 'Algorithms, recursive functions, and advanced structures trigger questions',
      example: 'Sorting algorithms, tree traversals'
    },
    {
      title: 'External Imports',
      description: 'Import statements suggest code from external sources',
      example: 'import statements, require calls'
    },
    {
      title: 'Uncommented Code',
      description: 'Complex logic without explanatory comments raises flags',
      example: 'Dense algorithmic code without documentation'
    }
  ];

  return (
    <Layout>
      <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Anti Copy-Paste Guard
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Learn, Don't Just Copy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent detection system ensures you truly understand the code you use, 
              helping you become a better developer through genuine comprehension.
            </p>
          </div>

          {/* Demo CTA */}
          <div className="glass-panel p-8 mb-12 text-center glow-warning">
            <div className="w-20 h-20 rounded-2xl bg-warning/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-warning" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              See It In Action
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Experience how the copy-paste detection works. Try pasting code in the editor or see a demonstration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setShowDemo(true)} variant="warning" size="lg" className="gap-2">
                <AlertTriangle className="w-5 h-5" />
                View Demo
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/editor">
                  <Code2 className="w-5 h-5" />
                  Try in Editor
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, i) => (
              <div key={i} className="glass-panel p-6">
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* What Gets Detected */}
          <div className="glass-panel p-6 mb-12">
            <h3 className="font-semibold text-foreground mb-6">What Gets Detected?</h3>
            <div className="space-y-4">
              {detectionTypes.map((type, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{type.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Example: {type.example}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Helps */}
          <div className="glass-panel p-6 mb-12">
            <h3 className="font-semibold text-foreground mb-6">How It Helps You Learn</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-lg font-bold text-primary-foreground">
                  1
                </div>
                <h4 className="font-medium text-foreground mb-2">Forces Understanding</h4>
                <p className="text-sm text-muted-foreground">
                  By answering questions about the code, you actively engage with the concepts.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-lg font-bold text-primary-foreground">
                  2
                </div>
                <h4 className="font-medium text-foreground mb-2">Builds Foundation</h4>
                <p className="text-sm text-muted-foreground">
                  When gaps are detected, you're guided to foundational lessons first.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-lg font-bold text-primary-foreground">
                  3
                </div>
                <h4 className="font-medium text-foreground mb-2">Rewards Effort</h4>
                <p className="text-sm text-muted-foreground">
                  Once you demonstrate understanding, you can use the code with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Ready to start learning the right way?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gap-2">
                <Link to="/editor">
                  <Code2 className="w-5 h-5" />
                  Open Code Editor
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/learn">
                  <BookOpen className="w-5 h-5" />
                  Explore Learning Path
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <CopyPasteGuard
        isOpen={showDemo}
        pastedCode={demoCode}
        questions={demoQuestions}
        onClose={() => setShowDemo(false)}
        onRedirectToModule={(moduleId) => {
          setShowDemo(false);
          window.location.href = `/learn/${moduleId}`;
        }}
        onAllowPaste={() => setShowDemo(false)}
      />
    </Layout>
  );
};

export default AntiCopyPastePage;