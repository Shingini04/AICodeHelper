import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Simple mock explanations for development
const mockExplanations = {
  detailed: {
    type: 'detailed',
    intuition: "This function calculates factorial using recursion.",
    approach: "Uses recursive calls with base case handling.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
  },
  lineByLine: {
    type: 'lineByLine',
    lineByLine: "```js\nfunction factorial(n) { // Define a function that takes a number parameter\n  if (n === 0 || n === 1) { // Check if number is 0 or 1 (base cases)\n    return 1; // Return 1 for base cases\n  }\n  return n * factorial(n - 1); // Multiply n by factorial of (n-1)\n}\n```\n\nLine by line explanation:\n1. Function declaration takes a number parameter 'n'\n2. Base case check for 0 or 1\n3. Return 1 for base cases\n4. Recursive call: multiply current number by factorial of (n-1)",
  },
  summary: {
    type: 'summary',
    summary: "This code implements a recursive factorial function that calculates the product of all positive integers up to a given number. It uses a recursive approach where each number is multiplied by the factorial of the number below it, with 0 and 1 serving as base cases that return 1. The function demonstrates fundamental concepts of recursion including base cases and recursive steps. While simple, it effectively shows how complex calculations can be broken down into smaller, similar sub-problems.",
  }
};

export const explainCode = async (req, res) => {
  try {
    const { code, type } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.log('No OpenRouter API key found. Using simple mock data.');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return res.json(mockExplanations[type]);
    }

    let systemPrompt = '';
    switch (type) {
      case 'lineByLine':
        systemPrompt = `You are a coding instructor explaining code line by line. For each line:
1. Show the line number
2. Explain what that specific line does
3. Explain any important concepts or patterns in that line
4. Use markdown code blocks to show the code with line numbers
5. Keep explanations clear and beginner-friendly`;
        break;
      case 'summary':
        systemPrompt = `You are a coding instructor providing a concise summary of code. Your task:
1. Give a 250-300 word summary of what the code does
2. Focus on the main purpose and key functionality
3. Explain it in a way that's easy for beginners to understand
4. Highlight the most important concepts used
5. Keep it concise but comprehensive`;
        break;
      default:
        systemPrompt = `You are a friendly and patient computer science teacher explaining code to a complete beginner who has never programmed before. Your job is to make complex concepts feel simple and build understanding step by step.

Please format your response using the following structure:

# Intuition
Keep this very simple and short. Just help them understand:
- What is this code trying to solve? (Use one simple real-world example)
- Why would someone want to write this code?
- What's the basic idea behind how it works?

# Approach
Now give detailed, point-wise explanation of what the code is doing:
- Break down the code into clear, numbered points
- Explain what each major part of the code does
- Focus on the logic and flow of the program
- Be specific about what happens at each step

# Complexity
Explain performance in simple terms:
- Time Complexity: How much work does this code have to do?
- Space Complexity: How much memory does this code need?`;
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/devstral-small:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: code
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    const sanitizedContent = aiResponse
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .trim();

    let explanation;
    switch (type) {
      case 'lineByLine':
        explanation = {
          type: 'lineByLine',
          lineByLine: sanitizedContent
        };
        break;
      case 'summary':
        explanation = {
          type: 'summary',
          summary: sanitizedContent
        };
        break;
      default:
        const intuition = sanitizedContent.match(/# Intuition\s*([\s\S]*?)(?=\n# Approach|\n# Complexity|$)/i)?.[1]?.trim() || '';
        const approach = sanitizedContent.match(/# Approach\s*([\s\S]*?)(?=\n# Complexity|$)/i)?.[1]?.trim() || '';
        const complexity = sanitizedContent.match(/# Complexity\s*([\s\S]*?)$/i)?.[1]?.trim() || '';
        
        explanation = {
          type: 'detailed',
          intuition,
          approach,
          timeComplexity: complexity.match(/Time Complexity[:\s]*(.*?)(?=\n|$)/i)?.[1]?.trim() || 'O(n)',
          spaceComplexity: complexity.match(/Space Complexity[:\s]*(.*?)(?=\n|$)/i)?.[1]?.trim() || 'O(n)'
        };
    }

    if ((type === 'detailed' && (!explanation.intuition || !explanation.approach)) ||
        (type === 'lineByLine' && !explanation.lineByLine) ||
        (type === 'summary' && !explanation.summary)) {
      console.log('AI response insufficient, using mock data');
      return res.json(mockExplanations[type]);
    }

    res.json(explanation);
  } catch (error) {
    console.error('Error explaining code:', error);
    res.status(200).json({ 
      ...mockExplanations[req.body.type || 'detailed'],
      fallbackUsed: true,
      error: 'API unavailable - using mock explanation'
    });
  }
};