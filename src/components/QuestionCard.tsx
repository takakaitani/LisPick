import React, { useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  choices: string[];
  correctAnswer: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ choices, correctAnswer }) => {
  const { answerQuestion } = useContext(QuizContext);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (choice: string) => {
    if (selectedAnswer) return; // Prevent multiple answers
    
    setSelectedAnswer(choice);
    setShowFeedback(true);
    
    const isCorrect = choice === correctAnswer;
    
    // Show feedback briefly before moving to next question
    setTimeout(() => {
      answerQuestion(isCorrect);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-gray-600 mb-2">Select the word you hear:</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = choice === correctAnswer;
          
          let buttonClass = "relative py-4 px-6 rounded-lg border-2 text-center transition-all duration-300 text-lg font-medium ";
          
          if (!selectedAnswer) {
            buttonClass += "border-gray-300 bg-white hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600";
          } else if (isSelected) {
            buttonClass += isCorrect 
              ? "border-green-500 bg-green-50 text-green-600" 
              : "border-red-500 bg-red-50 text-red-600";
          } else if (showFeedback && isCorrect) {
            buttonClass += "border-green-500 bg-green-50 text-green-600";
          } else {
            buttonClass += "border-gray-300 bg-white text-gray-400 opacity-70";
          }
          
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswer(choice)}
              disabled={!!selectedAnswer}
            >
              {choice}
              {showFeedback && isSelected && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </span>
              )}
              {showFeedback && !isSelected && isCorrect && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CheckCircle className="text-green-500" size={24} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};