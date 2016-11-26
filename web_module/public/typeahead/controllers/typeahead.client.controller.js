/**
 * Created by sarin on 11/26/16.
 */
angular.module('typeahead').controller('typeAheadController',['$scope','Typeahead',
    function($scope, Typeahead){
        return $scope.getSubjects = function(val) {
            var SubjectAreas = Typeahead.typeAheadSubjects.get({"val":val});

            return SubjectAreas.$promise.then(function(response){
                console.log('Response for typeAheadSubjects is '+JSON.stringify(response.subjects));
                return response.subjects;
            }, function(error){
                console.log('Error response for typeAheadSubjects'+JSON.stringify(error));
                return undefined
            })

        }

    }



]);