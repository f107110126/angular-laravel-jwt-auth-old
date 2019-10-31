@component('mail::message')
# Change Password Request

If this request is send by yourself, click on the button to change password.

@component('mail::button', ['url' => 'http://127.0.0.1:4200/response-password-reset?token=' . $token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
