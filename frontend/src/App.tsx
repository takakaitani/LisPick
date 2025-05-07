import React from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { Router } from './components/Router';
import { QuizProvider } from './context/QuizContext';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800 font-sans">
      <QuizProvider>
        <LoadingSpinner />
        <Router />
      </QuizProvider>
    </div>
  );
}

export default App;