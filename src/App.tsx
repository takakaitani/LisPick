import React from 'react';
import { Router } from './components/Router';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800 font-sans">
      <QuizProvider>
        <Router />
      </QuizProvider>
    </div>
  );
}

export default App;