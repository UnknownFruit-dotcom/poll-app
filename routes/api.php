<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ThemesController;
use App\Http\Controllers\Api\PollsController;

Route::get('themes', [ThemesController::class, 'index']);
Route::get('polls', [PollsController::class, 'index']);