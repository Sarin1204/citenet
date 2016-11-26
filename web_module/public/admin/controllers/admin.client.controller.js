/**
 * Created by vipul on 4/27/2016.
 */
angular.module('admin').controller('AdminController',['$scope','$route',
    '$routeParams', '$location','Admin',
    function($scope, $route, $routeParams, $location, Admin){
        console.log("inside AdminController");
       var userArray=new Array();
       var users=Admin.displayUsers.query(function(response){
          console.log(response.length);
           for(i=0;i<response.length;i++) {
               userArray[i]=response[i];
           }
        }
        );
        $scope.names=userArray;

        $scope.deleteUser=function(email){
            console.log("Deleting User "+email);
            var fields = {
                'email':email
            }
            Admin.deleteUsers.query(fields,function(response){
                $route.reload();
            });
        }

        $scope.approveUser=function(email){
            console.log("Approving User "+email);
            var fields = {
                'email':email
            }
            Admin.approveUsers.query(fields,function(response){
                var users=Admin.displayUsers.query(function(response){
                        console.log(response.length);
                        for(i=0;i<response.length;i++) {
                            userArray[i]=response[i];
                        }
                    }
                );
                $scope.names=userArray;
            });
        }
    }
]);