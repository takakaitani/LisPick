import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

export const TimeBar: React.FC = () => {
  const { timeRemaining, totalTime } = useContext(QuizContext);
  const progress = (timeRemaining / totalTime) * 100;
  
  // Color changes as time runs out
  let barColor = "bg-green-500";
  if (progress < 60) barColor = "bg-yellow-500";
  if (progress < 30) barColor = "bg-red-500";

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
      <div 
        className={`h-full ${barColor} transition-all duration-1000 ease-linear`} 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};