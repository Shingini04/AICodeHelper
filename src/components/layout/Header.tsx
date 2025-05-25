import React from 'react';
import { Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-800 text-white py-4 px-6 border-b border-dark-600">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code size={28} className="text-primary-400" />
          <h1 className="text-xl font-semibold">AI Code Assistant</h1>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-gray-400">
            Powered by <span className="text-primary-400">OpenRouter</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;