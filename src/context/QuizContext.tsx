import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchQuizQuestions } from '../data/questions';
import { Question, Screen } from '../types';

interface QuizContextType {
  screen: Screen;
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  totalQuestions: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeRemaining: number;
  totalTime: number;
  showEndModal: boolean;
  isLoading: boolean;
  startQuiz: () => void;
  playCurrentWord: () => void;
  answerQuestion: (isCorrect: boolean) => void;
  calculateScore: () => number;
  resetQuiz: () => void;
  goToHome: () => void;
  goToResults: () => void;
}

export const QuizContext = createContext<QuizContextType>({} as QuizContextType);

interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>('top');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const [showEndModal, setShowEndModal] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalQuestions = questions.length;
  const totalTime = 120; // 2 minutes in seconds

  const currentQuestion = currentQuestionIndex < totalQuestions
    ? questions[currentQuestionIndex]
    : null;

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (screen === 'quiz' && timeRemaining > 0 && !showEndModal) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowEndModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [screen, timeRemaining, showEndModal]);

  // Voice synthesis for pronunciation
  const speakWord = useCallback((word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.9; // Slightly slower for better pronunciation
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  }, []);

  const playCurrentWord = useCallback(() => {
    if (currentQuestion) {
      speakWord(currentQuestion.correctWord);
    }
  }, [currentQuestion, speakWord]);

  const startQuiz = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchQuizQuestions();
      setQuestions(data);
      setScreen('quiz');
      setCurrentQuestionIndex(0);
      setQuestionsAnswered(0);
      setCorrectAnswers(0);
      setTimeRemaining(totalTime);
      setShowEndModal(false);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [questions, totalTime]);

  const answerQuestion = useCallback((isCorrect: boolean) => {
    setQuestionsAnswered(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    // Move to next question or results if done
    setCurrentQuestionIndex(prev => {
      const nextIndex = prev + 1;
      if (nextIndex >= totalQuestions) {
        setShowEndModal(true);
      }
      return nextIndex;
    });
  }, [totalQuestions]);

  const calculateScore = useCallback(() => {
    // Basic formula: (correct / total) * 100, rounded to whole number
    const baseScore = questionsAnswered > 0 
      ? Math.round((correctAnswers / questionsAnswered) * 100)
      : 0;

    return baseScore;
  }, [correctAnswers, questionsAnswered]);

  const resetQuiz = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  const goToHome = useCallback(() => {
    setScreen('top');
  }, []);

  const goToResults = useCallback(() => {
    setScreen('result');
    setShowEndModal(false);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        screen,
        currentQuestionIndex,
        currentQuestion,
        totalQuestions,
        questionsAnswered,
        correctAnswers,
        timeRemaining,
        totalTime,
        showEndModal,
        isLoading,
        startQuiz,
        playCurrentWord,
        answerQuestion,
        calculateScore,
        resetQuiz,
        goToHome,
        goToResults
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};