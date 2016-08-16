<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


route_like_ci();




function route_like_ci() {
    $contentType = $_SERVER['CONTENT_TYPE'];
    if(strstr($contentType,"json")) {
        // application/json
        $input = file_get_contents("php://input");
        $reqArr = json_decode($input,true);
        foreach($reqArr as $k=>$v) {
            $_REQUEST[$k] = $v;
        }
    }

    if (isset($_REQUEST['c']) && isset($_REQUEST['m'])) {
        $str = $_REQUEST['c'].'Controller@'.$_REQUEST['m'];
        Route::get('/', $str.'_get');
        Route::post('/', $str.'_post');
    }
}

