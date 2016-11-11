/**
 * Created by vipul on 4/23/2016.
 */
angular.module('auth').provider('Auth', [
    function(){
        this.checkSignedin = function($q, $timeout, $http, $location, $rootScope,$window){
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/signedin').success(function(user){
                // Authenticated
                console.log("user == "+JSON.stringify(user[0]));
                if (user !== '0') {
                    if ($window.user === undefined) {
                        $window.user = user[0];
                    }
                    deferred.resolve();
                }
                // Not Authenticated
                else { $rootScope.message = 'You need to log in.';
                    deferred.reject(); $location.url('/');
                }
            });
            return deferred.promise;
        };

        this.$get = function() {
            var checkSignedin = this.checkSignedin;
            return {
                checkSignedin: checkSignedin
            }
        };
    }
]);