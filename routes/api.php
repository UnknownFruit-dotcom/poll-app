<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ThemesController;

Route::get('themes', [ThemesController::class, 'index']);