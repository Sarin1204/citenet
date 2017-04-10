import pdb
from scopus.scopus_api import ScopusAbstract

ab = ScopusAbstract("2-s2.0-84938117894")
pdb.set_trace()

'''for au in ab.authors:
    print(au)
    print([x for x in dir(au) if '__' not in x])'''
