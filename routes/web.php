<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

Route::inertia('/', 'home')->name('home');
Route::inertia('/my_polls', 'my-polls')->name('my-polls');
Route::inertia('/top_polls', 'top-polls')->name('top-polls');

Route::middleware('guest')->group(function () {
    Route::inertia('/register', 'auth/register')->name('register.store');
    Route::post('/register', RegisterController::class);
    
    // Route::inertia('/register', 'auth/register')->name('register');       
    // Route::post('/register', RegisterController::class)->name('register.store');  
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
