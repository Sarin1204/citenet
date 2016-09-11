import pdb
from scopus.scopus_search import ScopusSearch

ab = ScopusSearch('AFFILORG ( Arizona State University ) AND PUBYEAR = 2009 AND SUBJAREA(PHYS)')
print ab
