/**
 * Created by vipul on 4/27/2016.
 */
angular.module('shortest_path').controller('ShortestPathController',['$scope',
    '$routeParams', '$location','ShortestPath','getUser',
    function($scope, $routeParams, $location, ShortestPath,getUser){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = true;
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
                var myEl = angular.element("svg");
                myEl.remove();
                var config = {
                    dataSource : response[0]["graph"],
                    nodeCaption: 'caption',
                    edgeCaption: 'caption',
                    nodeCaptionsOnByDefault: true,
                    edgeCaptionsOnByDefault: true,
                    nodeTypes: {"type":["Paper","subject_area"]},
                    edgeTypes: {"type":["CITES","associated_to"]},
                    directedEdges:true,
                    linkDistancefn: function(){ return 800; },
                    nodeStyle: {
                        "Paper": {
                            "color":'#1B9E77',
                            "borderColor": "None",
                            "radius"     : 20
                        },
                        "subject_area": {
                            "color":'#D95F02',
                            "borderColor": "None",
                            "radius"     : 20
                        }
                    },
                    edgeStyle: {
                        "CITES": {
                            color: "#ff00f3"
                        },
                        "associated_to": {
                            color: "#00fffa"
                        }
                    },
                    initialScale: 0.7,
                    initialTranslate: [250,150],
                    zoomControls:true,
                    directedEdges : true
                };
                //alchemy.begin({"dataSource": response[0]["graph"]})
                alchemy = new Alchemy(config);
            },function(error){
                console.log('Error in getShortestPath '+error);
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);