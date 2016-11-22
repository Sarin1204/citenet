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
                    edgeCaption: 'caption',
                    nodeCaptionsOnByDefault: true,
                    edgeCaptionsOnByDefault: true,
                    nodeTypes: {"type":["Paper","subject_area","author","affiliation"]},
                    edgeTypes: {"type":["CITES","associated_to","written_by","affiliated_to"]},
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