<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property int $id
 * @property string $name
 * @property string $theme_text
 * @property int|null $theme_id
 * @property Status $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $published_at
 * 
 * @property-read Theme|null $theme
 * @property-read Collection<int, Option> $options
 */
#[Fillable(['name', 'theme_text', 'theme_id'])]
class Poll extends Model
{
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'status' => Status::class,
        ];
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }

    public function options(): HasMany
    {
    return $this->hasMany(Option::class);
    }

    public function isPublished(): bool
    {
        return $this->status === Status::Published;
    }
}