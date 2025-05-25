import React from 'react';
import Layout from './components/layout/Layout';
import CodeExplainerContainer from './components/codeExplainer/CodeExplainerContainer';

function App() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            AI Code <span className="text-primary-400">Assistant</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Paste your code below and get a detailed, beginner-friendly explanation 
            of how it works, including its intuition, approach, and complexity.
          </p>
        </div>
        <CodeExplainerContainer />
      </div>
    </Layout>
  );
}

export default App;