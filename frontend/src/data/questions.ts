import { Question } from '../types';

// Fetch question data from Laravel backend
export async function fetchQuizQuestions(): Promise<Question[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/questions');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Question[] = await response.json();
    return data.map((q) => ({
      id: q.id,
      correctWord: Math.random() < 0.5 ? q.choice_a : q.choice_b,
      choices: [q.choice_a, q.choice_b],
    }));
  } catch (error) {
    console.error('Failed to fetch quiz questions:', error);
    return [];
  }
}