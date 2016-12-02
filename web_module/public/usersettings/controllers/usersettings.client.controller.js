/**
 * Created by vipul on 4/27/2016.
 */
angular.module('usersettings').controller('UserSettingsController',['$scope','$route',
    '$routeParams', '$location','UserSettings','alertify',
    function($scope, $route, $routeParams, $location, UserSettings,alertify){
        $scope.reset_password=function(){
        if($scope.newPassword==$scope.newPasswordConfirm){
        console.log($scope.newPassword);
        var fields={
            'newPassword' : $scope.newPassword
        }
        UserSettings.resetPassword.query(fields,function(response,error){
            if(response){
                alertify.logPosition("top right");
                alertify.success("Password update successfully");
                $scope.newPassword="";
                $scope.newPasswordConfirm="";
            }else if(error){
                alertify.error("Some error occured.");
            }
        })
        }else{
            alertify.logPosition("top right");
            alertify.error("Passwords need to match");
        }
        }

        $scope.update_info=function(){
            var fields={};
            if($scope.firstname!=""||$scope.lastname!="") {
                if ($scope.firstname != "" && $scope.lastname != "") {
                    fields = {
                        'firstname': $scope.firstname,
                        'lastname': $scope.lastname,
                    }
                } else if ($scope.firstname != "") {
                    fields = {
                        'firstname': $scope.firstname,
                    }
                } else{
                    fields = {
                        'lastname': $scope.lastname,
                    }
                }
                console.log(firstname+ " "+ lastname);
                UserSettings.updateUser.query(fields,function(response,error){
                    if(response){
                        alertify.logPosition("top right");
                        alertify.success("Updated Details");
                        $scope.firstname="";
                        $scope.lastname="";
                    }else if(error){
                        alertify.error("Some error occured.");
                    }
                })
            }else{
                alertify.error("Please enter a value to update");
            }
        }

    }
]);