/**
 * Created by vipul on 4/23/2016.
 */
angular.module('home').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'home/views/home.client.view.html'
        })/*.
         otherwise({
         redirectTo: '/'
         });*/
    }
]);