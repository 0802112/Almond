/**
 * Created by yangchao on 8/17/16.
 */
define(['app'], function(app) {
    app.register.factory('InfoListService', ['$http', '$q', '$log',
            function($http, $q, $log) {
                return {
                    login:function(params){
                        var queryUrl = window.ROOT_PATH;
                        params.c = 'user';
                        params.m = 'login';

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