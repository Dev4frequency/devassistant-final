import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Code2, HelpCircle, Lightbulb, MessageSquare, ArrowRight, BookOpen, Zap } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { AIAssistant } from '@/components/AIAssistant';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const AIAssistancePage = () => {
  const { code } = useApp();
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: Code2,
      title: 'Code Explanation',
      description: 'Get clear explanations of any code snippet. The AI analyzes your code and breaks it down into understandable parts.'
    },
    {
      icon: HelpCircle,
      title: 'Bug Detection',
      description: 'Identify potential issues, bugs, and bad practices in your code before they become problems.'
    },
    {
      icon: Lightbulb,
      title: 'Improvement Suggestions',
      description: 'Receive recommendations for cleaner, more efficient, and more maintainable code.'
    },
    {
      icon: BookOpen,
      title: 'Learning Redirection',
      description: 'When confusion is detected, the AI automatically guides you to relevant learning modules.'
    }
  ];

  const exampleQuestions = [
    "What does this code do?",
    "Can you find bugs in my code?",
    "How can I make this code better?",
    "Explain how loops work",
    "What is recursion?",
    "Help me understand arrays"
  ];

  return (
    <Layout>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {!showDemo ? (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai/10 text-ai text-sm font-medium mb-4">
                  <Brain className="w-4 h-4" />
                  AI Assistant
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Your Intelligent Coding Companion
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get instant help, explanations, and suggestions powered by AI. 
                  Ask anything about your code and receive intelligent, contextual responses.
                </p>
              </div>

              {/* Demo CTA */}
              <div className="glass-panel p-8 mb-12 text-center glow-ai">
                <div className="w-20 h-20 rounded-2xl gradient-ai flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-ai-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Try the AI Assistant
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Experience the power of AI-assisted coding. Ask questions, get explanations, and improve your code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setShowDemo(true)} size="lg" className="gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Open Chat Demo
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link to="/editor">
                      <Code2 className="w-5 h-5" />
                      Use with Editor
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {features.map((feature, i) => (
                  <div key={i} className="glass-panel p-6">
                    <div className="w-12 h-12 rounded-xl bg-ai/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-ai" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Example Questions */}
              <div className="glass-panel p-6 mb-12">
                <h3 className="font-semibold text-foreground mb-4">Example Questions You Can Ask</h3>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((question, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-muted rounded-lg text-sm text-muted-foreground"
                    >
                      "{question}"
                    </span>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="glass-panel p-6">
                <h3 className="font-semibold text-foreground mb-6">How AI → Learning Redirection Works</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: 'You Ask a Question',
                      description: 'Type your question about coding or your current code in the chat.'
                    },
                    {
                      step: 2,
                      title: 'AI Analyzes Context',
                      description: 'The AI examines your code and question to understand what you need help with.'
                    },
                    {
                      step: 3,
                      title: 'Detection of Confusion',
                      description: 'If the AI detects you might benefit from learning a topic, it identifies the relevant module.'
                    },
                    {
                      step: 4,
                      title: 'Smart Redirection',
                      description: 'You\'re offered a direct link to the learning module, making your learning journey seamless.'
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full">
            {/* Demo Chat */}
            <div className="flex-1 max-w-2xl mx-auto p-4">
              <div className="mb-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setShowDemo(false)} className="gap-2">
                  ← Back to Overview
                </Button>
                <Button asChild variant="glass" size="sm" className="gap-2">
                  <Link to="/editor">
                    <Code2 className="w-4 h-4" />
                    Open Full Editor
                  </Link>
                </Button>
              </div>
              <div className="glass-panel h-[calc(100vh-12rem)] overflow-hidden">
                <AIAssistant code={code} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AIAssistancePage;