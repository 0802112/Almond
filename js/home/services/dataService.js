/**
 * Created by yangchao on 10/22/15.
 */
define(['app'], function(app) {
    app.register.factory('DataService', ['$http', '$q', '$log',
        function($http, $q, $log) {
            return {
                query:function(){
                    var queryUrl = './data/list.json';
                    var d = $q.defer();
                    $http.get(queryUrl
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