import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 text-gray-400 py-4 px-6 border-t border-dark-600">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} AI Code Assistant. All rights reserved.</p>
        <p className="mt-1">Designed for beginners to understand code easily.</p>
      </div>
    </footer>
  );
};

export default Footer;