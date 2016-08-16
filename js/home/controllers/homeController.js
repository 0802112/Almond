/**
 * Created by yangchao on 15/10/9.
 */
define(['app','./js/home/services/dataService'],
    function(app) {
    app.register.controller('HomeController', ['$scope','DataService',
        function($scope, $data) {
            function init() {

                $('title').text('HomePage');
            }

            init();
    }]);
});
