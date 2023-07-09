<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Check if email already exists
        $emailExists = User::where('email', $request->email)->exists();
        if ($emailExists) {
            return response()->json(['message' => 'Email already taken', 'error' => true], 201);
        }
        // Validate the request data
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        // Hash the password
        $hashedPassword = Hash::make($request->password);

        // Create and save the user
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $hashedPassword;
        $user->save();

        // Return a response or redirect as needed
        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Retrieve the user by email
        $user = User::where('email', $request->email)->first();

        // Check if the user exists and if the provided password matches the stored hashed password
        if ($user && Hash::check($request->password, $user->password)) {
            // Authentication successful, redirect or return response as needed
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        }

        // Authentication failed, throw an exception
        return response()->json(['message' => 'Invalid credentials', 'error' => true], 200);
    }

    public function getUser(Request $request)
    {
        $id = $request->id;
        return User::where('id', $id)->first();
    }

    public function updateCustomer(Request $request)
    {
        $id = $request->id;
        if (isset($id)) {
            $user = User::where('id', $id)->first();
            if (isset($user)) {
                if (isset($request->email)) {
                    $existingEmail = User::where('email', $request->email)->whereNot('id', $id)->first();
                    if ($existingEmail) {
                        return response()->json(['message' => 'Email already exists', 'error' => true], 200);
                    }
                    $user->email = $request->email;
                }
                // Update the user's profile
                if (isset($request->password)) {
                    $user->password = Hash::make($request->password);
                }
                if (isset($request->name)) {
                    $user->name = $request->name;
                }
                // Save the updated user
                $user->save();
                // Return a response
                return response()->json(['message' => 'User profile updated successfully', 'error' => false], 200);
            }
        }
        return response()->json(['message' => 'User Not Found', 'error' => true], 200);
    }
}
