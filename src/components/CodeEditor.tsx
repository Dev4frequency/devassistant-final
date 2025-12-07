import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  onPaste?: (pastedText: string, originalContent: string) => void;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  placeholder = '// Start typing your code here...',
  onPaste,
  className
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);

  useEffect(() => {
    const lines = value.split('\n').length;
    setLineNumbers(Array.from({ length: Math.max(lines, 20) }, (_, i) => i + 1));
  }, [value]);

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    if (onPaste && pastedText.length > 20) {
      onPaste(pastedText, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const highlightSyntax = (code: string) => {
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch'];
    const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    
    return code
      .replace(/\/\/.*$/gm, '<span class="syntax-comment">$&</span>')
      .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="syntax-string">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
      .replace(keywordPattern, '<span class="syntax-keyword">$1</span>')
      .replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="syntax-function">$1</span>');
  };

  return (
    <div className={cn("relative flex rounded-xl overflow-hidden bg-code-bg border border-border", className)}>
      {/* Line Numbers */}
      <div className="flex-shrink-0 py-4 px-3 bg-muted/30 border-r border-border select-none">
        {lineNumbers.map(num => (
          <div 
            key={num} 
            className="text-muted-foreground text-xs font-mono leading-6 text-right"
          >
            {num}
          </div>
        ))}
      </div>
      
      {/* Editor Area */}
      <div className="relative flex-1 overflow-auto">
        {/* Syntax Highlighted Layer */}
        <div 
          className="absolute inset-0 p-4 font-mono text-sm leading-6 whitespace-pre-wrap break-words pointer-events-none text-foreground"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(value) || `<span class="text-muted-foreground">${placeholder}</span>` }}
        />
        
        {/* Textarea Layer */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="relative w-full h-full min-h-[400px] p-4 font-mono text-sm leading-6 bg-transparent text-transparent caret-primary resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
