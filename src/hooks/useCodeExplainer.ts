import { useState } from 'react';
import axios from 'axios';
import { CodeExplanation } from '../types';

export const useCodeExplainer = () => {
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const explainCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/explain', { code });
      setExplanation(response.data);
    } catch (err) {
      setError('Failed to get explanation. Please try again.');
      console.error('Error explaining code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    explanation,
    isLoading,
    error,
    explainCode,
  };
};