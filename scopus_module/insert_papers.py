from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
from paper_abstract import *
import pdb
import argparse
import json
import os

def init_arg_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument("filename",help="Name of file with papers to be inserted")
    parser.add_argument("-s","--server",help="IP address of neo4j server,default=localhost")
    parser.add_argument("-p","--port",help="Port number on which neo4j listens,default=7474")
    args=parser.parse_args()
    filename = args.filename
    server=args.server if args.server else "localhost"
    port=args.port if args.port else "7474"
    return (filename,server,port)


def connect_parent_node(curr_paper,parent_id):
    if parent_id != None:
        query = 'MATCH(parent:Paper{scopus_id:"'+parent_id+'"}) MATCH(curr:Paper{scopus_id:"'+curr_paper.scopus_id+'"}) MERGE (parent)-[c:CITES]->(curr)'
        graph.run(query)

def perform_dfs(curr_paper,count):
    if curr_paper.references != None:
        for ref_id in curr_paper.references:
            dfs(ref_id,curr_paper.scopus_id,count+1)

def dfs(curr_paper_id,parent_id,count):
    if count > 2:
      return
    curr_paper = PaperAbstract(curr_paper_id)
    if curr_paper.title != None:
      curr_paper.bind_remote(graph)
      connect_parent_node(curr_paper,parent_id)
      perform_dfs(curr_paper,count)


(filename,server,port) = init_arg_parser()
filename=filename.replace("\n","")

authenticate(server+":"+port, "neo4j", "3800")
graph = Graph()
with open(filename) as f:
    paper_ids = f.readlines()
paper_ids = [x.strip('\n') for x in paper_ids]
completed = 0
data={}
data['total']=len(paper_ids)
data['completed']=completed
output_file=filename.replace(".txt","")
with open(output_file+'_output.txt','w+') as f:
    f.write(json.dumps(data))
try:
    for paper_id in paper_ids:
        dfs(paper_id,None,0)
        completed+=1
        data['completed']=completed
        data['curr_paper']=paper_id
        with open(output_file+"_output.txt",'w+') as f:
            f.write(json.dumps(data))
except Exception,e:
    os.remove(output_file+'_output.txt')


