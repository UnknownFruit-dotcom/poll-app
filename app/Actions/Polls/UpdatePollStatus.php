<?php

namespace App\Actions\Polls;

use App\Models\Poll;
use App\Enums\Status;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class UpdatePollStatus
{
    public function change(Poll $poll, array $input) : Poll 
    {
        return DB::transaction(function () use ($poll, $input) {
            $newStatus = Status::from($input['status']);

            if ($poll->status === $newStatus) {
                return $poll;
            }

            if ($newStatus === Status::Published) {
                $poll->published_at = now();
            }

            if ($newStatus === Status::Draft) {
                 $poll->published_at = null;
            }

            $poll->status = $newStatus;
            $poll->save();

            return $poll;
        });
    }
}