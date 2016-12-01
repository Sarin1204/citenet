/**
 * Created by vipul on 4/27/2016.
 */
angular.module('dashboard').controller('DashboardController',['$scope',
    '$routeParams', '$location','Dashboard','getUser','$http',
    function($scope, $routeParams, $location, Dashboard,getUser,$http){

        var shortestPathFields = {
            'paper1' : "2-s2.0-0036026421",
            'paper2' : "2-s2.0-0041478727",
            'all_paths' : false,
            'intermediate_nodes' : false
        };
        Dashboard.getShortestPath.query(shortestPathFields, function(response){
            console.log('Success in getShortestPath '+JSON.stringify(response));
            $http.get('../alchemy_config.json')
                .then(function(res){
                    var config = res.data;
                    config.dataSource = response[0]["graph"];
                    config.divSelector = "#shortest_path";
                    config.graphHeight = function(){
                        return 300;
                    }
                    config.captionSelector = "#shortestPathCaption";
                    //alchemy.begin({"dataSource": response[0]["graph"]})
                    alchemy = new Alchemy(config);
                })
        },function(error){
            console.log('Error in getShortestPath '+error);
            alertify.logPosition("top right");
            alertify.error("Error occured: "+JSON.stringify(error));
        });

        var entityconnectionFields = {
            'subjectArea1' : "Metals and Alloys",
            'subjectArea2' : "Electronic, Optical and Magnetic Materials",
            'entitytype': "SubjectArea",
            'all_paths' : false,
            'intermediate_nodes' : false
        };

        Dashboard.getSubjAreaConn.query(entityconnectionFields, function(response){
            console.log('Success in getSubjAreaCOnn '+JSON.stringify(response));
            $http.get('../alchemy_config.json')
                .then(function(res){
                    var config = res.data;
                    config.dataSource = response[0]["graph"];
                    config.divSelector = "#entity_connection";
                    config.graphHeight = function(){
                        return 300;
                    }
                    config.captionSelector = "#entityConnectionCaption";
                    //alchemy.begin({"dataSource": response[0]["graph"]})
                    alchemy = new Alchemy(config);
                })
        },function(error){
            console.log('Error in getSubjAreaConn '+error);
        });

        var sphereInfluenceFields = {
            'source' : "2-s2.0-0036026421",
            'intermediate_nodes' : false,
            'limit':1
        };


        Dashboard.getSphereInfluence.query(sphereInfluenceFields, function(response){
            console.log('Success in getSphereInfluence '+JSON.stringify(response));
            $http.get('../alchemy_config.json')
                .then(function(res){
                    var config = res.data;
                    config.dataSource = response[0]["graph"];
                    config.divSelector = "#sphere_influence";
                    config.graphHeight = function(){
                        return 300;
                    }
                    config.captionSelector = "#sphereInfluenceCaption";
                    //alchemy.begin({"dataSource": response[0]["graph"]})
                    alchemy = new Alchemy(config);
                })

        },function(error){
            console.log('Error in getSphereInfluence '+JSON.stringify(error));
        });

        var incomingRelationFields = {
            'source' : "2-s2.0-0036026421",
            'entitytype' : "Paper",
            'all_paths' : false,
            'intermediate_nodes' : false
        };

        Dashboard.getIncomingRelation.query(incomingRelationFields, function(response){
            console.log('Success in getIncomingRelation '+JSON.stringify(response));
            $http.get('../alchemy_config.json')
                .then(function(res){
                    var config = res.data;
                    config.dataSource = response[0]["graph"];
                    config.divSelector = "#incoming_relation";
                    config.graphHeight = function(){
                        return 300;
                    }
                    config.captionSelector = "#incomingRelationCaption";
                    //alchemy.begin({"dataSource": response[0]["graph"]})
                    alchemy = new Alchemy(config);
                })
        },function(error){
            console.log('Error in getIncomingRelation '+JSON.stringify(error));
        });

    }
]);