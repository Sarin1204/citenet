/**
 * Created by sarin on 11/11/16.
 */
angular.module('roleStatus').controller('RoleStatusController',['$scope', 'getUser',
    function($scope, getUser){
        console.log("getUser is"+JSON.stringify(getUser));
        $scope.is_admin = (getUser.user.role_id == 1 );
        $scope.is_systemAdmin = (getUser.user.role_id == 2);
        console.log("is_admin is "+JSON.stringify($scope.is_admin));
    }
]);