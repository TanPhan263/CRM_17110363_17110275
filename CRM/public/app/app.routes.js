angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        //home page
        .when('/', {
            templateUrl: 'app/views/pages/home.html',
            controller: 'homeController',
            controllerAs: 'user'
        })
        //login page
        .when('/login', {
            templateUrl: 'app/views/pages/login.html',
            controller: 'mainController',
            controllerAs: 'login'
        })
        //register page
        .when('/register', {
            templateUrl: 'app/views/pages/register.html',
            controller: 'registerController',
            controllerAs: 'user'
        })
        //about page
        .when('/about', {
            templateUrl: 'app/views/pages/about.html',
            controller: 'aboutController',
            controllerAs: 'about'
        })
        //contact page
        .when('/contact', {
            templateUrl: 'app/views/pages/contact.html',
            controller: 'contactController',
            controllerAs: 'contact'
        })
        //create page
        .when('/add', {
            templateUrl: 'app/views/pages/add.html',
            controller: 'addController',
            controllerAs: 'user'
        })
        //read page
        .when('/detail/:id', {
            templateUrl: 'app/views/pages/detail.html',
            controller: 'detailController',
            controllerAs: 'user'
        })
        //update page
        .when('/edit/:id', {
            templateUrl: 'app/views/pages/edit.html',
            controller: 'editController',
            controllerAs: 'user'
        })
        //facebook 
        .when('/facebook/:token', {
            templateUrl: 'app/views/pages/social/social.html',
            controller:'facebookCtrl',
            controllerAs:'facebook'
        })
        .when('/facebookerror', {
            templateUrl: 'app/views/pages/login.html',
            controller:'facebookCtrl',
            controllerAs:'facebook'
        })
        //google
        .when('/google/:token', {
            templateUrl: 'app/views/pages/social/social.html',
            controller:'googleCtrl',
            controllerAs:'google'
        })
        .when('/googleerror', {
            templateUrl: 'app/views/pages/login.html',
            controller:'googleCtrl',
            controllerAs:'google'
        })
        .otherwise({
            redirectTo: '/'
         });
    $locationProvider.html5Mode(true)
})