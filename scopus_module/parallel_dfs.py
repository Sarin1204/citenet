from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
from paper_abstract import *
from threading import Thread
from Queue import Queue
import pdb

concurrent = 200

def thread_run():
  while True:
    [curr_paper_id,parent_node,count]=q.get()
    print "func sig == "+str(curr_paper_id)+", "+str(count)
    dfs(curr_paper_id,parent_node,count)
    q.task_done()

def dfs(curr_paper_id,parent_node,count):
  try:
    global q
    if count > 3:
      return
    curr_paper_abstract = ScopusAbstract("2-s2.0-"+curr_paper_id)
    pdb.set_trace()
    curr_paper_node =  Node("Paper", title =curr_paper_abstract.title,eid=curr_paper_abstract.eid)
    if curr_paper_abstract.title == None:
      return
    print "curr_paper == "+curr_paper_abstract.title
    print ""

    if parent_node != None:
      parent_node_cites_curr_paper_node = Relationship(parent_node, "CITES", curr_paper_node)
      graph.merge(parent_node_cites_curr_paper_node,None,"eid")
    if curr_paper_abstract.references != None:
      for ref_id in curr_paper_abstract.references:
        q.put([ref_id,curr_paper_node,count+1],True)
    print "queue size == "+str(q.qsize())
  except Exception,e:
      print "Exception: count == "+str(count)
      print e

authenticate("localhost:7474", "neo4j", "3800")
graph = Graph()

q = Queue(concurrent*2)
for i in xrange(concurrent):
  t = Thread(target=thread_run)
  t.daemon = True
  t.start()

with open("asu_paper_test") as f:
    paper_ids = f.readlines()
paper_ids = [x.strip('\n') for x in paper_ids]

for paper_id in paper_ids:
  mp = PaperAbstract(paper_id)
  pdb.set_trace()
  dfs(paper_id,None,1)
q.join()

