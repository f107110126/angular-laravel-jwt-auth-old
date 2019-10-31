<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        $log = $this->getPasswordResetTableRow($request);
        if ($log === null) return $this->tokenInvalidResponse();
        return $this->changePassword($log, $request);
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where('token', $request->resetToken)->first();
    }

    private function tokenInvalidResponse()
    {
        return response()->json([
            'error' => 'Token Invalid.'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($log, $request) {
        $user = User::whereEmail($log->email)->first();
        $user->password = $request->password;
        $user->save();
        return response()->json([
            'data'=>'Password Successfully Changed.'
        ],Response::HTTP_OK);
    }
}
