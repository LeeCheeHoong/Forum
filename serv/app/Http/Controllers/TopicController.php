<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public static function getTopicList()
    {
        $topics = Topic::get()->toArray();

        foreach ($topics as &$topic) {
            $forumCount = Forum::where('topic_id', $topic['id'])->count();
            $topic['forum_count'] = $forumCount;
        }

        return $topics;
    }
}
