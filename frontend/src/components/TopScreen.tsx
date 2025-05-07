import React, { useContext } from 'react';
import { Play } from 'lucide-react';
import { QuizContext } from '../context/QuizContext';

export const TopScreen: React.FC = () => {
  const { startQuiz } = useContext(QuizContext);

  return (
    <div className="container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          Lis<span className="text-blue-500">Pick</span>
        </h1>
        <h2 className="text-xl text-gray-600 mb-8">English Pronunciation Quiz</h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition-transform hover:scale-[1.02]">
          <p className="text-gray-700 mb-6">
            Test your English pronunciation skills by identifying the correct word based on how it sounds.
            Listen carefully and choose the right option!
          </p>

          <button
            onClick={startQuiz}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition-colors duration-300 shadow-md"
          >
            <Play size={20} />
            Start Quiz
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Complete 10 challenges to test your pronunciation skills
        </p>
      </div>
    </div>
  );
};