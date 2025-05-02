import React from 'react';
import { Router } from './components/Router';
import { QuizProvider } from './context/QuizContext';

export default function App() {
  return (
    // 画面全体をラップするコンテナ
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800 font-sans">
      <QuizProvider>
        <Router />
      </QuizProvider>
    </div>
  );
}