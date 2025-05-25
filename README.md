# AI Code Assistant

A web application that helps you understand code snippets with AI-powered explanations. Perfect for beginners learning to code!

## Features

- 📝 Paste any code snippet and get a detailed explanation
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

2. **Get Explanation**
   - Click the "Explain Code" button
   - Wait for the AI to analyze your code
   - The explanation will appear in the right panel

3. **Understanding the Explanation**
   The explanation is broken down into three parts:
   - **Intuition**: The basic idea behind the code
   - **Approach**: Step-by-step breakdown of how it works
   - **Complexity**: Time and space complexity analysis

## Troubleshooting

**The app isn't starting**
- Make sure you've run `npm install`
- Check if port 5173 is available
- Try running the commands separately:
  ```bash
  npm run server
  npm run dev
  ```

**No explanation appears**
- Without an API key, you'll see mock data
- With an API key, check your `.env` file is correct
- Check the browser console for errors

## Project Structure

```
ai-code-assistant/
├── src/                    # Frontend React code
│   ├── components/         # UI components
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript definitions
├── server/                 # Backend Node.js code
│   ├── controllers/       # Request handlers
│   └── routes/           # API routes
└── public/                # Static assets
```

## Available Scripts

- `npm start`: Start both frontend and backend
- `npm run dev`: Start frontend only
- `npm run server`: Start backend only
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Features

### Code Input
- Syntax highlighting
- Copy/paste support
- Reset button
- Auto-formatting

### Explanation Output
- Markdown rendering
- Code block highlighting
- Loading indicators
- Error handling

## Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use this project however you like!