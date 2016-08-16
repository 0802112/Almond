/**
 * Created by yangchao on 8/5/16.
 */
define(function (){
    function _toLogin() {
        if(location.href.indexOf('login.html')>0) {
            return true;
        }
        var pageUrl = location.href;
        location.href = './#/login?redirectUrl='+encodeURI(pageUrl);
    }

    function _loadUserInfo() {
        $('#loginBtn').show();
        $('#logoutBtn').hide();
        $('#currentUserPhone').html('').hide();

        var cup1 = __tools__.getCookie('current_user_phone');
        var validTime = __tools__.getCookie('valid_time');
        if(cup1 === null || validTime === null) {
            // 未登录
            return 1;
        }
        var now = Math.round(new Date().getTime()/1000);
        if(now > validTime - 10) {
            // 登陆信息已过期
            return 2;
        }
        var realPhone = __tools__.base64Decoder(cup1);
        $('#loginBtn').hide();
        $('#currentUserPhone').html(realPhone+ ' |').show();

        function logoutBtnClick() {
            __tools__.delCookie('valid_time');
            _loadUserInfo();
        }
        $('#logoutBtn').show().click(logoutBtnClick);
    }

    window.__auth__ = typeof __auth__ === 'undefined' ? {
        loadUserInfo: _loadUserInfo,
        /**
         * 跳转到登录页
         */
        toLogin: _toLogin,

        /**
         * 验证权限
         */
        userAuth: function(goToLogin, callback) {
            goToLogin = goToLogin == undefined? true: goToLogin;
            var parmas = {
                c : 'qcUsers',
                m : 'auth'
            };
            $.post(ROOT_PATH, parmas,function(data, status) {
                if(status === 'success') {
                    try{
                        callback(data.login);
                    }catch(e) {
                        console.info(e);
                    }
                    if(data.login != 1 && goToLogin) {
                        console.log('登录信息过期!');
                        _toLogin();
                        return false;
                    }
                }
            });
        }
        }: __auth__;

});