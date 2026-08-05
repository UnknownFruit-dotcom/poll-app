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

        $theme1 = Theme::create([
            'name' => 'Work',
        ]);

        $theme2 = Theme::create([
            'name' => 'Politics',
        ]);

        $theme3 = Theme::create([
            'name' => 'Entertainment',
        ]);

        $theme4 = Theme::create([
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

        $poll = Poll::create([
            'name' => 'Do you want to a work call on Saturday evening??',
            'theme_text' => 'Work',
            'theme_id' => $theme1->id,
        ]);

        $poll = Poll::create([
            'name' => 'Do you support Squiggly Miggly on president elections??',
            'theme_text' => 'Politics',
            'theme_id' => $theme2->id,
        ]);

        $poll = Poll::create([
            'name' => 'Hop on Needy Girl Overdose!',
            'theme_text' => 'Entertainment',
            'theme_id' => $theme3->id,
        ]);

        $poll = Poll::create([
            'name' => 'Are ypu a cat?',
            'theme_text' => 'Other',
            'theme_id' => $theme4->id,
        ]);
    }
}
