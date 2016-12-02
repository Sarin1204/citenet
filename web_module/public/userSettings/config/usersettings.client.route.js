/**
 * Created by vipul on 4/27/2016.
 */
angular.module('usersettings').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
        when('/userSettings', {
            templateUrl: 'usersettings/views/usersettings.client.view.html',
            resolve: {
                signedin:AuthProvider.checkSignedin
            }
        })/*.
         otherwise({
         redirectTo: '/'
         });*/
    }
]);