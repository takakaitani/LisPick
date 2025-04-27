import React, { useContext } from 'react';
import { TopScreen } from './TopScreen';
import { QuizScreen } from './QuizScreen';
import { ResultScreen } from './ResultScreen';
import { QuizContext } from '../context/QuizContext';

export const Router: React.FC = () => {
  const { screen } = useContext(QuizContext);

  switch (screen) {
    case 'top':
      return <TopScreen />;
    case 'quiz':
      return <QuizScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <TopScreen />;
  }
};