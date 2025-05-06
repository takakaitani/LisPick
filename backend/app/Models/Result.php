<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'answered_count',
        'correct_count',
        'score',
    ];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
