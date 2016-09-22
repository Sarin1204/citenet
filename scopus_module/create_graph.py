
from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
import pdb

authenticate("localhost:7474", "neo4j", "3800")
graph = Graph()

ab = ScopusAbstract("2-s2.0-66749189220", refresh=True)
orig_node = Node("Paper", title =ab.title,eid=ab.eid)
for ref in ab.references:
  paper = ScopusAbstract("2-s2.0-"+ref)
  ref_paper_node = Node("Paper", title=paper.title, eid=paper.eid)
  orig_node_cites_ref_paper_node = Relationship(orig_node, "CITES", ref_paper_node)
  graph.create(orig_node_cites_ref_paper_node)

