import pdb

class affiliations(object):

    @property
    def affilname(self):
        return self._affilname

    @property
    def id(self):
        return self._id

    @property
    def relationship_type(self):
        return self._relationship_type

    @property
    def properties(self):
        return self._properties

    def __init__(self,affil_dict):
        self._affilname = affil_dict["affilname"]
        self._id = affil_dict["id"]
        self._relationship_type = "affiliated_to"
        self._properties = ["affilname","id"]

    def prop_string(self):
        prop_string = "{"
        for prop in self.properties:
            if getattr(self,prop)!=None:
                prop_string+=prop+':"'+getattr(self,prop)+'",'
        prop_string=prop_string[:-1]
        prop_string+="}"
        return prop_string


