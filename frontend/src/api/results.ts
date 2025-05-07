export async function saveResults(
  answeredCount: number,
  correctCount: number,
  score: number,
  answers: {
    question_id: number;
    selected_word: string;
    is_correct: boolean;
  }[]
): Promise<void> {
  const response = await fetch('http://127.0.0.1:8000/api/results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answered_count: answeredCount,
      correct_count: correctCount,
      score,
      answers,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save results');
  }
}