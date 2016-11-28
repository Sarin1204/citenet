/**
 * Created by sarin on 11/26/16.
 */
angular.module('typeahead').factory('Typeahead',['$resource',
    function($resource){
        return{
            typeAheadSubjects: $resource('api/typeAheadSubjects/:val/:entityType',{
                val: '@val',
                entityType: '@entityType'
            })
        }
    }
]);