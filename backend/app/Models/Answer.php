<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'result_id',
        'question_id',
        'selected_word',
        'is_correct',
        'answered_at',
    ];
}