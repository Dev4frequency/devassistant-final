import { UnderstandingQuestion, CopyPasteDetection } from '@/types';

// Common code patterns that indicate copied code
const suspiciousPatterns = [
  // Uncommented complex algorithms
  /function\s+\w+\s*\([^)]*\)\s*\{[^}]{100,}\}/,
  // Multiple function definitions
  /(function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>)[^}]*\}/g,
  // Import statements (likely from external sources)
  /import\s+.*from\s+['"][^'"]+['"]/,
  // Complex regex patterns
  /\/[^\/]{20,}\/[gimsuvy]*/,
  // Class definitions
  /class\s+\w+\s*(extends\s+\w+)?\s*\{/,
];

// Keywords that suggest the code relates to specific topics
const topicKeywords: Record<string, string[]> = {
  loops: ['for', 'while', 'forEach', 'map', 'reduce', 'filter', 'iteration', 'iterate'],
  arrays: ['array', 'push', 'pop', 'slice', 'splice', 'indexOf', 'includes', 'sort'],
  recursion: ['recursive', 'recursion', 'factorial', 'fibonacci', 'base case', 'call stack'],
  algorithms: ['algorithm', 'sort', 'search', 'binary', 'merge', 'quick', 'bubble', 'O(n)'],
};

// Generate understanding questions based on detected code
function generateQuestions(code: string, detectedTopics: string[]): UnderstandingQuestion[] {
  const questions: UnderstandingQuestion[] = [];
  
  if (detectedTopics.includes('loops') || /for\s*\(|while\s*\(/.test(code)) {
    questions.push({
      id: 'loop-q1',
      question: 'What type of loop is used in this code, and why might it be the best choice here?',
      relatedTopic: 'Loops & Iteration',
      moduleId: 'loops'
    });
    questions.push({
      id: 'loop-q2',
      question: 'What would happen if you changed the loop condition? Explain the potential consequences.',
      relatedTopic: 'Loop Conditions',
      moduleId: 'loops'
    });
  }
  
  if (detectedTopics.includes('arrays') || /\[.*\]|\.(push|pop|map|filter)/.test(code)) {
    questions.push({
      id: 'array-q1',
      question: 'What array methods are being used? Explain what each one does.',
      relatedTopic: 'Array Methods',
      moduleId: 'arrays'
    });
  }
  
  if (detectedTopics.includes('recursion') || /function\s+\w+[^}]+\1\s*\(/.test(code)) {
    questions.push({
      id: 'recursion-q1',
      question: 'Identify the base case and recursive case in this code. Why are both necessary?',
      relatedTopic: 'Recursion',
      moduleId: 'recursion'
    });
  }
  
  // Generic questions if no specific topic detected
  if (questions.length === 0) {
    questions.push({
      id: 'generic-q1',
      question: 'Explain the main purpose of this code in your own words.',
      relatedTopic: 'Code Understanding',
      moduleId: 'loops'
    });
    questions.push({
      id: 'generic-q2',
      question: 'What would you change if you needed to modify this code for a different use case?',
      relatedTopic: 'Code Adaptation',
      moduleId: 'loops'
    });
  }
  
  return questions.slice(0, 3); // Return max 3 questions
}

// Detect which topics the code relates to
function detectTopics(code: string): string[] {
  const detectedTopics: string[] = [];
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    const pattern = new RegExp(keywords.join('|'), 'i');
    if (pattern.test(code)) {
      detectedTopics.push(topic);
    }
  }
  
  return detectedTopics;
}

// Calculate similarity between original code and pasted code
function calculateSimilarity(original: string, pasted: string): number {
  if (!original || !pasted) return 0;
  
  const originalLines = original.split('\n').map(l => l.trim()).filter(l => l);
  const pastedLines = pasted.split('\n').map(l => l.trim()).filter(l => l);
  
  let matches = 0;
  for (const line of pastedLines) {
    if (originalLines.includes(line)) {
      matches++;
    }
  }
  
  return pastedLines.length > 0 ? (1 - matches / pastedLines.length) * 100 : 0;
}

// Check if the pasted code appears to be from an external source
function isLikelyExternalCode(code: string): boolean {
  // Check for suspicious patterns
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(code)) return true;
  }
  
  // Check for code length (longer pastes are more suspicious)
  const lines = code.split('\n').length;
  if (lines > 10) return true;
  
  // Check for complex structures
  const hasMultipleFunctions = (code.match(/function\s+\w+/g) || []).length > 1;
  const hasClasses = /class\s+\w+/.test(code);
  
  return hasMultipleFunctions || hasClasses;
}

export function detectCopyPaste(
  pastedText: string, 
  originalContent: string
): CopyPasteDetection {
  // If the paste is too short, don't flag it
  if (pastedText.length < 50) {
    return { detected: false };
  }
  
  // Check if it looks like external code
  const isExternal = isLikelyExternalCode(pastedText);
  
  if (!isExternal) {
    return { detected: false };
  }
  
  // Calculate similarity to existing code
  const similarity = calculateSimilarity(originalContent, pastedText);
  
  // If it's very similar to existing code, it might just be moving code around
  if (similarity < 30) {
    return { detected: false };
  }
  
  // Detect relevant topics and generate questions
  const detectedTopics = detectTopics(pastedText);
  const questions = generateQuestions(pastedText, detectedTopics);
  
  return {
    detected: true,
    originalCode: originalContent,
    pastedCode: pastedText,
    similarity,
    questions
  };
}
