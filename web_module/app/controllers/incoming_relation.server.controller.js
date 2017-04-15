/**
 * Created by Dhruvraj on 11/14/2016.
 */
var http = require("http"),
    config = require('../../config/config.js');

exports.getIncomingRelation = function(req, res){

    console.log("Inside getIncomingRelation controller");

    var options={
        port:7474,
        path:'/db/data/transaction/commit',
        method:'POST',
        auth:config.neoAuth
    };
    var dataRet;
    var endEntity=req.query.source;
    var entityType=req.query.entitytype;
    var intermediate_nodes=req.query.intermediate_nodes;
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
                        node.caption=n.properties.title||n.properties.text||n.properties.affilname||n.properties.name;
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



    var qTest = "MATCH path=(n:Paper)-[c:CITES]->(e:Paper{scopus_id:'"+endEntity+"'}) UNWIND NODES(path) as pnode RETURN pnode,c"
    if(entityType.toString()=="Author"){
        qTest="MATCH path=(n:Paper)-[c:written_by]->(e:author{name:'"+endEntity+"'}) UNWIND NODES(path) as pnode RETURN pnode,c"
        if(intermediate_nodes.toString()=="true"){
        qTest="MATCH path=(n:Paper)-[c:written_by]->(e:author{name:'"+endEntity+"'}) " +
            " UNWIND NODES(path) as pnode WITH pnode,c" +
            " MATCH (pnode:Paper)-[in:associated_to|:written_by|:affiliated_to|:contains]-(nodes) RETURN pnode,c,in,nodes"
        }
    }else if(entityType.toString()=="Affiliation"){
        qTest="MATCH path=(n:Paper)-[c:affiliated_to]->(e:affiliation{affilname:'"+endEntity+"'}) UNWIND NODES(path) as pnode RETURN pnode,c"
        if(intermediate_nodes.toString()=="true"){
            qTest="MATCH path=(n:Paper)-[c:affiliated_to]->(e:affiliation{affilname:'"+endEntity+"'}) " +
                " UNWIND NODES(path) as pnode WITH pnode,c" +
                " MATCH (pnode:Paper)-[in:associated_to|:written_by|:affiliated_to|:contains]-(nodes) RETURN pnode,c,in,nodes"
        }
    }else if(entityType.toString()=="Keywords"){
        qTest="MATCH path=(n:Paper)-[c:contains]->(e:Keyword{value:'"+endEntity+"'}) UNWIND NODES(path) as pnode RETURN pnode,c"
        if(intermediate_nodes.toString()=="true"){
            qTest="MATCH path=(n:Paper)-[c:contains]->(e:Keyword{value:'"+endEntity+"'}) " +
                " UNWIND NODES(path) as pnode WITH pnode,c" +
                " MATCH (pnode:Paper)-[in:associated_to|:written_by|:affiliated_to|:contains]-(nodes) RETURN pnode,c,in,nodes"
        }
    }else if(entityType.toString()=="SubjectArea"){
        qTest="MATCH path=(n:Paper)-[c:associated_to]->(e:subject_area{text:'"+endEntity+"'}) UNWIND NODES(path) as pnode RETURN pnode,c"
        if(intermediate_nodes.toString()=="true"){
            qTest="MATCH path=(n:Paper)-[c:associated_to]->(e:subject_area{text:'"+endEntity+"'}) " +
                " UNWIND NODES(path) as pnode WITH pnode,c" +
                " MATCH (pnode:Paper)-[in:associated_to|:written_by|:affiliated_to|:contains]-(nodes) RETURN pnode,c,in,nodes"
        }
    }else{
        if(intermediate_nodes.toString()=="true"){
            qTest="MATCH path=(n:Paper)-[c:CITES]->(e:Paper{scopus_id:'"+endEntity+"'}) " +
                " UNWIND NODES(path) as pnode WITH pnode,c" +
                " MATCH (pnode:Paper)-[in:associated_to|:written_by|:affiliated_to|:contains]-(nodes) RETURN pnode,c,in,nodes"
        }
    }


    qTest=qTest+" LIMIT 100";
    console.log(qTest);
    var queryTest="{\"statements\" : [ { \"statement\" : \" "+ qTest +"\", \"resultDataContents\" : [ \"graph\" ] } ] }"
    req.write(queryTest);
    req.end();
};