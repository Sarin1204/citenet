/**
 * Created by sarin on 11/7/16.
 */
angular.module('sphere_influence').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
            when('/sphere_influence', {
                templateUrl: 'sphere_influence/views/sphere_influence.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            })
    }
]);