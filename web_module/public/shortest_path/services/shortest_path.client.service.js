/**
 * Created by sarin on 11/7/16.
 */
angular.module('shortest_path').factory('ShortestPath',['$resource',
    function($resource) {
        return {
            getShortestPath:  $resource('/api/getShortestPath')
        };
    }
]);