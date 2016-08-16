<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

class Controller extends BaseController
{
    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    function __construct()
    {
        $this->cookies = $_COOKIE;
        $this->input = $_REQUEST;
    }

    function response($rst) {
        $str = '';
        if(is_array($rst)||is_object($rst)){
            $str = json_encode($rst);
        }else {
            $str = $rst;
        }
        return response($str, 200)->header("Content-Type", "application/json; charset=utf-8");
    }
}
