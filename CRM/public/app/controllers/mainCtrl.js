angular.module('mainCtrl', [])
    .controller('mainController', function ($rootScope, $location, Auth, $window, $interval) {
        // get info if a person is logged in
        this.loggedIn = Auth.isLoggedIn();
        if(this.loggedIn){
            var token = $window.localStorage.getItem('token');
            self.parseJwt = function (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            }
        this.user = self.parseJwt(token);
        }
        // check to see if a user is logged in on every request
        $rootScope.$on('$routeChangeStart', function () {
            // get user information on page load
            this.loggedIn = Auth.isLoggedIn();
            // this.user = Auth.getUser().then(data => data.data);
            if ($location.hash() == '_=_') $location.hash(null);
        });
        // function to handle logging out
        this.doLogout = function () {
            Auth.logout();
            this.user = '';
            $window.location = $window.location.protocol + '//' + $window.location.host + '/login';
        };
        //check session
        this.checkSession = function () {
            if (Auth.isLoggedIn()) {
                this.checkingSession = true;
                var interval = $interval(function () {
                    var token = $window.localStorage.getItem('token');
                    if (token == null) {
                        $interval.cancel(interval);
                    } else {
                        self.parseJwt = function (token) {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse($window.atob(base64));
                        }
                        var expireTime = self.parseJwt(token);
                        var timeStamp = Math.floor(Date.now() / 1000);
                        console.log(expireTime);
                        console.log(timeStamp);
                        var timeCheck = expireTime.exp - timeStamp;
                        console.log('timecheck: ' + timeCheck);
                        if (timeCheck <= 0) {
                            Auth.logout();
                            this.user = '';
                            $window.location = $window.location.protocol + '//' + $window.location.host + '/login';
                        }
                    }
                }, 2000)
            }
        }
        this.checkSession();
        // handle login with facebook button
        this.facebook = function () {
            $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
        }
        // handle login with google button
        this.google = function () {
            $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';
        }
        // function to handle login form
        this.doLogin = function (username, password) {
            this.processing = true;
            // clear the error
            this.error = '';
            Auth.login(username, password)
                .then(function (data) {
                    this.processing = false;
                    // if a user successfully logs in, redirect to users page
                    if (data.success) {
                        $window.location = $window.location.protocol + '//' + $window.location.host;
                        this.checkSession();
                    }
                    else {
                        alert(data.message);
                    }
                });
        };


        this.createSample = function () {
            Auth.createSampleUser();
        };
        this.gotoAdd = function () {
            $location.path('/add');
        }
        this.gotoEdit = function (id) {
            $location.path('/edit/' + id);
        }
        this.gotoHome = function () {
            $location.path('/');
        }
        this.gotoDetail = function (id) {
            $location.path('/detail/' + id);
        }
        this.goRegister = function () {
            $location.path('/register');
        }
    });