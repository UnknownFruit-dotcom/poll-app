<?php

namespace App\Actions\Polls;

use App\Models\Poll;
use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class UpdatePoll
{
    public function update(Poll $poll, array $input): Poll
    {
        return DB::transaction(function () use ($poll, $input) {
            if (array_key_exists('name', $input)) {
                $poll->name = $input['name'];
            }

            if (array_key_exists('theme_id', $input) || array_key_exists('theme_text', $input)) {
                [$themeId, $themeText] = $this->resolveTheme(
                    $input['theme_id'] ?? null,
                    $input['theme_text'] ?? null,
                );

                $poll->theme_id = $themeId;
                $poll->theme_text = $themeText;
            }

            $poll->save();
            
            return $poll;
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