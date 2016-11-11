/**
 * Created by vipul on 4/27/2016.
 */
angular.module('getUser').factory('getUser', [
    function(){
        this.user = window.user;

        return{
            user: this.user
        };
    }
]);