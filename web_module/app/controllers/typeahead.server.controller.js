/**
 * Created by sarin on 11/26/16.
 */

var http = require("http"),
    config = require('../../config/config.js');

exports.typeAheadSubjectAreas = function(req, res){
    console.log("Params " +JSON.stringify(req.params));
    var val = req.params.val;
    var entityType = req.params.entityType;
    var dataRet;
    //return status 200 with subject area data if exists
    var subject_areas_exist = true;
    var options = {
        port: 7474,
        path: '/db/data/transaction/commit',
        method: 'POST',
        auth: config.neoAuth
    };
    if(subject_areas_exist){
        var req = http.request(options, function (res1) {
            console.log('STATUS: ' + res1.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res1.headers));
            res1.setEncoding('utf8');
            res1.on('data', function (chunk) {
                //console.log('BODY result: ' + chunk);
                console.log("res1 on called ");
                if (chunk != undefined) {
                    dataRet = dataRet + chunk;
                }
                else {
                    //              console.log("chunk is "+chunk)
                }
            });

            res1.on('end', function () {
                dataRet = dataRet.replace("undefined", "");
                console.log("DataRet" +dataRet);
                var res1 = JSON.parse(dataRet);
                var nodes = [];
                var count = 0;
                var clusterID = 0;
                res1.results[0].data.forEach(function (row) {
                    row.graph.nodes.forEach(function (n) {
                        var found = nodes.filter(function (m) {
                                return m.id == n.id;
                            }).length > 0;
                        if (!found) {
                            var node = n.properties || {};
                            node.caption = n.properties.title || n.properties.text || n.properties.name || n.properties.affilname;
                            nodes.push(node.caption);
                        }
                    });
                });
                var returned = nodes;
                return  res.status(200).send({ subjects: returned });
            })
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        console.log(val.toString());
        var qTest = "MATCH (s:subject_area) WHERE s.text=~'.*"+val.toString()+".*' RETURN s"
        if(entityType=="Author"){
            qTest = "MATCH (s:author) WHERE s.name=~'.*"+val.toString()+".*' RETURN s"
        }else if(entityType=="Affiliation"){
            qTest = "MATCH (s:affiliation) WHERE s.affilname=~'.*"+val.toString()+".*' RETURN s"
        }
        var queryTest="{\"statements\" : [ { \"statement\" : \" "+ qTest +"\", \"resultDataContents\" : [ \"graph\" ] } ] }"
        console.log(qTest);
        req.write(queryTest);
        req.end();

    }
    //return status 500 if no subject areas start with val
    else{
        return res.status(500).send({error: "No subject areas found"});
    }
};
