/**
 * Created by Dhruvraj on 4/27/2016.
 */
angular.module('sphere_influence').controller('SphereInfluence',['$scope',
    '$routeParams', '$location','SphereInfluence','getUser',
    function($scope, $routeParams, $location, SphereInfluence,getUser){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = true;
        $scope.sphere_influence_query = function(){
            console.log('Inside subject_area_connection_query');
            var fields = {
                'source' : $scope.source,
                'all_paths' : $scope.all_paths,
                'intermediate_nodes' : $scope.intermediate_nodes,
                'limit':$scope.limit
            };

            console.log("fields are "+JSON.stringify(fields));

            SphereInfluence.getSphereInfluence.query(fields, function(response){
                console.log('Success in getSphereInfluence '+JSON.stringify(response));
                $scope.sphere_influence_json = response[0]["graph"];
                var myEl = angular.element("svg");
                myEl.remove();
                var config = {
                    dataSource : response[0]["graph"],
                    nodeCaption: 'caption',
                    forceLocked:false,
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
                        "CITES": {
                            "color": "#990921",
                            "width":2,
                            "borderWidth": 10
                        },
                        "associated_to": {
                            "color": "#2e377c",
                            "width":1
                        },
                        "affiliated_to": {
                            "color": "#2a6815",
                            "width":1
                        },
                        "written_by":{
                            "color": "rgb(0,255,0)",
                            "width":1
                        }
                    },
                    initialScale: 1.4,
                    initialTranslate: [250,150],
                    zoomControls:true
                };
                //alchemy.begin({"dataSource": response[0]["graph"]})
                alchemy = new Alchemy(config);
            },function(error){
                console.log('Error in getSphereInfluence '+JSON.stringify(error));
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);