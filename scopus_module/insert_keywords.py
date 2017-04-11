from __future__ import division
from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
from paper_abstract import *
import pdb
import argparse
import json
import os
import zerorpc
import logging
import time
from scopus.scopus_search import ScopusSearch

logging.basicConfig()

def extract_text(paper):
    description = dict(paper)['p.description']
    title = dict(paper)['p.title']
    text=""
    if description != None:
        text+=description + ' '
    if title != None:
        text+=title
    return text.split(' ')

def add_keyword_paper_relationship(keyword_dict,graph):
    count_papers_query = 'MATCH (p:Paper) return count(p)'
    total_papers = graph.run(count_papers_query).evaluate()
    all_papers_query = 'MATCH (p:Paper) return p.description,p.title,p.scopus_id'
    paper_nodes = graph.run(all_papers_query)
    count=0
    for paper in paper_nodes:
        text_to_search = extract_text(paper)
        if text_to_search != None:
            for word in text_to_search:
                if word in keyword_dict:
                    query = 'MATCH(p:Paper{scopus_id:"'+dict(paper)['p.scopus_id']+'"})'
                    query += ' MATCH(k:Keyword{value:"'+word+'"})'
                    query += ' MERGE (p)-[c:contains]->(k) return p,k,c'
                    val = graph.run(query)
        count+=1
        if count%10==0:
            print (count/total_papers)*100
            yield (count/total_papers)*100

    yield (count/total_papers)*100
def create_keyword_nodes(keywords,graph):
    keyword_dict={}
    for word in keywords:
        find_word_query = 'MATCH(k:Keyword{value:"'+word+'"}) RETURN k'
        find_ret = graph.run(find_word_query)
        if find_ret.evaluate() == None:
            create_word_query = 'CREATE(k:Keyword{value:"'+word+'"})'
            graph.run(create_word_query)
        keyword_dict[word]=1
    return keyword_dict

def init_arg_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument("keywords",help="Keywords to be inserted, separated by commas")
    parser.add_argument("-s","--server",help="IP address of neo4j server,default=localhost")
    parser.add_argument("-p","--port",help="Port number on which neo4j listens,default=7474")
    args=parser.parse_args()
    keywords = args.keywords.split(',')
    server=args.server if args.server else "localhost"
    port=args.port if args.port else "7474"
    return (keywords,server,port)

def insert_keywords(keywords):
    authenticate('localhost:7474','neo4j','3800')
    graph=Graph()
    keyword_dict=create_keyword_nodes(keywords,graph)
    return add_keyword_paper_relationship(keyword_dict,graph)


class StreamingRPC(object):
    @zerorpc.stream
    def insert_keywords(self, keywords):
        keywords = [str(x) for x in keywords.values()]
        print "Inserting keywords "+str(keywords)
        return insert_keywords(keywords)

    def insert_phrase(self,phrase,user):
        pdb.set_trace()
        print "Inside insert_phrase"+str(phrase) +str(user)
        EIDS_obj = ScopusSearch('title-abs-key ( Data Link Layer )', refresh=True)
        pdb.set_trace()
        EIDS = EIDS_obj.EIDS
        print os.system("./insert_papers.py files_uploaded\\" +user)


s = zerorpc.Server(StreamingRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()

'''(keywords,server,port) = init_arg_parser()
authenticate(server+":"+port, "neo4j", "3800")
graph = Graph()
pdb.set_trace()
keyword_dict = create_keyword_nodes(keywords,graph)
add_keyword_paper_relationship(keyword_dict,graph)'''
