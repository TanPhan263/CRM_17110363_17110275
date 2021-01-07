angular.module('userService', [])
.factory('User', function ($http) {
    var myFactory = {};
    myFactory.all = function () {
        return $http.get('/users/getall').catch(err => { 
            console.log('Error')
        });
    }
    myFactory.get = function (id) {
        return $http.get('/users/getuser/' + id).catch(err => console.log('Error'));
    }
    myFactory.getbyname = function (name) {
        return $http.get('/users/getbyname/' + name).catch(err => console.log('Error'));
    }
    myFactory.getbyemail = function (email) {
        return $http.get('/users/getbyemail/' + email).catch(err => console.log('Error'));
    }
    myFactory.create = function (userData) {
        return $http.post('/users/create-user/', userData).catch(err => console.log('Error'));
    }
    myFactory.update = function (id, userData) {
        return $http.put('/users/update/' + id, userData).catch(err => console.log('Error'));
    }
    myFactory.delete = function (id) {
        return $http.delete('/users/deleteuser/' + id).catch(err => console.log('Error'));
    }
    return myFactory;
})