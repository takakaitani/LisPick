export type Screen = 'top' | 'quiz' | 'result';

export interface Question {
  id: number;
  correctWord: string;
  choices: string[];
}

export interface Answer {
  id: number;
  selectedWord: string;
  isCorrect: boolean;
}