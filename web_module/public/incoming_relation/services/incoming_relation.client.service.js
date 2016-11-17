/**
 * Created by sarin on 11/7/16.
 */
angular.module('incoming_relation').factory('IncomingRelation',['$resource',
    function($resource) {
        return {
            getIncomingRelation:  $resource('/api/getIncomingRelation')
        };
    }
]);