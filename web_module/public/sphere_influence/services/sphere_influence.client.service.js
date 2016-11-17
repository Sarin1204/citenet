/**
 * Created by Dhruvraj on 11/7/16.
 */
angular.module('sphere_influence').factory('SphereInfluence',['$resource',
    function($resource) {
        return {
            getSphereInfluence:  $resource('/api/getSphereInfluence')
        };
    }
]);