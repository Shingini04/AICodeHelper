import React, { useRef } from 'react';
import Button from '../ui/Button';
import { Copy, RefreshCw } from 'lucide-react';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onSubmit: (type: 'detailed' | 'lineByLine' | 'summary') => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, onSubmit, isLoading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    }
  };

  const handleReset = () => {
    setCode('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-600 h-full flex flex-col">
      <div className="bg-dark-900 px-4 py-3 border-b border-dark-600 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Code Input</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="p-2 h-9 w-9"
            onClick={handleCopy}
            title="Copy code"
          >
            <Copy size={16} />
          </Button>
          <Button
            variant="outline"
            className="p-2 h-9 w-9"
            onClick={handleReset}
            title="Reset code"
          >
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>
      <div className="flex-grow relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-full bg-transparent p-4 font-mono text-sm text-gray-300 resize-none outline-none"
          spellCheck="false"
        />
      </div>
      <div className="px-4 py-3 border-t border-dark-600 space-y-2">
        <Button
          onClick={() => onSubmit('lineByLine')}
          disabled={!code.trim()}
          isLoading={isLoading}
          className="w-full mb-2"
        >
          Explain Line by Line
        </Button>
        <Button
          onClick={() => onSubmit('detailed')}
          disabled={!code.trim()}
          isLoading={isLoading}
          className="w-full mb-2"
          variant="secondary"
        >
          Explain Code
        </Button>
        <Button
          onClick={() => onSubmit('summary')}
          disabled={!code.trim()}
          isLoading={isLoading}
          className="w-full"
          variant="outline"
        >
          Quick Summary
        </Button>
      </div>
    </div>
  );
};

export default CodeInput;