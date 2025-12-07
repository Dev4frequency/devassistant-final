import { LearningModule } from '@/types';

export const learningModules: LearningModule[] = [
  {
    id: 'loops',
    title: 'Loops & Iteration',
    description: 'Master for loops, while loops, and iteration patterns',
    icon: '🔄',
    difficulty: 'beginner',
    progress: 0,
    topics: [
      {
        id: 'for-loop-basics',
        title: 'For Loop Basics',
        content: `A **for loop** is used when you know exactly how many times you want to execute a block of code.

The for loop has three parts:
1. **Initialization**: Sets the starting point (e.g., \`let i = 0\`)
2. **Condition**: Checked before each iteration (e.g., \`i < 10\`)
3. **Update**: Runs after each iteration (e.g., \`i++\`)

Think of it like climbing stairs: you start at step 0, keep going while you haven't reached the top, and take one step at a time.`,
        examples: [
          {
            id: 'for-basic',
            title: 'Basic For Loop',
            code: `// Print numbers 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5`,
            language: 'javascript',
            explanation: 'This loop starts at 1, continues while i is less than or equal to 5, and increments by 1 each time.'
          },
          {
            id: 'for-array',
            title: 'Looping Through Arrays',
            code: `const fruits = ['apple', 'banana', 'orange'];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// Output: apple, banana, orange`,
            language: 'javascript',
            explanation: 'We use the array\'s length property to loop through all elements.'
          }
        ],
        quiz: {
          id: 'for-loop-quiz',
          questions: [
            {
              id: 'q1',
              question: 'What does i++ do in a for loop?',
              options: [
                'Decreases i by 1',
                'Increases i by 1',
                'Multiplies i by 2',
                'Sets i to 0'
              ],
              correctAnswer: 1,
              explanation: 'i++ is shorthand for i = i + 1, which increases i by 1 after each iteration.'
            },
            {
              id: 'q2',
              question: 'How many times will this loop run? for(let i = 0; i < 3; i++)',
              options: ['2 times', '3 times', '4 times', 'Infinite times'],
              correctAnswer: 1,
              explanation: 'The loop runs for i = 0, 1, 2 (3 times total) and stops when i becomes 3.'
            }
          ]
        },
        completed: false
      },
      {
        id: 'while-loops',
        title: 'While Loops',
        content: `A **while loop** continues executing as long as its condition is true.

Use while loops when you don't know in advance how many times you'll need to loop.

⚠️ **Warning**: Always make sure the condition will eventually become false, or you'll create an infinite loop!`,
        examples: [
          {
            id: 'while-basic',
            title: 'Basic While Loop',
            code: `let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
// Output: 0, 1, 2, 3, 4`,
            language: 'javascript',
            explanation: 'The loop continues while count is less than 5, incrementing each time.'
          }
        ],
        quiz: null,
        completed: false
      }
    ]
  },
  {
    id: 'arrays',
    title: 'Arrays & Data Structures',
    description: 'Learn to store and manipulate collections of data',
    icon: '📊',
    difficulty: 'beginner',
    progress: 0,
    topics: [
      {
        id: 'array-basics',
        title: 'Array Fundamentals',
        content: `An **array** is like a numbered list that can hold multiple values.

Key concepts:
- Arrays start at index 0 (first item is at position 0)
- Access items using bracket notation: \`array[index]\`
- Arrays can hold any type of data
- Use \`.length\` to get the number of items`,
        examples: [
          {
            id: 'array-create',
            title: 'Creating and Accessing Arrays',
            code: `// Creating an array
const colors = ['red', 'green', 'blue'];

// Accessing elements
console.log(colors[0]); // 'red'
console.log(colors[2]); // 'blue'

// Modifying elements
colors[1] = 'yellow';
console.log(colors); // ['red', 'yellow', 'blue']`,
            language: 'javascript',
            explanation: 'Arrays use zero-based indexing. The first element is at index 0.'
          }
        ],
        quiz: {
          id: 'array-quiz',
          questions: [
            {
              id: 'aq1',
              question: 'What index is the first element of an array?',
              options: ['1', '0', '-1', 'first'],
              correctAnswer: 1,
              explanation: 'Arrays in JavaScript (and most languages) are zero-indexed, meaning the first element is at index 0.'
            }
          ]
        },
        completed: false
      },
      {
        id: 'array-methods',
        title: 'Array Methods',
        content: `JavaScript arrays come with powerful built-in methods:

- **push()**: Add to end
- **pop()**: Remove from end
- **shift()**: Remove from beginning
- **unshift()**: Add to beginning
- **map()**: Transform each element
- **filter()**: Keep elements that pass a test
- **reduce()**: Combine all elements into one value`,
        examples: [
          {
            id: 'array-map',
            title: 'Using map()',
            code: `const numbers = [1, 2, 3, 4];

const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]`,
            language: 'javascript',
            explanation: 'map() creates a new array by applying a function to each element.'
          }
        ],
        quiz: null,
        completed: false
      }
    ]
  },
  {
    id: 'recursion',
    title: 'Recursion',
    description: 'Understand functions that call themselves',
    icon: '🔁',
    difficulty: 'intermediate',
    progress: 0,
    topics: [
      {
        id: 'recursion-basics',
        title: 'Understanding Recursion',
        content: `**Recursion** is when a function calls itself to solve a problem.

Every recursive function needs:
1. **Base case**: When to stop (prevents infinite loops)
2. **Recursive case**: The function calling itself with a smaller problem

Think of it like Russian nesting dolls - each doll contains a smaller version of itself until you reach the smallest one (base case).`,
        examples: [
          {
            id: 'factorial',
            title: 'Factorial Function',
            code: `function factorial(n) {
  // Base case: factorial of 0 or 1 is 1
  if (n <= 1) {
    return 1;
  }
  
  // Recursive case: n! = n * (n-1)!
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
// 5! = 5 * 4 * 3 * 2 * 1 = 120`,
            language: 'javascript',
            explanation: 'The function keeps calling itself with n-1 until it reaches the base case.'
          }
        ],
        quiz: {
          id: 'recursion-quiz',
          questions: [
            {
              id: 'rq1',
              question: 'What happens if a recursive function has no base case?',
              options: [
                'It returns undefined',
                'It runs forever (stack overflow)',
                'It returns 0',
                'It throws a syntax error'
              ],
              correctAnswer: 1,
              explanation: 'Without a base case, the function keeps calling itself until the call stack overflows.'
            }
          ]
        },
        completed: false
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Patterns',
    description: 'Learn common coding patterns and problem-solving techniques',
    icon: '⚡',
    difficulty: 'advanced',
    progress: 0,
    topics: [
      {
        id: 'two-pointers',
        title: 'Two Pointers Pattern',
        content: `The **Two Pointers** pattern uses two indices to traverse a data structure, often from opposite ends.

Perfect for:
- Finding pairs in sorted arrays
- Reversing arrays/strings
- Detecting palindromes
- Merging sorted arrays`,
        examples: [
          {
            id: 'palindrome',
            title: 'Palindrome Check',
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

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello'));   // false`,
            language: 'javascript',
            explanation: 'Two pointers move toward each other, comparing characters until they meet.'
          }
        ],
        quiz: null,
        completed: false
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window Pattern',
        content: `The **Sliding Window** pattern maintains a "window" of elements as you traverse.

Use it for:
- Finding subarrays with specific properties
- String pattern matching
- Maximum/minimum in a range`,
        examples: [
          {
            id: 'max-sum',
            title: 'Maximum Sum Subarray',
            code: `function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  
  // Calculate sum of first window
  let maxSum = 0;
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  
  let currentSum = maxSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

console.log(maxSubarraySum([1, 4, 2, 10, 2, 3, 1, 0, 20], 4));
// Output: 24 (subarray [2, 10, 2, 10])`,
            language: 'javascript',
            explanation: 'Instead of recalculating the sum each time, we slide the window by removing one element and adding another.'
          }
        ],
        quiz: null,
        completed: false
      }
    ]
  }
];
