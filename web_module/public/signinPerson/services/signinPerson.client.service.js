/**
 * Created by vipul on 4/27/2016.
 */
angular.module('signinPerson').factory('SigninPerson',['$resource',
    function($resource) {
        return {
            signinPerson:  $resource('api/signinPerson')
        };
    }
]);