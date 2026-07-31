<?php

namespace App\Actions\Polls;

use App\Models\Poll;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AddOptions
{
    public function add(Poll $poll, array $options)
    {
        return DB::transaction(function () use ($poll, $options) {
            $existingCount = $poll->options()->count();

            if ($existingCount + count($options) > 10) {
                throw ValidationException::withMessages([
                    'options' => "Poll already has {$existingCount} options; cannot exceed 10 total.",
                ]);
            }

            $existingContents = $poll->options()->pluck('content')->all();
            $duplicates = array_intersect($options, $existingContents);

            if ($duplicates) {
                throw ValidationException::withMessages([
                    'options' => 'Some options already exist: ' . implode(', ', $duplicates),
                ]);
            }

            $created = [];

            foreach ($options as $content) {
                $created[] = $poll->options()->create([
                    'content' => $content,
                ]);
            }

            return $created;
        });
    }
}