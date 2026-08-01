<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\RateLimiter;

class VoteThrottle
{
    public function handle(Request $request, Closure $next): Response
    {
        $poll = $request->route('poll');
        $key = 'vote:'.$poll->id.':'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 1)) {
            abort(429, 'Too many votes');
        }

        RateLimiter::hit($key, 600);

        return $next($request);
    }
}
