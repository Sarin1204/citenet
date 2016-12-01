/**
 * Created by vipul on 4/27/2016.
 */
angular.module('shortest_path').controller('ShortestPathController',['$scope',
    '$routeParams', '$location','ShortestPath','getUser','alertify','$http',
    function($scope, $routeParams, $location, ShortestPath,getUser,alertify,$http){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = false;
        $scope.shortest_path_query = function(){
            console.log('Inside shortest_path_query');
            var fields = {
                'paper1' : $scope.paper1,
                'paper2' : $scope.paper2,
                'all_paths' : $scope.all_paths,
                'intermediate_nodes' : $scope.intermediate_nodes
            };

            console.log("fileds are "+JSON.stringify(fields));

            ShortestPath.getShortestPath.query(fields, function(response){
                console.log('Success in getShortestPath '+JSON.stringify(response));
                $scope.shortest_path_json = response[0]["graph"];
                $http.get('../alchemy_config.json')
                    .then(function(res){
                        var config = res.data;
                        config.dataSource = response[0]["graph"];
                        config.graphHeight = function(){
                            return 450;
                        }
                        config.captionSelector = "#captions";
                        var myEl = angular.element("svg");
                        myEl.remove();
                        //alchemy.begin({"dataSource": response[0]["graph"]})
                        alchemy = new Alchemy(config);
                        alertify.logPosition("top right");
                        alertify.success("Success! Check out your graph!");
                    })
            },function(error){
                console.log('Error in getShortestPath '+error);
                alertify.logPosition("top right");
                alertify.error("Error occured: "+JSON.stringify(error));
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);
