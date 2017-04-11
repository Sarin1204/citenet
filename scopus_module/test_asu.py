import pdb
from scopus.scopus_search import ScopusSearch

ab = ScopusSearch('AFFILORG ( Arizona State University ) AND PUBYEAR = 2009 AND SUBJAREA(PHYS)')
pdb.set_trace()
#bc = ScopusSearch('title-abs-key ( Data Link Layer )', refresh=True)
pdb.set_trace()
print ab
