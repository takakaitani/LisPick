import React, { useContext, useEffect, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { QuizContext } from '../context/QuizContext';
import { QuestionCard } from './QuestionCard';
import { TimeBar } from './TimeBar';
import { EndModal } from './EndModal';

export const QuizScreen: React.FC = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    playCurrentWord,
    timeRemaining,
    showEndModal,
    finishQuiz,
  } = useContext(QuizContext);

  const [isPlaying, setIsPlaying] = useState(false);

  // Play the word automatically when question changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePlayWord();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // クイズ終了時に finishQuiz をバックグラウンドで実行
  useEffect(() => {
    if (showEndModal) {
      finishQuiz();
    }
  }, [showEndModal, finishQuiz]);

  const handlePlayWord = () => {
    setIsPlaying(true);
    playCurrentWord();
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </div>
          <div className="text-sm font-medium text-gray-600">
            Time: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
        </div>
        
        <TimeBar />
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-center mb-8">
            <button 
              onClick={handlePlayWord} 
              disabled={isPlaying}
              className={`
                relative w-20 h-20 rounded-full flex items-center justify-center
                ${isPlaying 
                  ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'}
                transition-all duration-300 shadow-md
              `}
              aria-label="Play pronunciation"
            >
              {isPlaying ? (
                <div className="audio-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <Volume2 size={32} />
              )}
            </button>
          </div>
          
          {currentQuestion && (
            <QuestionCard 
              choices={currentQuestion.choices}
              correctAnswer={currentQuestion.correctWord}
            />
          )}
        </div>
      </div>
      
      {showEndModal && (
        <EndModal>
          <p>Quiz completed! Redirecting to results...</p>
        </EndModal>
      )}
    </div>
  );
};