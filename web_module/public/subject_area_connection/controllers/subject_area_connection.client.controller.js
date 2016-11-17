/**
 * Created by Dhruvraj on 4/27/2016.
 */
angular.module('subject_area_connection').controller('SubjectAreaConn',['$scope',
    '$routeParams', '$location','SubjectAreaConn','getUser',
    function($scope, $routeParams, $location, SubjectAreaConn,getUser){
        console.log("getUser"+JSON.stringify(getUser.user));
        $scope.all_paths = false;
        $scope.intermediate_nodes = true;
        $scope.entitytype='SubjectArea';
        $scope.subject_area_connection_query = function(){
            console.log('Inside subject_area_connection_query');
            var fields = {
                'subjectArea1' : $scope.subjectArea1,
                'subjectArea2' : $scope.subjectArea2,
                'entitytype':    $scope.entitytype,
                'all_paths' : $scope.all_paths,
                'intermediate_nodes' : $scope.intermediate_nodes
            };

            console.log("fields are "+JSON.stringify(fields));

            SubjectAreaConn.getSubjAreaConn.query(fields, function(response){
                console.log('Success in getSubjAreaCOnn '+JSON.stringify(response));
                $scope.subject_area_connection_json = response[0]["graph"];
                var myEl = angular.element("svg");
                myEl.remove();
                var config = {
                    dataSource : response[0]["graph"],
                    nodeCaption: 'caption',
                    edgeCaption: 'caption',
                    nodeCaptionsOnByDefault: true,
                    edgeCaptionsOnByDefault: true,
                    nodeTypes: {"type":["Paper","subject_area","author","affiliation"]},
                    edgeTypes: {"type":["CITES","associated_to","affiliated_to","written_by"]},
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
                console.log('Error in getSubjAreaConn '+error);
            });

        };

        /*$scope.$watch('all_paths', function() {
            alert("changed"+$scope.all_paths);
        }, true);*/


    }
]);