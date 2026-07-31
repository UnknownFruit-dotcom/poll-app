<?php

namespace App\Actions\Polls;

use App\Models\Poll;
use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class CreatePoll
{
    /**
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): Poll
    {
        return DB::transaction(function () use ($input) {
            [$themeId, $themeText] = $this->resolveTheme(
                $input['theme_id'] ?? null,
                $input['theme_text'] ?? null,
            );

            $poll = Poll::create([
                'name' => $input['name'],
                'theme_text' => $themeText,
                'theme_id' => $themeId,
                'status' => $input['status'] ?? 'draft',
                'published_at' => $input['published_at'] ?? null,
            ]);

            foreach ($input['options'] ?? [] as $optionContent) {
                $poll->options()->create([
                    'content' => $optionContent,
                ]);
            }

            return $poll->load('options');
        });
    }

    private function resolveTheme(?int $themeId, ?string $themeText): array
    {
        if ($themeId) {
            return [$themeId, Theme::findOrFail($themeId)->name];
        }
    
        $othersId = Theme::firstOrCreate(['name' => 'Other'])->id;
    
        return [$othersId, $themeText];
    }
}