from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
import pdb
import requests


#Get incoming relationship for particular Node
def getCitedBy(eid,graph):
	retList=[]
	i=0
	query="MATCH (n:Paper)-[c:CITES]->(e:Paper{eid:"'"'+eid+'"'"}) RETURN n.title as title"
	result = graph.run(query)
	for record in result:
		retList.append(record)
	return retList	


#Get Shortest Route between two nodes
def getShortestRoute(eid_start,eid_end,graph):
	query="MATCH (a:Paper { eid:"'"'+eid_start+'"'"}),(b:Paper { eid:"'"'+eid_end+'"'"}), p = shortestPath((a)-[*..500]-(b))RETURN p"
	result=graph.run(query)
#	pdb.set_trace()
	print(result.data())


#Create new Node if it doesn't exist
def editNode(eid,graph):
	query="MERGE(a:Paper{eid:"'"'+eid+'"'"})"
	graph.run(query)


#Create Relationship if it doesn't exist. Test method only, pass Node object instead of eid
def editPaperRelation(eid_Start,eid_End,graph):
	query="MATCH(a:Paper{eid:"'"'+eid_Start+'"'"}),(b:Paper{eid:"'"'+eid_End+'"'"}) CREATE UNIQUE (a)-[c:CITES]->(b)"
	graph.run(query)


#Match a paper by part of it's name
def partialMatch(name):
	query="MATCH(a:Paper) WHERE a.title=~"'"'+name+'.*"'" RETURN a.title as title"
	result=graph.run(query)
	for r in result:
		print("Title " +r['title'])

#authenticate("localhost:7687", "neo4j", "Dhruvra!591")
graph = Graph(user="neo4j",password="Dhruvra!591",bolt=True)
citeList=getCitedBy("2-s2.0-39449083996",graph)
for record in citeList:
	print(record['title'])
getShortestRoute("2-s2.0-0346735076","2-s2.0-70350466688",graph)
editNode("2-test-00",graph)
partialMatch("Casadonte")
editPaperRelation("2-test-00","2-test-01",graph)
#editNodeObject(Node)

