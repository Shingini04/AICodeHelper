import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeExplanation } from '../../types';
import Spinner from '../ui/Spinner';

interface ExplanationOutputProps {
  explanation: CodeExplanation | null;
  isLoading: boolean;
}

const ExplanationOutput: React.FC<ExplanationOutputProps> = ({ explanation, isLoading }) => {
  const markdownContent = explanation 
    ? `# Intuition\n${explanation.intuition}\n\n# Approach\n${explanation.approach}\n\n# Complexity\n- Time complexity: ${explanation.timeComplexity}\n- Space complexity: ${explanation.spaceComplexity}`
    : '';

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-600 h-full flex flex-col">
      <div className="bg-dark-900 px-4 py-3 border-b border-dark-600">
        <h2 className="text-lg font-medium text-white">Explanation</h2>
      </div>
      <div className="flex-grow overflow-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Spinner size={40} className="mb-4" />
              <p className="text-gray-400">Analyzing your code...</p>
              <p className="text-xs text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          </div>
        ) : explanation ? (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      style={atomOneDark}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold text-primary-400 mt-6 mb-3 pb-2 border-b border-dark-600">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold text-primary-300 mt-4 mb-2">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-300 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-4 text-gray-300">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="mb-2 text-gray-300">
                    {children}
                  </li>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <p className="mb-2">Submit your code to get an explanation</p>
              <p className="text-xs">The AI will analyze your code and provide a detailed explanation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationOutput;