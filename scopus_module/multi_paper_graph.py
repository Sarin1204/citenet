
from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
from paper_abstract import *
import pdb


authenticate("localhost:7474", "neo4j", "3800")
graph = Graph()
with open("asu_papers") as f:
    paper_ids = f.readlines()
paper_ids = [x.strip('\n') for x in paper_ids]

for paper_id in paper_ids:
  paper_abstract = ScopusAbstract("2-s2.0-"+paper_id)
  pdb.set_trace()
  mp = PaperAbstract(paper_id)
  pdb.set_trace()
  node = Node("Paper", title =paper_abstract.title,eid=paper_abstract.eid)
  if paper_abstract.references != None:
    for ref_id in paper_abstract.references:
      ref_paper = ScopusAbstract("2-s2.0-"+ref_id)
      if ref_paper.title != None:
        ref_paper_node = Node("Paper", title=ref_paper.title, eid=ref_paper.eid)
        node_cites_ref_paper_node = Relationship(node, "CITES", ref_paper_node)
        graph.create(node_cites_ref_paper_node)

