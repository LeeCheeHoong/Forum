<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// user
Route::post('/register', 'UserController@createUser');
Route::post('/login', 'UserController@login');

// topics
Route::get('/all-topics', 'Topic@getTopicList');

// forums
Route::get('/all-forums/{id}', 'ForumController@getForumList');
Route::post('/new-forum', 'ForumController@insertForum');

// comments
Route::get('/all-comments/{id}', 'CommentController@getComments');
