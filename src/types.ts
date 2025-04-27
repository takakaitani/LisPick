export type Screen = 'top' | 'quiz' | 'result';

export interface Question {
  id: number;
  correctWord: string;
  choices: string[];
}