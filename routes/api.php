<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ThemesController;
use App\Http\Controllers\Api\PollsController;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\VoteThrottle;

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::get('themes/{id}', [ThemesController::class, 'show']);

    Route::get('polls/my', [PollsController::class, 'showMy']);
    Route::get('polls/{id}', [PollsController::class, 'show']);

    Route::patch('polls/{poll}', [PollsController::class, 'update'])->middleware('can:update,poll');
    Route::patch('polls/{poll}/status', [PollsController::class, 'changeStatus'])->middleware('can:update,poll');

    Route::post('polls', [PollsController::class, 'store']);
    Route::post('polls/{poll}/options', [PollsController::class, 'addOptions'])->middleware('can:update,poll');
});

Route::middleware('auth:sanctum', 'role:admin')->group(function () {
    Route::post('themes', [ThemesController::class, 'store']);
    Route::delete('themes/{id}', [ThemesController::class, 'destroy']);
    Route::patch('themes/{theme}', [ThemesController::class, 'update']);
});

Route::get('themes', [ThemesController::class, 'index']);

Route::get('polls', [PollsController::class, 'index']);
Route::post('polls/{poll}/vote', [PollsController::class, 'chooseOption'])->middleware(['throttle:10,1', VoteThrottle::class]);
