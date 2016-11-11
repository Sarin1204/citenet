/**
 * Created by vipul on 4/27/2016.
 */
angular.module('dashboard').controller('DashboardController',['$scope',
    '$routeParams', '$location','Dashboard','getUser',
    function($scope, $routeParams, $location, Dashboard,getUser){
        console.log("getUser"+JSON.stringify(getUser.user))
        Dashboard.getTopRequests.get({email_id: getUser.email_id},function(response){
            console.log('topRequests are '+JSON.stringify(response));
            $scope.topRequests = response.new_requests;
        }, function(error){
            console.log('Inside error for topRequests'+JSON.stringify(error));
            $scope.errorMsg = 'Oops! Something unexpected occured!'
        });

        Dashboard.getTopServices.get({email_id: getUser.email_id},function(response){
            console.log('getTopServices are '+JSON.stringify(response));
            $scope.topServices = response.new_services;
        }, function(error){
            console.log('Inside error for topServices'+JSON.stringify(error));
            $scope.errorMsg = 'Oops! Something unexpected occured!'
        });

        $scope.newRequest = function(){
            $location.path('/newRequest')
        }

        $scope.newService = function(){
            $location.path('/newService')
        }

    }
]);