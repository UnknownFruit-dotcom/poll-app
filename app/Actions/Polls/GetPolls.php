<?php

namespace App\Actions\Polls;

use App\Models\Poll;
use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class GetPolls
{
    public function get(array $filters)
    {
        $query = Poll::query();

        if (!empty($filters['theme_id'])) {
            $query->where('theme_id', $filters['theme_id']);
        }

        return $query->get();
    }
}