from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
from paper_abstract import *
import pdb



#Get Shortest Path
def getShortestPath(paper_a,paper_b):
	retList=[]
	query="MATCH p=shortestPath((a:Paper{scopus_id:"'"'+paper_a.scopus_id+'"'"})-[:CITES*]-(b:Paper{scopus_id:"'"'+paper_b.scopus_id+'"'"})) UNWIND NODES(p) as PNODE RETURN PNODE.title"
	result=graph.run(query)
	for r in result:
		retList.append(r)
	return retList

#Get all papers from same subject area as given Paper
def getSameSubjPaper(paper_a,graph):
	retList=[]
	query="MATCH(n:Paper{scopus_id:"'"'+paper_a.scopus_id+'"'"})-[a:associated_to]->(s)<-[b:associated_to]-(p:Paper) RETURN COLLECT(distinct p.title) as title"
	result=graph.run(query)
	for paper in result:
		for p in paper:
			retList.append(p)
			print(p)
	return retList


def getSameAuthPaper(paper_a,graph):
	retList=[]
	query="MATCH(n:Paper{scopus_id:"'"'+paper_a+'"'"})-[a:written_by]->(s:author)<-[b:written_by]-(p:Paper) WHERE NOT (n.title IN p.title) RETURN COLLECT(distinct p.title) as title"
	result=graph.run(query)
	for paper in result:
		for p in paper:
			retList.append(p)
			print(p)
	return retList


#Get one subject's relation with another via papers
def getSubjRel(start_code,end_code,graph):
	retList=[]
	query="MATCH (s:subject_area{code:"'"'+start_code+'"'"})<-[a:associated_to]-(p:Paper)-[c:CITES*0..10]->(p1:Paper)-[b:associated_to*0..10]->(e:subject_area{code:"'"'+end_code+'"'"}) RETURN COUNT(p1) AS distance,COLLECT(distinct p1.title) as pw,p.title as ptit"
	result=graph.run(query)
	for record in result:
		retList.append(record["ptit"])
		print(record["ptit"])
		for title in record["pw"]:
			retList.append(title)
			print(title)
		print(record["distance"])
	return retList

#Get Relation between two authors
def getAuthorRel(auth_start,auth_end,graph):
	retList=[]
	query="MATCH (s:author{name:"'"'+auth_start+'"'"})<-[a:written_by]-(p:Paper)-[c:CITES*0..10]->(p1:Paper)-[b:written_by]->(e:author{name:"'"'+auth_end+'"'"}) RETURN COUNT(p1) AS count,COLLECT(p1.title) as pw,p.title as ptit"
	result=graph.run(query)
	for record in result:
		retList.append(record["ptit"])
		print(record["ptit"])
		for title in record["pw"]:
			retList.append(title)
			print("tit "+ title)
		print(record["count"])
	return retList

