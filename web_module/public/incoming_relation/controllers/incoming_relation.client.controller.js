/**
 * Created by vipul on 4/27/2016.
 */
angular.module('incoming_relation').controller('IncomingRelation',['$scope',
    '$routeParams', '$location','IncomingRelation','getUser','$http',
    function($scope, $routeParams, $location, IncomingRelation,getUser,$http){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = true;
        $scope.entitytype='Paper';
        $scope.myFieldLabel="Select a source entity to see all it's incoming relations";
        $scope.newValue = function() {
            $scope.source=""
            if($scope.entitytype=='Paper'){
                $scope.myFieldLabel="Enter the paper for viewing others that cite it";
            }else if($scope.entitytype=='Author'){
                $scope.myFieldLabel="Enter author name to see his publications";
            }else if($scope.entitytype=='SubjectArea'){
                $scope.myFieldLabel="Enter subject area to see it's associated papers";
            }else if($scope.entitytype=='Affiliation'){
                $scope.myFieldLabel="Enter affiliation name to see it's associated papers";
            }
        }
        $scope.incoming_relation_query = function(){
            console.log('Inside shortest_path_query');
            var fields = {
                'source' : $scope.source,
                'entitytype' : $scope.entitytype,
                'all_paths' : $scope.all_paths,
                'intermediate_nodes' : $scope.intermediate_nodes
            };

            console.log("fileds are "+JSON.stringify(fields));

            IncomingRelation.getIncomingRelation.query(fields, function(response){
                console.log('Success in getIncomingRelation '+JSON.stringify(response));
                $scope.shortest_path_json = response[0]["graph"];
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
                console.log('Error in getIncomingRelation '+JSON.stringify(error));
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);