import pdb
from scopus.scopus_api import ScopusAbstract
from author import *
from affiliate_organization import *
from subject_area import *


class PaperAbstract(object):

  @property
  def node_properties(self):
    return self._node_properties

  @property
  def node_relationships(self):
    return self._node_relationships

  @property
  def raw_abstract(self):
    return self._raw_abstract

  @raw_abstract.setter
  def raw_abstract(self,raw_abstract):
    self._raw_abstract = raw_abstract

  @property
  def scopus_id(self):
    return self._scopus_id

  @scopus_id.setter
  def scopus_id(self,scopus_id):
    self._scopus_id = scopus_id

  @property
  def title(self):
    return self._title

  @title.setter
  def title(self,title):
    if title == None:
        self._title = None
    else:
        self._title = title.replace('"','')

  @property
  def subject_areas(self):
    return self._subject_areas

  @subject_areas.setter
  def subject_areas(self,subject_areas):
    self._subject_areas = subject_areas

  @property
  def references(self):
    return self._references

  @references.setter
  def references(self,references):
    self._references = references

  @property
  def affiliations(self):
    return self._affiliations

  @affiliations.setter
  def affiliations(self,raw_affiliations):
    affil_list = []
    for org in raw_affiliations:
      affil_dict = {}
      affil_dict['affilname'] = org.affilname
      affil_dict['id'] = org.id
      affil_list.append(affil_dict)
    self._affiliations = affil_list


  @property
  def authors(self):
    return self._authors

  @authors.setter
  def authors(self,raw_authors):
    if raw_authors == None:
      self._authors = None
      return
    authors_list = []
    for author in raw_authors:
      author_dict = {}
      author_dict['name'] = author.indexed_name
      author_dict['id'] = author.auid
      authors_list.append(author_dict)
    self._authors = authors_list


  @property
  def publisher(self):
    return self._publisher

  @publisher.setter
  def publisher(self,publisher):
    self._publisher = publisher

  @property
  def srctype(self):
    return self._srctype

  @srctype.setter
  def srctype(self,srctype):
    self._srctype=srctype

  @property
  def description(self):
      return self._description

  @description.setter
  def description(self,description):
      if description != None:
        self._description=description.replace('"','')
      else:
          self._description = None

  def __init__(self,arg1):
    self.no_abstract = False
    if isinstance(arg1, str):
        try:
            self._raw_abstract = ScopusAbstract("2-s2.0-"+arg1.replace("2-s2.0-","").strip())
        except Exception,e:
            self.no_abstract = True
            return
    else:
      self._raw_abstract = arg1

    self._node_properties = ["scopus_id","title","publisher","srctype","description"]
    self._node_relationships = ["subject_areas","affiliations","authors"]
    '''self._scopus_id = self.raw_abstract.eid
      self._title = self.raw_abstract.title
      self._subject_areas = self.raw_abstract.subject_areas
      self._references = self.raw_abstract.references
      self.affiliate_orgs = self.raw_abstract.affiliations
      self.authors = self.raw_abstract.authors
      self._publisher = self.raw_abstract.publisher
      self._srctype = self.raw_abstract.srctype'''
    for attr in (self._node_properties+self._node_relationships+["references"]):
      try:
        setattr(self,attr,getattr(self.raw_abstract,attr))
      except Exception,e:
        print e
        setattr(self,attr,None)
        continue

  def create_node_prop_string(self):
    prop_string ="{"
    for prop in self.node_properties:
      if getattr(self,prop)!=None:
        prop_string+=prop+':"'+getattr(self,prop)+'",'
    prop_string=prop_string[:-1]
    prop_string+="}"
    return prop_string

  def create_prop_string(self,prop_dict):
    prop_string = "{"
    for key,value in prop_dict.iteritems():
      prop_string+=key+':"'+value+'",'
    prop_string=prop_string[:-1]
    prop_string+="}"
    return prop_string

  def create_remote_node(self,graph):
    find_query = 'MATCH(p:Paper{scopus_id:"'+self.scopus_id+'"}) RETURN p'
    find_ret = graph.run(find_query)
    find_ret_data = find_ret.data()
    if len(find_ret_data) == 0:
      create_query = 'CREATE(p:Paper'+self.create_node_prop_string()+')'
      graph.run(create_query)
    elif 'description' not in find_ret_data and self.description is not None:
        update_query = 'MATCH(p:Paper{scopus_id:"'+self.scopus_id+'"}) SET p.description = "'+self.description+'" return p'
        graph.run(update_query)

  def create_remote_relationships(self,graph):
    for rel_type in self.node_relationships:
      if getattr(self,rel_type) != None:
        rel_type_list = getattr(self,rel_type)
        for rel in rel_type_list:
          rel_obj = globals()[rel_type](rel)
          query='MERGE(r:'+rel_obj.__class__.__name__[:-1]+rel_obj.prop_string()+')'
          query+=' MERGE(p:Paper{scopus_id:"'+self.scopus_id+'"})'
          query+=' MERGE(p)-[:'+rel_obj.relationship_type+']->(r) return p,r'
          graph.run(query)

  def getCitedBy(self,graph):
	retlist=[]
	query="MATCH (n:Paper)-[c:CITES]->(e:Paper{scopus_id:"'"'+self.scopus_id+'"'"}) RETURN n.title as title"
	result = graph.run(query)
        for record in result:
                retList.append(record)
        return retList

  def bind_remote(self,graph):
    self.create_remote_node(graph)
    self.create_remote_relationships(graph)

