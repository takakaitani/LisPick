import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';

export const EndModal: React.FC = () => {
  const { goToResults } = useContext(QuizContext);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      goToResults();
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center shadow-lg transform animate-scaleIn">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Time's Up!</h2>
        <p className="text-gray-600 mb-2">The quiz has ended</p>
        <div className="mt-4">
          <div className="loader">
            <div className="loader-inner"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Viewing results in a moment...</p>
        </div>
      </div>
    </div>
  );
};