import pdb
from scopus.scopus_api import ScopusAbstract

ab = ScopusAbstract("2-s2.0-84930662492")
for au in ab.authors:
    print(au)
    print([x for x in dir(au) if '__' not in x])
