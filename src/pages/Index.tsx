import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, BookOpen, Sparkles, Zap, Brain, Shield, ArrowRight, CheckCircle2, Play, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { learningModules } from '@/data/learningModules';
import { cn } from '@/lib/utils';

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: 'Interactive Examples',
      description: 'Learn by doing with real code examples that you can edit and run',
      color: 'primary',
      link: '/interactive-examples'
    },
    {
      icon: Brain,
      title: 'AI Assistance',
      description: 'Get instant help, explanations, and suggestions from your AI coding companion',
      color: 'ai',
      link: '/ai-assistance'
    },
    {
      icon: Shield,
      title: 'Anti Copy-Paste',
      description: 'Ensure genuine understanding with intelligent code detection and learning redirection',
      color: 'warning',
      link: '/anti-copy-paste'
    }
  ];

  const stats = [
    { value: '4+', label: 'Learning Modules' },
    { value: '12+', label: 'Topics' },
    { value: '20+', label: 'Code Examples' },
    { value: '∞', label: 'AI Assistance' }
  ];

  return (
    <Layout>
      <div className="overflow-y-auto h-full">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-ai/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ai/10 rounded-full blur-3xl" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Open Source AI Coding Assistant
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn to Code with
              <span className="gradient-text"> AI-Powered</span>
              <br />Guidance
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              DevAssistant combines an intelligent code editor, comprehensive learning modules, 
              and AI assistance to help you become a better developer—while ensuring you truly understand the code.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2 px-8">
                <Link to="/editor">
                  <Code2 className="w-5 h-5" />
                  Start Coding
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 px-8">
                <Link to="/learn">
                  <BookOpen className="w-5 h-5" />
                  Explore Learning Path
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to learn coding effectively, with AI guidance every step of the way.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Link
                  key={i}
                  to={feature.link}
                  className="glass-panel p-8 text-center group hover:border-primary/50 transition-all duration-300"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110",
                    feature.color === 'primary' && "bg-primary/20",
                    feature.color === 'ai' && "bg-ai/20",
                    feature.color === 'warning' && "bg-warning/20"
                  )}>
                    <feature.icon className={cn(
                      "w-8 h-8",
                      feature.color === 'primary' && "text-primary",
                      feature.color === 'ai' && "text-ai",
                      feature.color === 'warning' && "text-warning"
                    )} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Modules Preview */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Learning Modules</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Structured learning paths covering fundamental and advanced programming concepts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {learningModules.map((module) => (
                <Link
                  key={module.id}
                  to={`/learn/${module.id}`}
                  className="glass-panel p-6 group hover:border-primary/50 transition-all"
                >
                  <div className="text-4xl mb-4">{module.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      module.difficulty === 'beginner' && "bg-success/20 text-success",
                      module.difficulty === 'intermediate' && "bg-warning/20 text-warning",
                      module.difficulty === 'advanced' && "bg-destructive/20 text-destructive"
                    )}>
                      {module.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {module.topics.length} topics
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/learn">
                  View All Modules
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-muted-foreground">A seamless learning experience from start to mastery</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Write Code in the Editor',
                  description: 'Use our intelligent code editor with syntax highlighting and real-time feedback.'
                },
                {
                  step: 2,
                  title: 'Get AI Assistance',
                  description: 'Ask questions, get explanations, and receive suggestions from your AI companion.'
                },
                {
                  step: 3,
                  title: 'Learn from Modules',
                  description: 'Explore structured lessons with examples, explanations, and quizzes.'
                },
                {
                  step: 4,
                  title: 'Build Understanding',
                  description: 'The anti-copy-paste guard ensures you truly understand the code you use.'
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start glass-panel p-6">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-8">
              Jump into the code editor or explore our learning modules to begin your journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2 px-8">
                <Link to="/editor">
                  <Play className="w-5 h-5" />
                  Launch Editor
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="gap-2 px-8">
                <Link to="/learn">
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">DevAssistant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Open Source • Self-Hostable • AI-Powered Learning
            </p>
            <div className="flex items-center gap-4">
              <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground">Learn</Link>
              <Link to="/editor" className="text-sm text-muted-foreground hover:text-foreground">Editor</Link>
              <a href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;