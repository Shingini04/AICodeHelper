import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Simple mock explanation for development
const mockExplanation = {
  intuition: "This function calculates factorial using recursion.",
  approach: "Uses recursive calls with base case handling.",
  pseudocode: "1. Check if number is 0 or 1, return 1. 2. Otherwise multiply number by factorial of (number-1).",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["Recursion", "Math", "Factorial"]
};

export const explainCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.log('No OpenRouter API key found. Using simple mock data.');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return res.json(mockExplanation);
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/devstral-small:free',
        messages: [
          {
            role: 'system',
            content: `You are a friendly and patient computer science teacher explaining code to a complete beginner who has never programmed before. Your job is to make complex concepts feel simple and build understanding step by step.

Please format your response using the following structure:

# Intuition
Keep this very simple and short. Just help them understand:
- What is this code trying to solve? (Use one simple real-world example)
- Why would someone want to write this code?
- What's the basic idea behind how it works?
- Make them feel like "Oh, that actually makes sense!"

# Approach
Now give detailed, point-wise explanation of what the code is doing:
- Break down the code into clear, numbered points
- Explain what each major part of the code does
- Focus on the logic and flow of the program
- Be specific about what happens at each step
- No subtopics or subheadings - just clear numbered points
- Make it detailed enough that they understand the complete flow

# Pseudocode
Simplify the entire code logic into just 3-5 simple English points:
- Write it like a recipe or instruction manual
- Use plain English, no technical jargon
- Show the basic steps the computer follows
- Keep it super simple and easy to follow

# Complexity
Explain performance like you're teaching a friend:

## Time Complexity: 
- In simple terms, how much work does this code have to do?
- Use analogies (like "if you had twice as many items, would it take twice as long?")
- Give the Big O notation, but explain what it means in plain English
- Include mathematical reasoning, but make it approachable
- Help them understand why this matters in real programming

## Space Complexity:
- How much memory does this code need?
- Explain it like you're talking about storage space
- Show the mathematical reasoning in an easy-to-follow way
- Help them understand when this becomes important

# Tags
List all the programming concepts, algorithms, and computer science ideas that a student should know they're learning about.

Remember: You're building a beginner's intuition and confidence. Make them feel smart, not overwhelmed.`
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

    // Sanitize and clean the response
    const sanitizedContent = aiResponse
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .trim();

    // Parse sections
    const parseSection = (content, sectionName, nextSection = null) => {
      const regex = nextSection 
        ? new RegExp(`# ${sectionName}\\s*([\\s\\S]*?)(?=\\n# ${nextSection}|$)`, 'i')
        : new RegExp(`# ${sectionName}\\s*([\\s\\S]*?)$`, 'i');
      
      const match = content.match(regex);
      return match ? match[1].trim() : `${sectionName} not provided`;
    };

    // Parse complexity section
    const complexitySection = parseSection(sanitizedContent, 'Complexity');
    const timeRegex = /(?:Time Complexity|##\s*Time Complexity)[:\s]*([^\n]+(?:\n(?!(?:Space Complexity|##\s*Space Complexity))[^\n]*)*)/i;
    const spaceRegex = /(?:Space Complexity|##\s*Space Complexity)[:\s]*([^\n]+(?:\n(?!(?:Time Complexity|##\s*Time Complexity|# Tags))[^\n]*)*)/i;
    
    const timeMatch = complexitySection.match(timeRegex);
    const spaceMatch = complexitySection.match(spaceRegex);

    // Parse tags
    const tagsSection = parseSection(sanitizedContent, 'Tags');
    const tagRegex = /(?:[-*]\s*|(?:\d+\.\s*)?)([^-*\n,]+)(?:[,\n]|$)/g;
    const tags = [];
    let match;
    
    while ((match = tagRegex.exec(tagsSection)) !== null) {
      const tag = match[1].trim();
      if (tag && tag.length > 2) {
        tags.push(tag);
      }
    }

    const explanation = {
      intuition: parseSection(sanitizedContent, 'Intuition', 'Approach'),
      approach: parseSection(sanitizedContent, 'Approach', 'Pseudocode'),
      pseudocode: parseSection(sanitizedContent, 'Pseudocode', 'Complexity'),
      timeComplexity: timeMatch ? timeMatch[1].trim() : "O(n) - Linear time complexity",
      spaceComplexity: spaceMatch ? spaceMatch[1].trim() : "O(n) - Linear space complexity",
      tags: tags.length > 0 ? tags : mockExplanation.tags
    };

    // Validate response quality
    if (explanation.intuition.length < 50 || explanation.approach.length < 50) {
      console.log('AI response insufficient, using mock data');
      return res.json(mockExplanation);
    }

    res.json(explanation);
  } catch (error) {
    console.error('Error explaining code:', error);
    res.status(200).json({ 
      ...mockExplanation,
      fallbackUsed: true,
      error: 'API unavailable - using mock explanation'
    });
  }
};