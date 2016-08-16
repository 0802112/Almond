// app 路径
window.ROOT_PATH = '/api/public/index.php';

require.config({

    //baseUrl: "js",

    paths: {
        angular: './vendor/angular-1.3.0/angular.min',
        ngRoute: './vendor/angular-1.3.0/angular-route.min',
        ngCookies: './vendor/angular-1.3.0/angular-cookies.min',
        ngResource: './vendor/angular-1.3.0/angular-resource.min',
        ngAMD: './vendor/angular-1.3.0/angularAMD',
        jquery: './vendor/jquery-1.11.0/jquery.min',
        notification: './vendor/angular-notifications/notification',
        bootstrap: './vendor/bootstrap-3.1.1/bootstrap.min',
        ngBootstrap:'./vendor/ui-bootstrap-0.13.0/ui-bootstrap-tpls-0.13.0.min',
        md5:'./vendor/md5/jQuery.md5',

        app:'./js/app',
        auth: 'js/__auth__/auth',
        tools: 'js/__tools__/tools',

        HomeController:'./js/home/controllers/homeController',
        SignInController:'./js/sign_in/controllers/sign_in',
        SignUpController:'./js/sign_up/controllers/sign_up',
    },

    shim: {
        'jquery': {
            'exports': 'jquery'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'md5': {
            deps: ['jquery'],
            exports: 'md5'
        },
        'tools': {
            deps: ['jquery', 'md5'],
            exports: 'tools'
        },
        'auth': {
            deps: ['jquery', 'tools'],
            exports: 'auth'
        },
        'angular': {
            deps: ['jquery', 'bootstrap', 'auth'],
            exports: 'angular'
        },
        'ngResource': {
            deps: ['angular']
        },
        'ngRoute': {
            deps: ['angular']
        },
        'ngAMD': {
            deps: ['angular']
        },
        'notification': {
            deps: ['angular']
        },
        'ngCookies': {
            deps: ['angular']
        },
        'ngBootstrap':{
            deps:['angular']
        }

    },

    priority: [
        "jquery",
        "angular",
        "bootstrap"
    ],

    // kick start application
    deps: ['app', 'auth']

});