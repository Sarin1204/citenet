/**
 * Created by vipul on 4/27/2016.
 */
angular.module('shortest_path').controller('ShortestPathController',['$scope',
    '$routeParams', '$location','ShortestPath','getUser','alertify',
    function($scope, $routeParams, $location, ShortestPath,getUser,alertify){
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
                    forceLocked:false,
                    alpha: 0.2,
                    edgeCaption: 'caption',
                    nodeCaptionsOnByDefault: true,
                    edgeCaptionsOnByDefault: true,
                    nodeTypes: {"type":["Paper","subject_area","author","affiliation"]},
                    edgeTypes: {"caption":["CITES","associated_to","affiliated_to","written_by"]},
                    directedEdges:true,
                    linkDistancefn: function(){ return 800; },
                    nodeStyle: {
                        "Paper": {
                            "color":'#1B9E77',
                            "borderColor": "#136d52",
                            "borderWidth": 6,
                            "radius"     : 44
                        },
                        "subject_area": {
                            "color":'#D95F02',
                            "borderWidth": 6,
                            "borderColor": "#ad4b00",
                            "radius"     : 44
                        },
                        "author": {
                            "color":'#eded5c',
                            "borderWidth": 6,
                            "borderColor": "#a3a33f",
                            "radius"     : 44
                        },
                        "affiliation": {
                            "color":'#c060c1',
                            "borderWidth": 6,
                            "borderColor": "#904891",
                            "radius"     : 44
                        }
                    },
                    edgeStyle: {
                        "all":{
                          "opacity":0.4
                        },
                        "CITES": {
                            "color": "#990921",
                            "width":4,
                            "borderWidth": 10,
                        },
                        "associated_to": {
                            "color": "#2e377c",
                            "width":4
                        },
                        "affiliated_to": {
                            "color": "#2a6815",
                            "width":4
                        },
                        "written_by":{
                            "color": "rgb(0,255,0)",
                            "width":4
                        }
                    },
                    initialScale: 0.5,
                    initialTranslate: [250,150],
                    zoomControls:true
                };
                //alchemy.begin({"dataSource": response[0]["graph"]})
                alchemy = new Alchemy(config);
                alertify.logPosition("top right");
                alertify.success("Success! Check out your graph!");
            },function(error){
                console.log('Error in getShortestPath '+error);
                alertify.logPosition("top right");
                alertify.error("Error occured: "+error);
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);