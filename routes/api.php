<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ThemesController;
use App\Http\Controllers\Api\PollsController;
use App\Http\Middleware\VoteThrottle;

Route::get('themes', [ThemesController::class, 'index']);
Route::get('themes/{id}', [ThemesController::class, 'show']);
Route::post('themes', [ThemesController::class, 'store']);
Route::delete('themes/{id}', [ThemesController::class, 'destroy']);
Route::patch('themes/{theme}', [ThemesController::class, 'update']);
Route::get('polls', [PollsController::class, 'index']);
Route::get('polls/{id}', [PollsController::class, 'show']);
Route::post('polls', [PollsController::class, 'store']);
Route::post('polls/{poll}/options', [PollsController::class, 'addOptions']);
Route::post('polls/{poll}/vote', [PollsController::class, 'chooseOption'])->middleware(['throttle:10,1', VoteThrottle::class]);
Route::patch('polls/{poll}', [PollsController::class, 'update']);
Route::patch('polls/{poll}/status', [PollsController::class, 'changeStatus']);