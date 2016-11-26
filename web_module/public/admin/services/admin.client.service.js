/**
 * Created by vipul on 4/27/2016.
 */
angular.module('admin').factory('Admin',['$resource',
    function($resource) {
        console.log("Inside Admin Client Service");
        return {
            displayUsers:  $resource('api/adminDisplay'),
            deleteUsers: $resource('api/deleteUser'),
            approveUsers: $resource('api/approveUser')
        };
    }
]);