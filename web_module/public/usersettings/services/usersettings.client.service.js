/**
 * Created by vipul on 4/27/2016.
 */
angular.module('usersettings').factory('UserSettings',['$resource',
    function($resource) {
        return {
            resetPassword:  $resource('api/resetPassword'),
            updateUser:  $resource('api/updateUserDetails'),
        };
    }
]);