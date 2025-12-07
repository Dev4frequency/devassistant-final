import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Code2, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { learningModules } from '@/data/learningModules';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  output: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const examples: Example[] = [
  {
    id: 'for-loop',
    title: 'For Loop - Counting',
    description: 'A basic for loop that counts from 1 to 5',
    code: `// Counting with a for loop
for (let i = 1; i <= 5; i++) {
  console.log("Count: " + i);
}`,
    output: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5',
    category: 'Loops',
    difficulty: 'beginner'
  },
  {
    id: 'array-map',
    title: 'Array Map - Transform Data',
    description: 'Using map() to double all numbers in an array',
    code: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);

console.log("Original:", numbers);
console.log("Doubled:", doubled);`,
    output: 'Original: [1, 2, 3, 4, 5]\nDoubled: [2, 4, 6, 8, 10]',
    category: 'Arrays',
    difficulty: 'beginner'
  },
  {
    id: 'array-filter',
    title: 'Array Filter - Find Items',
    description: 'Using filter() to get only even numbers',
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(num => num % 2 === 0);

console.log("All numbers:", numbers);
console.log("Even numbers:", evens);`,
    output: 'All numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nEven numbers: [2, 4, 6, 8, 10]',
    category: 'Arrays',
    difficulty: 'beginner'
  },
  {
    id: 'recursion-factorial',
    title: 'Recursion - Factorial',
    description: 'Calculate factorial using recursive function',
    code: `function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  
  // Recursive case
  return n * factorial(n - 1);
}

console.log("5! =", factorial(5));
console.log("3! =", factorial(3));`,
    output: '5! = 120\n3! = 6',
    category: 'Recursion',
    difficulty: 'intermediate'
  },
  {
    id: 'recursion-fibonacci',
    title: 'Recursion - Fibonacci',
    description: 'Generate Fibonacci numbers recursively',
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Print first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log("F(" + i + ") =", fibonacci(i));
}`,
    output: 'F(0) = 0\nF(1) = 1\nF(2) = 1\nF(3) = 2\nF(4) = 3\nF(5) = 5\nF(6) = 8\nF(7) = 13\nF(8) = 21\nF(9) = 34',
    category: 'Recursion',
    difficulty: 'intermediate'
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers - Palindrome',
    description: 'Check if a string is a palindrome using two pointers',
    code: `function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log("racecar:", isPalindrome("racecar"));
console.log("hello:", isPalindrome("hello"));
console.log("madam:", isPalindrome("madam"));`,
    output: 'racecar: true\nhello: false\nmadam: true',
    category: 'Algorithms',
    difficulty: 'advanced'
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window - Max Sum',
    description: 'Find maximum sum of k consecutive elements',
    code: `function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  
  let maxSum = 0;
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  
  let currentSum = maxSum;
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

const arr = [2, 1, 5, 1, 3, 2];
console.log("Max sum of 3:", maxSubarraySum(arr, 3));`,
    output: 'Max sum of 3: 9',
    category: 'Algorithms',
    difficulty: 'advanced'
  }
];

const InteractiveExamplesPage = () => {
  const navigate = useNavigate();
  const { setCode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<Record<string, string>>({});

  const categories = ['all', ...Array.from(new Set(examples.map(e => e.category)))];

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(e => e.category === selectedCategory);

  const copyCode = (example: Example) => {
    navigator.clipboard.writeText(example.code);
    setCopiedId(example.id);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const runExample = (example: Example) => {
    setRunningId(example.id);
    
    // Simulate running the code
    setTimeout(() => {
      setOutputs(prev => ({ ...prev, [example.id]: example.output }));
      setRunningId(null);
      toast.success('Code executed successfully!');
    }, 500);
  };

  const tryInEditor = (example: Example) => {
    setCode(example.code);
    navigate('/editor');
    toast.success('Code loaded in editor!');
  };

  return (
    <Layout>
      <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Interactive Examples
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Learn by Doing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore real code examples, run them instantly, and load them into the editor to experiment.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {category === 'all' ? 'All Examples' : category}
              </button>
            ))}
          </div>

          {/* Examples Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredExamples.map((example) => (
              <div key={example.id} className="glass-panel p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{example.title}</h3>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        example.difficulty === 'beginner' && "bg-success/20 text-success",
                        example.difficulty === 'intermediate' && "bg-warning/20 text-warning",
                        example.difficulty === 'advanced' && "bg-destructive/20 text-destructive"
                      )}>
                        {example.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                    {example.category}
                  </span>
                </div>

                {/* Code */}
                <div className="relative">
                  <pre className="bg-code-bg rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground mb-4">
                    {example.code}
                  </pre>
                  <button
                    onClick={() => copyCode(example)}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-muted/80 hover:bg-muted transition-colors"
                  >
                    {copiedId === example.id ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Output */}
                {outputs[example.id] && (
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Output:</p>
                    <pre className="text-sm font-mono text-success whitespace-pre-wrap">
                      {outputs[example.id]}
                    </pre>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => runExample(example)}
                    disabled={runningId === example.id}
                    className="flex-1 gap-2"
                  >
                    <Play className={cn("w-4 h-4", runningId === example.id && "animate-spin")} />
                    {runningId === example.id ? 'Running...' : 'Run'}
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => tryInEditor(example)}
                    className="flex-1 gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    Try in Editor
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 glass-panel p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Want to learn more about these concepts?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our comprehensive learning modules with in-depth explanations and quizzes.
            </p>
            <Button asChild className="gap-2">
              <a href="/learn">
                Go to Learning Path
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InteractiveExamplesPage;