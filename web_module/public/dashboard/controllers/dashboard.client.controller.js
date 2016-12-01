/**
 * Created by vipul on 4/27/2016.
 */
angular.module('dashboard').controller('DashboardController',['$scope',
    '$routeParams', '$location','Dashboard','getUser','$http','$q',
    function($scope, $routeParams, $location, Dashboard,getUser,$http,$q){

        var shortestPathFields = {
            'paper1' : "2-s2.0-0036026421",
            'paper2' : "2-s2.0-0041478727",
            'all_paths' : false,
            'intermediate_nodes' : false
        };

        var shortestPath = Dashboard.getShortestPath.query(shortestPathFields, function(response){
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

        var entityConnection =Dashboard.getSubjAreaConn.query(entityconnectionFields, function(response){
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


        var sphereInfluence = Dashboard.getSphereInfluence.query(sphereInfluenceFields, function(response){
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

        var incomingRelations = Dashboard.getIncomingRelation.query(incomingRelationFields, function(response){
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

        $scope.IntroOptions = {
            steps:[
                {
                    element: '#shortestPathPanel',
                    tooltipClass: 'tooltipClass',
                    intro: "<p class='text-center'><strong style='padding-right:5px'>Shortest Path</strong> <button style='padding:6px 10px' class='btn btn-primary btn-sm' disabled='disabled'><i class='fa fa-arrows-h'></i>"+
                    "</button></p>  <ul class='list-group' style='margin-bottom:0px'><li class='list-group-item'>Finds shortest path between 2 research papers</li>"+
                    "<li class='list-group-item'> Helps author link papers for collaboration</li></ul>",
                    position: 'bottom-middle-aligned'
                },
                {
                    element: '#entityConnectionPanel',
                    tooltipClass: 'tooltipClass',
                    intro: "<p class='text-center'><strong style='padding-right:5px'>Entity Connection</strong> <button style='padding:6px 10px' class='btn btn-success btn-sm' disabled='disabled'><i class='fa fa-handshake-o'></i>"+
                    "</button></p>  <ul class='list-group' style='margin-bottom:0px'><li class='list-group-item'>Shows connections between subject areas, authors or organizations</li>"+
                    "<li class='list-group-item'> Example - link Computer Science and BioTechnology subject areas</li></ul>",
                    position: 'auto'
                },
                {
                    element: '#sphereInfluencePanel',
                    tooltipClass: 'tooltipClass',
                    intro: "<p class='text-center'><strong style='padding-right:5px'>Sphere of Influence</strong> <button style='padding:6px 10px' class='btn btn-info btn-sm' disabled='disabled'><i class='fa fa-globe'></i>"+
                    "</button></p>  <ul class='list-group' style='margin-bottom:0px'><li class='list-group-item'>Shows influence of a paper through connections</li>"+
                    "<li class='list-group-item'> Example - Find papers and subject areas upto n hops away</li></ul>",
                    position: 'auto'
                },
                {
                    element: '#incomingRelationPanel',
                    tooltipClass: 'tooltipClass',
                    intro: "<p class='text-center'><strong style='padding-right:5px'>Incoming Relations</strong> <button style='padding:6px 10px' class='btn btn-danger btn-sm' disabled='disabled'><i class='fa fa-share-alt'></i>"+
                    "</button></p>  <ul class='list-group' style='margin-bottom:0px'><li class='list-group-item'>Shows which entities an entity was influenced by</li>"+
                    "<li class='list-group-item'> Example - Find papers that cited my paper</li></ul>",
                    position: 'auto'
                }
            ]
        }
        $q.all([shortestPath, entityConnection,sphereInfluence,incomingRelations ]).then(function(){
        })
    }
]);