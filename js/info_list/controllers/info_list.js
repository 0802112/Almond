/**
 * Created by yangchao on 8/17/16.
 */
define(['app','./js/info_list/services/info_list'],
    function(app) {
        app.register.controller('InfoListController', ['$scope','InfoListService',
            function($scope, $data) {

                function init() {
                    $('title').text('Sign In');
                }

                init();
            }]);
    });