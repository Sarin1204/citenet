/**
 * Created by vipul on 4/27/2016.
 */
angular.module('admin').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
        when('/admin', {
            templateUrl: 'admin/views/admin.client.view.html',
            resolve: {
                signedin:AuthProvider.checkSignedin
            }
        })/*.
         otherwise({
         redirectTo: '/'
         });*/
    }
]);