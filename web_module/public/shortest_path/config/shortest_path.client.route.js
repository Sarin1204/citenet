/**
 * Created by sarin on 11/7/16.
 */
angular.module('shortest_path').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
            when('/shortest_path', {
                templateUrl: 'shortest_path/views/shortest_path.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            })/*.
         otherwise({
         redirectTo: '/'
         });*/
    }
]);