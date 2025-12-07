import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, BookOpen, Github, Menu, X, Zap, Brain, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, showSidebar = false, sidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useApp();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/editor', icon: Code2, label: 'Code Editor' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/interactive-examples', icon: Zap, label: 'Examples' },
    { path: '/ai-assistance', icon: Brain, label: 'AI Help' },
    { path: '/anti-copy-paste', icon: Shield, label: 'Guard' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">DevAssistant</h1>
              <p className="text-xs text-muted-foreground">AI Coding + Learning</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            {showSidebar && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border overflow-x-auto">
          <div className="flex items-center gap-1 px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-shrink-0",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <div className={cn(
          "flex-1 transition-all duration-300",
          showSidebar && sidebarOpen ? "lg:pr-[400px]" : ""
        )}>
          {children}
        </div>

        {/* Sidebar */}
        {showSidebar && sidebar && (
          <aside className={cn(
            "fixed right-0 top-16 bottom-0 w-[400px] border-l border-border bg-card transition-transform duration-300 z-30",
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          )}>
            {sidebar}
          </aside>
        )}
      </main>
    </div>
  );
};