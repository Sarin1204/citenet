/**
 * Created by sarin on 11/6/16.
 */
angular.module('roles').factory('Roles',['$resource',
    function($resource){
        return{
            getRoles: $resource('/api/getRoles/')
        }
    }
]);