<?php
/**
 * Created by PhpStorm.
 * User: yangchao
 * Date: 8/16/16
 * Time: 00:29
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Users extends Model {
    protected $table = 'cp_users';
    public $timestamps = false;

    /**
     * @param $params 'email_addr', 'ts', 'p_code'
     */
    function check_login($params) {
        $rst = array(
            'state'=>false,
            'msg'=>'',
            'user_type'=>'guest',
            'uuid'=>''
        );
        $ut = 'student';
        if(isset($params['user_type'])){
            $ut = $params['user_type'];
        }
        $users = Users::select('password', 'uuid', 'user_type')->where('email_addr', $params['email_addr'])
            ->where('user_type',$ut)->take(1)->get();
        if(count($users) <1) {
            $rst['msg'] = 'invalid user or wrong password.';
            return $rst;
        }
        $user = $users[0];
        $s_pwd = $user['password'];
        $s_pcode = md5($s_pwd.$params['timestamp']);
        if($s_pcode === $params['p_code']) {
            $rst['state'] = true;
            $rst['user_type'] = $user['user_type'];
            $rst['uuid'] = $user['uuid'];
            return $rst;
        }
        $rst['msg'] = 'invalid user or wrong password!';
        return $rst;
    }
}