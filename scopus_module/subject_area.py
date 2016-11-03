import pdb

class subject_areas(object):

    @property
    def text(self):
        return self._text
    @property
    def abbrev(self):
        return self._abbrev
    @property
    def code(self):
        return self._code
    @property
    def relationship_type(self):
        return self._relationship_type
    @property
    def properties(self):
        return self._properties

    def __init__(self,subject_dict):
        self._text = subject_dict["text"]
        self._abbrev = subject_dict["abbrev"]
        self._code = subject_dict["code"]
        self._relationship_type = "associated_to"
        self._properties = ["text","abbrev","code"]

    def prop_string(self):
        prop_string = "{"
        for prop in self.properties:
            if getattr(self,prop)!=None:
                prop_string+=prop+':"'+getattr(self,prop)+'",'
        prop_string=prop_string[:-1]
        prop_string+="}"
        return prop_string

    def getRelatedPaper(self,graph):
	retlist=[]
	query="Match (s:subject_area{code:"'"'+self.code+'"'"})<-[a:associated_to]-(p:Paper) Return p.title as title"
	result=graph.run(query)
	for record in result:
		retList.append(record)
	return retList
