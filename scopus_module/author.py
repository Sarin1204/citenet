import pdb

class authors(object):

    @property
    def name(self):
        return self._name

    @property
    def id(self):
        return self._id

    @property
    def relationship_type(self):
        return self._relationship_type

    @property
    def properties(self):
        return self._properties

    def __init__(self,author_dict):
        self._name = author_dict["name"]
        self._id = author_dict["id"]
        self._relationship_type = "written_by"
        self._properties = ["name","id"]

    def prop_string(self):
        prop_string = "{"
        for prop in self.properties:
            if getattr(self,prop)!=None:
                prop_string+=prop+':"'+getattr(self,prop)+'",'
        prop_string=prop_string[:-1]
        prop_string+="}"
        return prop_string

