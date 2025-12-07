import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code, HelpCircle, Lightbulb, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import { cn } from '@/lib/utils';

interface AIAssistantProps {
  code: string;
  onSuggestion?: (suggestion: string) => void;
  onRedirectToModule?: (moduleId: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ code, onSuggestion, onRedirectToModule }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI coding assistant. I can help you understand your code, explain concepts, and give suggestions. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: Code, label: 'Explain my code', action: 'Can you explain what my current code does?' },
    { icon: HelpCircle, label: 'Find bugs', action: 'Can you find any bugs or issues in my code?' },
    { icon: Lightbulb, label: 'Suggest improvements', action: 'How can I improve this code?' },
  ];

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('explain') && code) {
      return `Looking at your code, I can see you're working with JavaScript. Here's what I notice:\n\n${analyzeCode(code)}\n\nWould you like me to explain any specific part in more detail?`;
    }
    
    if (lowerMessage.includes('bug') || lowerMessage.includes('issue')) {
      return `Let me analyze your code for potential issues...\n\n${findIssues(code)}\n\nWould you like help fixing any of these?`;
    }
    
    if (lowerMessage.includes('improve') || lowerMessage.includes('better')) {
      return `Here are some suggestions to improve your code:\n\n${suggestImprovements(code)}\n\nShall I show you how to implement any of these?`;
    }
    
    if (lowerMessage.includes('loop') || lowerMessage.includes('confused') || lowerMessage.includes("don't understand")) {
      if (onRedirectToModule) {
        setTimeout(() => onRedirectToModule('loops'), 2000);
      }
      return `Great question about loops! I notice you might benefit from our learning module.\n\n**For Loop**: Best when you know how many iterations\n**While Loop**: Best when the condition is dynamic\n\n🎯 **Redirecting you to the Loops module** for a deeper understanding!`;
    }
    
    if (lowerMessage.includes('array')) {
      return `Arrays are fundamental! Here's a quick overview:\n\n**Creating**: \`const arr = [1, 2, 3]\`\n**Accessing**: \`arr[0]\` (first element)\n**Methods**: \`.push()\`, \`.map()\`, \`.filter()\`, \`.reduce()\`\n\n💡 Click **"Learn Arrays"** below to master this topic!`;
    }
    
    return `I understand you're asking about "${userMessage}". Based on your current code context, I'd suggest:\n\n1. Break down the problem into smaller steps\n2. Test each part independently\n3. Use console.log() to debug\n\nIs there a specific part you'd like me to elaborate on?`;
  };

  const analyzeCode = (code: string): string => {
    const hasLoop = /for\s*\(|while\s*\(/.test(code);
    const hasFunction = /function\s+\w+|const\s+\w+\s*=\s*\(/.test(code);
    const hasArray = /\[.*\]/.test(code);
    
    let analysis = '';
    if (hasFunction) analysis += '• You have function definitions - good for organizing code!\n';
    if (hasLoop) analysis += '• I see loops being used for iteration\n';
    if (hasArray) analysis += '• Arrays are being used to store collections\n';
    if (!analysis) analysis = '• The code appears to be a starting point. Try adding some logic!';
    
    return analysis;
  };

  const findIssues = (code: string): string => {
    const issues = [];
    
    if (code.includes('var ')) {
      issues.push('⚠️ Consider using `const` or `let` instead of `var` for better scoping');
    }
    if (code.includes('==') && !code.includes('===')) {
      issues.push('⚠️ Use `===` for strict equality checks');
    }
    if (!code.trim()) {
      issues.push('📝 Your code editor is empty. Start by writing some code!');
    }
    
    return issues.length > 0 ? issues.join('\n') : '✅ No obvious issues found! Your code looks clean.';
  };

  const suggestImprovements = (code: string): string => {
    const suggestions = [];
    
    if (code.includes('console.log')) {
      suggestions.push('💡 Consider using a logging library for production');
    }
    if (code.length > 50 && !code.includes('//')) {
      suggestions.push('💡 Add comments to explain complex logic');
    }
    suggestions.push('💡 Consider breaking large functions into smaller ones');
    suggestions.push('💡 Use descriptive variable names for clarity');
    
    return suggestions.join('\n');
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      codeContext: code
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl gradient-ai flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-ai-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 p-3 border-b border-border overflow-x-auto">
        {quickActions.map((action, i) => (
          <Button
            key={i}
            variant="glass"
            size="sm"
            className="flex-shrink-0 text-xs"
            onClick={() => handleQuickAction(action.action)}
          >
            <action.icon className="w-3 h-3" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex animate-fade-in",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'glass-panel rounded-tl-sm'
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className={cn(
                "text-xs mt-2 opacity-60",
                message.role === 'user' ? 'text-right' : ''
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about coding..."
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={handleSend} size="icon" className="rounded-xl">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
