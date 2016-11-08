var http=require('http');

var options={
	port:7474,
	path:'/db/data/transaction/commit',
	method:'POST',
	auth:'neo4j:Dhruvra!591'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});


var qTest="MATCH p=shortestPath((a:Paper{scopus_id:'2-s2.0-0002871703'})-[c:CITES*]-(b:Paper{scopus_id:''2-s2.0-0011067403''})) UNWIND NODES(p) as PNODE RETURN PNODE,c"
var queryTest="{\"statements\" : [ { \"statement\" : \" "+ qTest +"\", \"resultDataContents\" : [ \"row\", \"graph\" ] } ] }"

req.write(queryTest);
req.end();