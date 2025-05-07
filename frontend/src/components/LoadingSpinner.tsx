import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useContext(QuizContext);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <div className="loader mb-4"></div>
        <p className="text-gray-600">Loading quiz...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;