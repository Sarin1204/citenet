/**
 * Created by sarin on 11/7/16.
 */
angular.module('incoming_relation').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
            when('/incoming_relation', {
                templateUrl: 'incoming_relation/views/incoming_relation.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            })/*.
         otherwise({
         redirectTo: '/'
         });*/
    }
]);