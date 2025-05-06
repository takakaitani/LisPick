<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Answer;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'answered_count' => 'required|integer',
            'correct_count' => 'required|integer',
            'score' => 'required|integer',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.selected_word' => 'required|string',
            'answers.*.is_correct' => 'required|boolean',
        ]);

        // `results` テーブルにデータを登録
        $result = Result::create([
            'answered_count' => $validated['answered_count'],
            'correct_count' => $validated['correct_count'],
            'score' => $validated['score'],
        ]);

        // `answers` テーブルにデータを登録
        foreach ($validated['answers'] as $answer) {
            Answer::create([
                'result_id' => $result->id,
                'question_id' => $answer['question_id'],
                'selected_word' => $answer['selected_word'],
                'is_correct' => $answer['is_correct'],
            ]);
        }

        return response()->json($result, 201);
    }

    // debug
    public function getResult()
    {
        return Result::select('id', 'answered_count', 'correct_count', 'score')
            ->get();
    }
}
