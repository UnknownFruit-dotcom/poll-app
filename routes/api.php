<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ThemesController;
use App\Http\Controllers\Api\PollsController;

Route::get('themes', [ThemesController::class, 'index']);
Route::get('themes/{id}', [ThemesController::class, 'show']);
Route::post('themes', [ThemesController::class, 'store']);
Route::delete('themes/{id}', [ThemesController::class, 'destroy']);
Route::get('polls', [PollsController::class, 'index']);
Route::get('polls/{id}', [PollsController::class, 'show']);
Route::post('polls', [PollsController::class, 'store']);
Route::post('polls/{poll}/options', [PollsController::class, 'addOptions']);