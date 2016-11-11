/**
 * Created by sarin on 11/6/16.
 */
angular.module('roles').controller('RolesController',['$rootScope','$scope', 'Roles',
    function($rootScope,$scope, Roles){
        Roles.getRoles.get(function(response){
            console.log('Roles are '+JSON.stringify(response["roles"]));
            $scope.roles= response["roles"];
            $scope.role_selected = response["roles"][2]

        },function(error){
            console.log('Roles error: '+JSON.stringify(error));
        });

        $scope.roleSelected = function (selectedRole) {
            //do selectedItem.PropertyName like selectedItem.Name or selectedItem.Key
            //whatever property your list has.
            $scope.$emit('role', selectedRole["role_id"]);
        }
    }
]);