/**
 * Created by vipul on 4/27/2016.
 */
angular.module('signinPerson').controller('SigninPersonController',['$scope',
    '$routeParams', '$location','SigninPerson','$timeout',
    function($scope, $routeParams, $location, SigninPerson,$timeout){

        $scope.signin_error = '';
        $scope.showMessage = false;

        $scope.signin_person = function(){
            console.log('Inside person');
            var signin = new SigninPerson.signinPerson({
                email: this.email,
                password: this.password
            });

            signin.$save(function(response){
                console.log('Authentication successful'+JSON.stringify(response));
                $location.path('/dashboard')

            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
                $scope.signin_error = {type: 'alert alert-danger',msg: 'Incorrect sign in details.'};
                $scope.showMessage = true;
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);
            });
        };

    }
]);