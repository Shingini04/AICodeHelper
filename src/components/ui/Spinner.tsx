import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, className = '' }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 
        className={`animate-spin text-primary-400 ${className}`} 
        size={size} 
      />
    </div>
  );
};

export default Spinner;