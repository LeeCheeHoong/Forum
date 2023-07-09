<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;
use Carbon\Carbon;

class CommentController extends Controller
{
    public function getComments($id)
    {
        // Get the comments for the given forum_id
        $comments = Comment::where('forum_id', $id)->get();

        // Prepare an array to store the results
        $results = [];

        foreach ($comments as $comment) {
            // Get the user's name from the users table using the comment's user_id
            $user = User::where('id', $comment->user_id)->first();
            $userName = $user ? $user->name : null;

            // Calculate the time difference of the comment datetime
            $dateTime = Carbon::parse($comment->created_at);
            $timeDiff = $dateTime->diffForHumans();

            // Prepare the result object
            $result = [
                'id' => $comment->id,
                'forum_id' => $comment->forum_id,
                'user_name' => $userName,
                'user_id' => $comment->user_id,
                'time_diff' => $timeDiff,
                'content' => $comment->content,
            ];

            // Add the result object to the array
            $results[] = $result;
        }

        // Return the results
        return response()->json(['comments' => $results]);
    }

    public function newComment(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'forum_id' => 'required|integer',
            'content' => 'required|string',
        ]);

        // Create a new comment instance
        $comment = new Comment();
        $comment->user_id = $validatedData['user_id'];
        $comment->forum_id = $validatedData['forum_id'];
        $comment->content = $validatedData['content'];

        // Save the comment
        $comment->save();

        // Return a response
        return response()->json(['message' => 'New comment added successfully', 'comment' => $comment]);
    }

    public function deleteComment(Request $request)
    {
        $comment_id = $request->comment_id;
        $user_id = $request->user_id;
        // Retrieve the comment by the given comment_id
        $comment = Comment::where('id', $comment_id)->first();

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        // Check if the user_id matches the one in the comment
        if ($comment->user_id != $user_id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Delete the comment
        $comment->delete();

        // Return a success response
        return response()->json(['message' => 'Comment deleted successfully']);
    }

    public function editComment(Request $request)
    {
        $user_id = $request->user_id;
        $content = $request->content;
        $comment_id = $request->comment_id;

        $comment = Comment::where('id', $comment_id)->first();

        if ($comment) {
            if ($comment->user_id == $user_id) {
                $comment->content = $content;
                $comment->save();

                return response()->json(['message' => 'Comment updated successfully']);
            } else {
                return response()->json(['message' => 'Unauthorized access'], 403);
            }
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }
}
