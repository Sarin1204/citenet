
from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
from paper_abstract import *
import pdb

def dfs(paper_abstract,parent_node,count):
  if count > 2:
    return
  if paper_abstract.references != None:
    for ref_id in paper_abstract.references:
      ref_paper = ScopusAbstract("2-s2.0-"+ref_id)
      if ref_paper.title != None:
        ref_paper_node = Node("Paper", title=ref_paper.title, eid=ref_paper.eid)
        node_cites_ref_paper_node = Relationship(parent_node, "CITES", ref_paper_node)
        #query="MATCH(a:Paper{eid:"'"'+parent_node.properties["eid"]+'"'"}),(b:Paper{eid:"'"'+ref_paper_node.properties["eid"]+'"'"}) CREATE UNIQUE (a)-[c:CITES]->(b)"
        pdb.set_trace()
        query = 'MERGE(a:Paper{eid:"'+parent_node.properties["eid"]+'",title:"'+parent_node.properties["title"]+'"}) MERGE(b:Paper{eid:"'+ref_paper_node.properties["eid"]+'",title:"'+ref_paper_node.properties["title"]+'"}) MERGE(a)-[c:CITES]->(b)'
        ret = graph.run(query)
        #graph.merge(node_cites_ref_paper_node)
        dfs(ref_paper,ref_paper_node,count+1)

authenticate("localhost:7474", "neo4j", "3800")
graph = Graph()
with open("asu_paper_test") as f:
    paper_ids = f.readlines()
paper_ids = [x.strip('\n') for x in paper_ids]

for paper_id in paper_ids:
  paper_abstract = ScopusAbstract("2-s2.0-"+paper_id)
  node = Node("Paper", title =paper_abstract.title,eid=paper_abstract.eid)
  dfs(paper_abstract,node,1)


