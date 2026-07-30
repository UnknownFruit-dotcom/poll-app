<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Theme;
use App\Models\Poll;
use App\Models\Option;
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

        $poll = Poll::create([
            'name' => 'Do you want to chip in for blinds??',
            'theme_text' => 'Education',
            'theme_id' => $theme->id,
        ]);

        Option::create([
            'poll_id' => $poll->id,
            'content' => 'Sure...',
        ]);

        Option::create([
            'poll_id' => $poll->id,
            'content' => 'Nah',
        ]);

        Option::create([
            'poll_id' => $poll->id,
            'content' => 'I will think about it',
        ]);
    }
}
