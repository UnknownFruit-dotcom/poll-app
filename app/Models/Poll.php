<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $theme
 * @property int|null $theme_id
 * @property Status $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $published_at
 * 
 * @property-read Theme|null $themeRelation
 */
#[Fillable(['name', 'theme', 'theme_id'])]
class Poll extends Model
{
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'status' => Status::class,
        ];
    }

    public function themeRelation(): BelongsTo
    {
        return $this->belongsTo(Theme::class, 'theme_id');
    }

    public function isPublished(): bool
    {
        return $this->status === Status::Published;
    }
}