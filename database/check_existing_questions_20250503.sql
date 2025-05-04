-- check existing questions
SELECT choice_a, choice_b, COUNT(*)
FROM questions
GROUP BY choice_a, choice_b
HAVING COUNT(*) > 1;