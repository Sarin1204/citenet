/**
 * Created by sarin on 11/26/16.
 */
angular.module('typeahead').controller('typeAheadController',['$scope','Typeahead',
    function($scope, Typeahead){
        var parentScope = $scope.$parent;
        parentScope.child = $scope;
        return $scope.getSubjects = function(val) {
            var SubjectAreas = Typeahead.typeAheadSubjects.get({"val":val,"entityType":parentScope.entityType});
            return SubjectAreas.$promise.then(function(response){
                console.log('Response for typeAhead is '+JSON.stringify(response.subjects));
                return response.subjects;
            }, function(error){
                console.log('Error response for typeAhead'+JSON.stringify(error));
                return undefined
            })

        }

    }



]);