<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if (!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }

    protected function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    protected function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first()->token;
        if ($oldToken) return $oldToken;
        $token = Str::random(60);
        $this->saveToken($email, $token);
        return $token;
    }

    protected function saveToken($email, $token)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'E-mail does\'t found on our database.',
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Reset Email is send successfully, please check your inbox.'
        ], Response::HTTP_OK);
    }
}
