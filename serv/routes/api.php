<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ForumController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;

// use App\Http\Controllers\TopicController;
// use App\Http\Controllers\TopicController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// user
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/getUser/{id}', [UserController::class, 'getUser']);
Route::put('/update-customer', [UserController::class, 'updateCustomer']);

// topics
Route::get('/all-topics', [TopicController::class, 'getTopicList']);

// forums
Route::get('/forum/{id}', [ForumController::class, 'getForum']);
Route::get('/all-forums/{id}', [ForumController::class, 'getForumList']);
Route::post('/new-forum', [ForumController::class, 'insertForum']);
Route::put('/close-forum', [ForumController::class, 'closeForum']);

// comments
Route::get('/all-comments/{id}', [CommentController::class, 'getComments']);
Route::post('/new-comment', [CommentController::class, 'newComment']);
Route::put('/edit-comment', [CommentController::class, 'editComment']);
Route::delete('/delete-comment', [CommentController::class, 'deleteComment']);
