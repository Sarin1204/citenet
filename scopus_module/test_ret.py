from py2neo import authenticate, Graph, Node, Relationship
from scopus.scopus_api import ScopusAbstract
import pdb
import requests
from data_ret import *
from paper_abstract import *

graph = Graph(user="neo4j",password="Dhruvra!591",bolt=True)
#getSubjRel("3104","1507",graph)
getSameAuthPaper("2-s2.0-0036026421",graph)
#getAuthorRel("Agrawal D.","Peelamedu R.",graph)






