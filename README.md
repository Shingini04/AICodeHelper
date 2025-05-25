# AI Code Assistant

A web application that helps you understand code snippets with AI-powered explanations. Perfect for beginners learning to code!

## New Features in v0.2.0! 🎉

### 1. Multiple Explanation Modes
- **Line by Line Analysis**: Get detailed explanations for each line of code
- **Detailed Explanation**: Understand the intuition, approach, and complexity
- **Quick Summary**: Get a 500-word overview for quick reference

### 2. Mathematical Expression Support
- Renders complex mathematical formulas and equations
- Supports LaTeX syntax
- Beautiful typography for mathematical symbols
- Properly formatted tables and matrices

## Features

- 📝 Multiple ways to understand code:
  - Line-by-line detailed analysis
  - Comprehensive explanation with intuition and approach
  - Quick 500-word summary
- 🧮 Support for mathematical expressions and formulas
- 🧠 AI-powered analysis of your code
- 🎨 Beautiful dark theme with syntax highlighting
- 📱 Responsive design that works on all devices
- 🚀 Real-time explanations with no page reloads

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Setup

1. Clone this repository or download the files

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

   > Don't have an API key? The app will work with mock data for testing!

4. Start the application:
   ```bash
   npm start
   ```

5. Open your browser and visit: `http://localhost:5173`

## How to Use

1. **Input Code**
   - Paste your code in the left panel
   - The code will automatically get syntax highlighting

2. **Choose Explanation Type**
   - **Line by Line**: Click "Explain Line by Line" for detailed per-line analysis
   - **Explain Code**: Click "Explain Code" for comprehensive understanding
   - **Quick Summary**: Click "Quick Summary" for a brief overview

3. **Understanding Mathematical Expressions**
   The app now supports various mathematical notations:
   - LaTeX syntax for equations
   - Matrices and tables
   - Mathematical symbols and formulas
   - Example: $E = mc^2$ or $\sum_{i=1}^n i^2$

4. **Understanding the Explanation**
   Different explanation types provide:
   - **Line by Line**: Detailed breakdown of each code line
   - **Detailed Explanation**:
     - Intuition: The basic idea behind the code
     - Approach: Step-by-step breakdown
     - Complexity: Time and space analysis
   - **Quick Summary**: 500-word overview for quick reference

## Troubleshooting

**The app isn't starting**
- Make sure you've run `npm install`
- Check if port 5173 is available
- Try running the commands separately:
  ```bash
  npm run server
  npm run dev
  ```

**Mathematical expressions aren't rendering**
- Make sure you're using proper LaTeX syntax
- Check if the expression is wrapped in `$` for inline or `$$` for block
- Example: `$x^2 + y^2 = r^2$`

**No explanation appears**
- Without an API key, you'll see mock data
- With an API key, check your `.env` file is correct
- Check the browser console for errors

## Project Structure

```
ai-code-assistant/
├── src/
│   ├── components/
│   │   ├── codeExplainer/
│   │   │   ├── CodeInput.tsx       # Code input with multiple explanation buttons
│   │   │   └── ExplanationOutput.tsx # Renders explanations with math support
│   │   ├── layout/
│   │   └── ui/
│   ├── hooks/
│   └── types/
├── server/
│   ├── controllers/
│   └── routes/
└── public/
```

## Available Scripts

- `npm start`: Start both frontend and backend
- `npm run dev`: Start frontend only
- `npm run server`: Start backend only
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use this project however you like!