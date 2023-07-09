<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\User;
use App\Models\Comment;
use App\Models\Topic;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ForumController extends Controller
{
    public function getForum($id)
    {
        // Retrieve the selected forum
        $selectedForum = Forum::where('id', $id)->first();
        if (!$selectedForum) {
            return response()->json(['message' => 'Forum not found'], 404);
        }

        // Retrieve the user's name from the users table using the forum's user_id
        $user = User::where('id', $selectedForum->user_id)->first();
        $userName = $user ? $user->name : null;

        // Retrieve the comments from the comments table that match the forum_id
        $comments = Comment::where('forum_id', $id)->get();
        $topic = Topic::where('id', $selectedForum->topic_id)->first();
        // Prepare the result object
        $forum = [
            'id' => $selectedForum->id,
            'user_name' => $userName,
            'user_id' => $user->id,
            'content' => $selectedForum->content,
            'title' => $selectedForum->title,
            'topic_id' => $selectedForum->topic_id,
            'topic_name' => $topic->name,
            'time_diff' => Carbon::parse($selectedForum->created_at)->diffForHumans(),
            'status' => $selectedForum->status,
        ];
        $result['forum'][] = $forum;

        // Iterate through the comments and add them to the result object
        foreach ($comments as $comment) {
            $commentUser = User::where('id', $comment->user_id)->first();
            $commentUserName = $commentUser ? $commentUser->name : null;

            $commentResult = [
                'id' => $comment->id,
                'user_name' => $commentUserName,
                'user_id' => $commentUser->id,
                'content' => $comment->content,
                'time_diff' => Carbon::parse($comment->created_at)->diffForHumans(),
            ];

            $result['comments'][] = $commentResult;
        }

        // Return the result
        return $result;
    }

    public function getForumList($topic_id)
    {
        // Get the forums for the given topic_id
        $forums = Forum::where('topic_id', $topic_id)->get();
        $topic = Topic::where('id', $topic_id)->first();

        // Prepare an array to store the results
        $results = [];

        foreach ($forums as $forum) {
            // Get the user's name from the users table using the forum's user_id
            $user = User::where('id', $forum->user_id)->first();

            $userName = $user ? $user->name : null;

            // Get the comments from the comments table that have a matching forum_id
            $comments = Comment::where('forum_id', $forum->id)->get();

            // Calculate the time difference of the forum datetime
            $dateTime = Carbon::parse($forum->created_at);
            $timeDiff = $dateTime->diffForHumans();

            // Prepare the result object
            $result = [
                'id' => $forum->id,
                'topic_id' => $forum->topic_id,
                'user_name' => $userName,
                'comments' => $comments,
                'time_diff' => $timeDiff,
                'title' => $forum->title,
                'status' => $forum->status,
                'content' => $forum->content,
            ];

            // Add the result object to the array
            $results[] = $result;
        }

        $closed_forums_count = Forum::where('topic_id', $topic_id)->where('status', 0)->count();
        $open_forums_count =  Forum::where('topic_id', $topic_id)->where('status', 1)->count();
        // Return the results
        return response()->json(['forums' => $results, 'closed_forums_count' => $closed_forums_count, 'open_forums_count' => $open_forums_count, 'topic_name' => $topic->name]);
    }

    public function insertForum(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'user_id' => 'required|integer',
        ]);

        // Create a new forum instance
        $forum = new Forum();
        $forum->title = $request->title;
        $forum->content = $request->content;
        $forum->user_id = $request->user_id;
        $forum->topic_id = $request->topic_id;
        $forum->status = 1;

        // Save the forum record
        $forum->save();

        // Return a response
        return response()->json(['message' => 'Forum created successfully', 'forum' => $forum], 201);
    }

    public function closeForum(Request $request)
    {
        // Get the authenticated user
        $user_id = $request->user_id;
        $forum_id = $request->forum_id;
        // Find the forum by forum_id
        $forum = Forum::where('id', $forum_id)->first();

        // Check if the forum exists and user_id matches
        if ($forum && $forum->user_id === $user_id) {
            $forum->status = 0;
            $forum->save();
            return response()->json(['message' => 'Forum status updated successfully']);
        }

        return response()->json(['message' => 'Unable to close forum. User mismatch or forum not found', 'error' => true], 200);
    }
}
