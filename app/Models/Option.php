<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $poll_id
 * @property string $content
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property-read Poll|null $poll
 */
#[Fillable(['poll_id', 'content'])]
class Option extends Model
{
    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function userVotes(): HasMany
    {
        return $this->hasMany(UserVote::class);
    }
}
