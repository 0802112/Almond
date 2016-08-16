<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function _index()
    {
        $rst = array(
            'status' => '0',
            'msg'=> 'index'
        );
        return json_encode($rst);
    }
}
