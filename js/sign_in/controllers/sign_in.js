/**
 * Created by yangchao on 8/16/16.
 */
define(['app','./js/sign_in/services/sign_in'],
    function(app) {
        app.register.controller('SignInController', ['$scope','SignInService',
            function($scope, $data) {
                $scope.user = {
                    email_addr : '',
                    password: '',
                    type: get_user_type()
                };

                $scope.loginProcess = function() {
                    if($scope.user.email_addr.length<1){
                        alert('Invalid email address!');
                        return false;
                    }
                    if($scope.user.password.length<6){
                        alert('Invalid email address!');
                        return false;
                    }
                    _loginProcess();
                };

                function get_user_type(){
                    var type = __tools__.getHashString('t');
                    if (type === 'teacher' || type === 'student') {
                        return type;
                    }
                    return 'student';
                }

                function _loginProcess() {
                    var xpwd = $.md5($scope.user.email_addr+$scope.user.password);
                    var ts = Math.round(new Date().getTime()/1000);
                    var params = {
                        email_addr : $scope.user.email_addr,
                        timestamp: ts,
                        p_code : $.md5(xpwd+ts),
                        user_type: $scope.user.type
                    };
                    $data.login(params).then(function(data) {
                        if(data.login === 0){
                            alert('failed to login')
                            return false;
                        }else if (data.login === 1) {
                            return true;
                        }
                    });
                }




                function init() {
                    $('title').text('Sign In');
                }

                init();
            }]);
    });