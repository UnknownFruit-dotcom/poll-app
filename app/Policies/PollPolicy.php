<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Poll;
use App\Models\User;

class PollPolicy 
{
    public function update(User $user, Poll $poll): Response
    {
        if ($poll->user_id === $user->id || $user->isAdmin()) {
            return Response::allow();
        }

        return Response::deny('You have no authority to update this poll');
    }
}
