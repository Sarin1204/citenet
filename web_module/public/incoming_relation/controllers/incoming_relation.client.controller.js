/**
 * Created by vipul on 4/27/2016.
 */
angular.module('incoming_relation').controller('IncomingRelation',['$scope',
    '$routeParams', '$location','IncomingRelation','getUser','alertify','$http',
    function($scope, $routeParams, $location, IncomingRelation,getUser,alertify,$http){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = false;
        $scope.query_empty = '';
        $scope.showMessage = false;
        $scope.myFieldLabel="Select a source entity to see all it's incoming relations";
        $scope.entityType = "Paper";
        $scope.newValue = function() {
            $scope.source=""
            if($scope.entitytype=='Paper'){
                $scope.myFieldLabel="Enter the paper for viewing others that cite it";
            }else if($scope.entityType=='Author'){
                $scope.myFieldLabel="Enter author name to see his publications";
            }else if($scope.entityType=='SubjectArea'){
                $scope.myFieldLabel="Enter subject area to see it's associated papers";
            }else if($scope.entityType=='Affiliation'){
                $scope.myFieldLabel="Enter affiliation name to see it's associated papers";
            }
        }
        $scope.incoming_relation_query = function(){
            console.log('Inside shortest_path_query');
            var fields = {
                'source' : $scope.source,
                'entitytype' : $scope.entityType,
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
                        if(response[0]["graph"]["nodes"].length!=0){
                            alertify.logPosition("bottom right");
                            alertify.log("Graph is limited to 100 relations");
                        }else{
                            alertify.logPosition("bottom right");
                            alertify.error("This query did not return any results. Please try other parameters");
                        }
                        config.graphHeight = function(){
                            return 450;
                        }
                        config.linkDistancefn = function(edge){
                            if(edge.caption == "CITES")
                                return 800;
                            else
                                return 150;
                        }
                        config.captionSelector = "#captions";
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