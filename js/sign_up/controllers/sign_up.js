/**
 * Created by yangchao on 8/16/16.
 */
define(['app','./js/sign_up/services/sign_up'],
    function(app) {
        app.register.controller('SignUpController', ['$scope','SignUpService',
            function($scope, $data) {
                $scope.user = {
                    eamil_addr :'',
                    password: '',
                    password2: ''
                };

                $scope.registerProcess = function(){
                    if($scope.user.email_addr.length<1){
                        alert('invalid email address!');
                        return false;
                    }
                    if($scope.user.password.length<1){
                        alert('invalid email password!');
                        return false;
                    }
                    if($scope.user.password !== $scope.user.password2){
                        alert('two passwords not match!');
                        return false;
                    }
                    _registerProcess();
                };

                function _registerProcess(){
                    var params = {
                        email_addr: $scope.user.eamil_addr,
                        password: $.md5($scope.user.email_addr+$scope.user.password)
                    };
                    $data.register(params).then(function(data){
                        if(data.new_user === 0){
                            alert('failed to register');
                            return false;
                        }else if (data.new_user === 1) {
                            alert('Welcome!');
                            return true;
                        }
                    });
                }


                function init() {
                    $('title').text('Sign Up');
                }

                init();
            }]);
    });