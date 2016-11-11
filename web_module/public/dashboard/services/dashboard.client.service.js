/**
 * Created by vipul on 4/27/2016.
 */
angular.module('dashboard').factory('Dashboard',['$resource',
    function($resource) {
        return {
            getTopRequests:  $resource('/api/getTopRequests'),
            getTopServices: $resource('/api/getTopServices')
        };
    }
]);