/**
 * Created by Dhruvraj on 11/12/2016.
 */
/**
 * Created by sarin on 11/8/16.
 */

var http = require("http"),
    config = require('../../config/config.js');

exports.getSphereInfluence = function(req, res){

    console.log("Inside getSphereInfluence controller");

    var options={
        port:7474,
        path:'/db/data/transaction/commit',
        method:'POST',
        auth:config.neoAuth
    };
    var dataRet;
    var startSource=req.query.source;
    var intermediate_nodes=req.query.intermediate_nodes;
    var limit=req.query.limit;
    var req = http.request(options, function(res1) {
        console.log('STATUS: ' + res1.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res1.headers));
        res1.setEncoding('utf8');
        res1.on('data', function (chunk) {
            //console.log('BODY result: ' + chunk);
            console.log("res1 on called ");
            if(chunk != undefined)
            {
                dataRet = dataRet + chunk;
            }
            else{
                console.log("chunk is "+chunk)
            }

        });

        res1.on('end', function(){
            dataRet = dataRet.replace("undefined","");
            console.log("In end ========> dataRet ======>"+dataRet);
            var res1 = JSON.parse(dataRet);
            var nodes = [];
            var rels = [];
            var labels = [];
            var count=0;
            var clusterID=0;
            //console.log('BODY result: ' + JSON.stringify(res1["results"]));
            res1.results[0].data.forEach(function(row) {
                row.graph.nodes.forEach(function(n) {
                    var found = nodes.filter(function (m) { return m.id == n.id; }).length > 0;
                    if (!found) {
                        var node = n.properties||{}; node.id=n.id;node.type=n.labels[0];
                        node.caption=n.properties.title||n.properties.text||n.properties.name||n.properties.affilname;
                        nodes.push(node);
                        if (labels.indexOf(node.type) == -1) labels.push(node.type);
                    }
                });
                rels = rels.concat(row.graph.relationships.map(function(r) { return { source:r.startNode, target:r.endNode, caption:r.type} }));
            });
            var returned = [{graph:{nodes:nodes, edges:rels},labels:labels}];
            //console.log("rels == "+JSON.stringify(returned));
            return res.json(returned);

        })
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    console.log(limit);
    var uppLimit=3;
    if(parseInt(limit.toString())!=NaN&&parseInt(limit.toString())>0){
        uppLimit=limit;
    }

    var qTest = "MATCH (n:Paper{scopus_id:'"+startSource+"'})-[c:CITES*1.."+uppLimit+"]->(e:Paper) RETURN n,c,e";
    if(intermediate_nodes.toString()=="true"){
        qTest="MATCH path=(n:Paper{scopus_id:'"+startSource+"'})-[c:CITES*1.."+uppLimit+"]->(e:Paper)" +
            " UNWIND NODES(path) as PNODE WITH PNODE,c " +
            " MATCH (PNODE:Paper)-[in:associated_to|:written_by|:affiliated_to]-(nodes) " +
            " RETURN PNODE,c,in,nodes"
    }

    console.log(qTest);
    var queryTest="{\"statements\" : [ { \"statement\" : \" "+ qTest +"\", \"resultDataContents\" : [ \"graph\" ] } ] }"

    req.write(queryTest);
    req.end();
};