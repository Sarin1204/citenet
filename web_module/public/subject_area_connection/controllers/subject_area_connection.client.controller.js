/**
 * Created by Dhruvraj on 4/27/2016.
 */
angular.module('subject_area_connection').controller('SubjectAreaConn',['$scope',
    '$routeParams', '$location','SubjectAreaConn','getUser','$http',
    function($scope, $routeParams, $location, SubjectAreaConn,getUser,$http){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = true;
        $scope.entityType='SubjectArea';
        $scope.child = {}
        $scope.subject_area_connection_query = function(){
            console.log('Inside subject_area_connection_query');
            var fields = {
                'subjectArea1' : $scope.child.subjectArea1,
                'subjectArea2' : $scope.child.subjectArea2,
                'entitytype':    $scope.entityType,
                'all_paths' : $scope.all_paths,
                'intermediate_nodes' : $scope.intermediate_nodes
            };

            console.log("fields are "+JSON.stringify(fields));

            SubjectAreaConn.getSubjAreaConn.query(fields, function(response){
                console.log('Success in getSubjAreaCOnn '+JSON.stringify(response));
                $scope.subject_area_connection_json = response[0]["graph"];
                $http.get('../alchemy_config.json')
                    .then(function(res){
                        var config = res.data;
                        config.dataSource = response[0]["graph"];
                        var myEl = angular.element("svg");
                        myEl.remove();
                        //alchemy.begin({"dataSource": response[0]["graph"]})
                        alchemy = new Alchemy(config);
                    })
            },function(error){
                console.log('Error in getSubjAreaConn '+error);
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);
