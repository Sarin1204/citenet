/**
 * Created by sarin on 11/7/16.
 */
angular.module('subject_area_connection').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
            when('/subject_area_connection', {
                templateUrl: 'subject_area_connection/views/subject_area_connection.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            })
    }
]);