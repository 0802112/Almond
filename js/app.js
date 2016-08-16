define(['jquery', 'angular', 'ngRoute', 'ngAMD', 'ngCookies', 'notification', 'ngBootstrap'],
    function (jquery, angular, ngRoute, ngAMD, ngCookies, notification) {
        'use strict';

        var app = angular.module('app', ['ngRoute', 'ngCookies', 'notifications', 'ui.bootstrap']);
        app.config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.headers.common["X-REQUESTED-WITH"] = 'XMLHttpRequest';
        }]);
        app.config(['$routeProvider', '$locationProvider', '$httpProvider',
            function ($routeProvider, $locationProvider, $httpProvider) {
                // $locationProvider.html5Mode(true).hashPrefix('!');

                // 相同的templateUrl可以给不同的controller
                $routeProvider
                    .when('/', ngAMD.route({
                        templateUrl: 'views/home/home.html',
                        controller: 'HomeController'
                    }))
                    .when('/sign_in', ngAMD.route({
                        templateUrl: 'views/sign_in/sign_in.html',
                        controller: 'SignInController'
                    }))
                    .when('/sign_up', ngAMD.route({
                        templateUrl: 'views/sign_up/sign_up.html',
                        controller: 'SignUpController'
                    }))
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);

        $("#scrollToTop").click(function(){
            $('html, body').animate({scrollTop:0}, 'fast');
        });

        __auth__.loadUserInfo();

        // Bootstrap Angular when DOM is ready
        ngAMD.bootstrap(app);

        return app;
    }
);

