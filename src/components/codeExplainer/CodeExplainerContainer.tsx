import React, { useState } from 'react';
import CodeInput from './CodeInput';
import ExplanationOutput from './ExplanationOutput';
import { CodeExplanation } from '../../types';
import { useCodeExplainer } from '../../hooks/useCodeExplainer';

const CodeExplainerContainer: React.FC = () => {
  const [code, setCode] = useState('');
  const { explanation, isLoading, explainCode } = useCodeExplainer();

  const handleSubmit = async () => {
    if (code.trim()) {
      await explainCode(code);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)]">
      <div className="w-full lg:w-1/2 h-full md:h-[calc(50vh-90px)] lg:h-full">
        <CodeInput 
          code={code} 
          setCode={setCode} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
      <div className="w-full lg:w-1/2 h-full md:h-[calc(50vh-90px)] lg:h-full">
        <ExplanationOutput 
          explanation={explanation} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default CodeExplainerContainer;