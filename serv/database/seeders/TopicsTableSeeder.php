<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $topics = [
            ['id' => 1, 'name' => 'College announcement', 'description' => 'Announcements related to college events, news, and activities.'],
            ['id' => 2, 'name' => 'Rental', 'description' => 'Renting properties, apartments, houses, or items like cars, tools, or equipment.'],
            ['id' => 3, 'name' => 'Selling', 'description' => 'Selling items, products, or services to interested buyers.'],
            ['id' => 4, 'name' => 'Buying', 'description' => 'Looking for specific items or services to purchase from sellers.'],
            ['id' => 5, 'name' => 'Sharing resources', 'description' => 'Sharing helpful resources, such as study materials, tutorials, or guides.'],
            ['id' => 6, 'name' => 'Question', 'description' => 'Asking questions and seeking answers or advice from the community.'],
            ['id' => 7, 'name' => 'Others', 'description' => 'Topics that do not fit into any specific category.'],
        ];

        DB::table('topics')->insert($topics);
    }
}
