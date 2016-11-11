/**
 * Created by vipul on 4/26/2016.
 */


angular.module('signupPerson').factory('SignupPerson',['$resource',
    function($resource) {
        return {
            signupPerson:  $resource('api/signupPerson')
        };
    }
]);