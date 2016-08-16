<?php
/**
 * Created by PhpStorm.
 * User: yangchao
 * Date: 8/15/16
 * Time: 03:29
 */

namespace App\Http\Controllers;
use App\Models\Users;

define('ENCRYPT', env('APP_ENCRYPT'));
class userController extends Controller
{
    function __construct()
    {
        parent::__construct();
        $this->default_login_interval = 600;

        $this->default_session_interval = 3600;

        $this->final_ts = 1800000000;
    }

    function _auth() {
        $rst = array(
            'status' => 0,
            'msg'=>'auth'
        );

        return json_encode($rst);
    }

    function _login() {
        $rst = array(
            'status'=>-1,
            'msg'=>'',
            'login'=>0
        );
        $check_ret = $this->_check_params('login');
        if($check_ret !== true) {
            $rst['msg'] = $check_ret;
            return $this->response($rst);
        }
        $s_ts = time();
        if($s_ts<$this->input['timestamp'] || $this->input['timestamp']-$s_ts > $this->default_login_interval){
            $rst['msg'] = 'login info expired!';
            return $this->response($rst);
        }

        $user_model = new Users();
        $ret = $user_model->check_login($this->input);
        if($ret['state'] === true){
            $rst['status'] = 0;
            $rst['msg'] = 'welcome';
            $rst['login'] = 1;
            $vts = $s_ts + $this->default_session_interval;
            $vcode = md5($ret['uuid'].$vts.ENCRYPT);
            setcookie('vts',$vts, $vts, '/', null, false);
            setcookie('user_type',$ret['user_type'], $this->final_ts, '/', null, false);
            setcookie('uuid',$ret['uuid'], $this->final_ts, '/', null, true);
            setcookie('vcode',$vcode, $vts, '/', null, true);

            return $this->response($rst);
        }else{
            $rst['msg'] = $ret['msg'];
            return $this->response($rst);
        }
    }

    function _check_params($p) {
        $params = array(
            'login'=>['email_addr', 'timestamp', 'p_code'],
            'register'=>['email_addr', 'password'],
        );
        $cookies = array(
            'login'=>[],
            'register'=>[]
        );
        foreach($params[$p] as $k) {
            if(!isset($this->input[$k])) {
                return 'lack of '.$k;
            }
        }
        foreach($cookies[$p] as $k) {
            if(!isset($this->input[$k])) {
                return 'lack of '.$k.' in cookie.';
            }
        }
        return true;
    }

    function _register() {
        $rst = array(
            'status'=>-1,
            'msg'=>'',
            'login'=>0
        );
        $check_ret = $this->_check_params('register');
        if($check_ret !== true) {
            $rst['msg'] = $check_ret;
            return $this->response($rst);
        }
    }

    function register_get(){
        return $this->_register();
    }

    function register_post(){
        return $this->_register();
    }

    function login_get() {
        return $this->_login();
    }

    function login_post() {
        return $this->_login();
    }

    function auth_get() {
        return $this->_auth();
    }

    function auth_post() {
        return $this->_auth();
    }
}