import React, { useContext } from 'react';
import { RefreshCw, Home, Share2 } from 'lucide-react';
import { QuizContext } from '../context/QuizContext';
import { SocialShare } from './SocialShare';

export const ResultScreen: React.FC = () => {
  const { 
    questionsAnswered, 
    correctAnswers, 
    calculateScore,
    resetQuiz,
    goToHome
  } = useContext(QuizContext);
  
  const score = calculateScore();
  
  // Determine achievement level based on score
  let achievement = "Beginner";
  let achievementColor = "text-blue-500";
  
  if (score >= 80) {
    achievement = "Expert";
    achievementColor = "text-green-600";
  } else if (score >= 60) {
    achievement = "Advanced";
    achievementColor = "text-indigo-600";
  } else if (score >= 40) {
    achievement = "Intermediate";
    achievementColor = "text-yellow-600";
  }
  
  const shareText = `I scored ${score} on the English Pronunciation Quiz! My level: ${achievement}`;
  
  return (
    <div className="container max-w-md mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Results</h1>
          <p className="text-gray-600 mt-2">Here's how you did!</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="inline-block rounded-full bg-indigo-100 p-4 mb-4">
              <div className="text-5xl font-bold text-indigo-700">{score}</div>
              <div className="text-sm text-gray-500">points</div>
            </div>
            
            <h2 className={`text-xl font-semibold ${achievementColor} mb-1`}>
              {achievement}
            </h2>
            <p className="text-gray-500 text-sm">Pronunciation Level</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Questions:</span>
              <span className="font-semibold">{questionsAnswered}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-semibold text-green-600">{correctAnswers}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Accuracy:</span>
              <span className="font-semibold">
                {questionsAnswered > 0 
                  ? `${Math.round((correctAnswers / questionsAnswered) * 100)}%` 
                  : '0%'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={goToHome}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-3 rounded-lg transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button
              onClick={resetQuiz}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg transition-colors"
            >
              <RefreshCw size={18} />
              <span>Try Again</span>
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <p className="text-center text-sm text-gray-600 mb-4">
              <Share2 className="inline mr-1" size={14} />
              Share your results
            </p>
            <SocialShare shareText={shareText} />
          </div>
        </div>
      </div>
    </div>
  );
};