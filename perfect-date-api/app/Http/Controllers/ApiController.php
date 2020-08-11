<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function get_auth_user()
    {
        $user = User::find(Auth::user()->id);
        return $user;


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $u = new User();
        $u->first_name = $request->firstName;
        $u->last_name = $request->lastName;
        $u->email = $request->emailId;
        $u->password = Hash::make(123456);
        $u->save();

        return response()->json(["status"=>"success"],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $res = User::find($id);
        
        return $res;
        //return response()->json(["status"=>"success","res"=>$res],200);
    }

    public function get(){

        $res = User::all();
        return $res;
       // return response()->json(["status"=>"success","res"=>$res],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $u = User::find($id);
        if ($request->hasfile('image')) {
            $file = $request->file("image");
            $back_image = time() . "_" . $file->getClientOriginalName();
            $path = $file->storeAs('public/profile-images', $back_image);
        } else {
            $back_image = $u->photo;
        }
        $u->first_name = $request->firstName;
        $u->last_name = $request->lastName;
        $u->email = $request->emailId;
        $u->profile_image = $back_image;
        $u->save();
        
//        return true;
        return response()->json(["status"=>"success"],200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $u = User::find($id)->delete();
        //return true;
        return response()->json(["status"=>"success"],200);

    }
}
