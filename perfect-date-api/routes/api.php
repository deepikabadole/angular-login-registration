<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header( 'Access-Control-Allow-Headers:Access-Control-Allow-Origin, Authorization, Content-Type' );



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("login","AuthApiController@login");

Route::post("registration","AuthApiController@registration");

Route::group(['middleware' => 'auth:api'], function () {

    Route::get("get-auth-user", "ApiController@get_auth_user");

    Route::post("employees", "ApiController@store");

    Route::get("employees/{id}", "ApiController@edit");

    Route::get("employees", "ApiController@get");

    Route::post("/employees/update/{id}", "ApiController@update");

    Route::delete("employees/{id}", "ApiController@destroy");

});

Route::get("logout", "AuthApiController@logout");
