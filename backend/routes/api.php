<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;

Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/results', [ResultController::class, 'store']);