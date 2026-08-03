<?php

namespace App\Actions\Themes;

use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class UpdateTheme
{
    public function update(Theme $theme, array $input) {
        return DB::transaction(function () use ($theme, $input) {
            $theme->fill($input)->save();

            return $theme;
        });
    }
}