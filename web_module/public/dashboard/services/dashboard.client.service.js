/**
 * Created by vipul on 4/27/2016.
 */
angular.module('dashboard').factory('Dashboard',['$resource',
    function($resource) {
        return {
            getShortestPath:  $resource('/api/getShortestPath'),
            getSubjAreaConn:  $resource('/api/getSubjAreaConn'),
            getSphereInfluence:  $resource('/api/getSphereInfluence'),
            getIncomingRelation:  $resource('/api/getIncomingRelation')
        };
    }
]);