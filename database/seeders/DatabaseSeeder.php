<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Theme;
use App\Models\Poll;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $theme = Theme::create([
            'name' => 'Education',
        ]);

        Theme::create([
            'name' => 'Work',
        ]);

        Theme::create([
            'name' => 'Politics',
        ]);

        Theme::create([
            'name' => 'Entertainment',
        ]);

        Theme::create([
            'name' => 'Other',
        ]);

        Poll::create([
            'name' => 'Do you want to chip in for blinds??',
            'theme_text' => 'Education',
            'theme_id' => $theme->id,
        ]);
    }
}
