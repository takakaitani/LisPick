<?php

namespace App\Http\Controllers;

use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return Question::inRandomOrder()
            ->select('id', 'choice_a', 'choice_b')
            ->limit(10)
            ->get();
    }
}
