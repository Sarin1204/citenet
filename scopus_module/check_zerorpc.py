import zerorpc
import logging
import pdb
logging.basicConfig()

def return_every_10():
    for i in range(0,100):
        if i%10==0:
            yield i

class StreamingRPC(object):
    @zerorpc.stream
    def insert_keywords(self, keywords):
        pdb.set_trace()
        keywords = [str(x) for x in keywords.values()]
        return return_every_10()

s = zerorpc.Server(StreamingRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()
