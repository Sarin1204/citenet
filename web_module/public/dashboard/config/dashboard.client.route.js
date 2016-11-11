/**
 * Created by vipul on 4/27/2016.
 */
angular.module('dashboard').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
        when('/dashboard', {
            templateUrl: 'dashboard/views/dashboard.client.view.html',
            resolve: {
                signedin:AuthProvider.checkSignedin
            }
        })/*.
         otherwise({
         redirectTo: '/'
         });*/
    }
]);