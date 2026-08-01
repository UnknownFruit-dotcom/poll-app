<?php

namespace App\Actions\Polls;

use App\Models\Poll;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\UserVote;

class ChooseOption
{
    public function vote(Poll $poll, array $input, ?int $userId = null)
    {
        return DB::transaction(function () use ($poll, $input, $userId) {
            $option = $poll->options()->findOrFail($input['option_id']);

            if ($userId !== null) {
                $alreadyVoted = UserVote::query()
                    ->where('user_id', $userId)
                    ->whereIn('option_id', $poll->options()->select('id'))
                    ->exists();

                if ($alreadyVoted) {
                    throw ValidationException::withMessages([
                        'option_id' => 'Вы уже голосовали в этом опросе.',
                    ]);
                }
            }

            return UserVote::create([
                'option_id' => $option->id,
                'user_id'   => $userId,
            ]);
        });
    }
}