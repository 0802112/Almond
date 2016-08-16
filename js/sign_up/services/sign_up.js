/**
 * Created by yangchao on 8/16/16.
 */
define(['app'], function(app) {
    app.register.factory('SignUpService', ['$http', '$q', '$log',
            function($http, $q, $log) {
                return {
                    register:function(params){
                        var queryUrl = window.ROOT_PATH;
                        params.c = 'users';
                        params.m = 'register';


                        var d = $q.defer();
                        $http.post(queryUrl, params
                        ).success(function(data){
                            d.resolve(data);
                        }).error(

                        ).then();
                        return d.promise;
                    }
                }
            }
        ]
    );}
);