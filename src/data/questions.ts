import { Question } from '../types';

// Sample question data
// In a real app, this would be a larger database with more word pairs
export const quizQuestions: Question[] = [
  {
    id: 1,
    correctWord: 'accept',
    choices: ['accept', 'except'],
  },
  {
    id: 2,
    correctWord: 'affect',
    choices: ['affect', 'effect'],
  },
  {
    id: 3,
    correctWord: 'lose',
    choices: ['lose', 'loose'],
  },
  {
    id: 4,
    correctWord: 'weather',
    choices: ['weather', 'whether'],
  },
  {
    id: 5,
    correctWord: 'quiet',
    choices: ['quiet', 'quite'],
  },
  {
    id: 6,
    correctWord: 'principal',
    choices: ['principal', 'principle'],
  },
  {
    id: 7,
    correctWord: 'breath',
    choices: ['breath', 'breathe'],
  },
  {
    id: 8,
    correctWord: 'desert',
    choices: ['desert', 'dessert'],
  },
  {
    id: 9,
    correctWord: 'their',
    choices: ['their', 'there'],
  },
  {
    id: 10,
    correctWord: 'whose',
    choices: ['whose', 'who\'s'],
  },
];