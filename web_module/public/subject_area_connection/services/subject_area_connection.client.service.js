/**
 * Created by Dhruvraj on 11/7/16.
 */
angular.module('subject_area_connection').factory('SubjectAreaConn',['$resource',
    function($resource) {
        return {
            getSubjAreaConn:  $resource('/api/getSubjAreaConn')
        };
    }
]);