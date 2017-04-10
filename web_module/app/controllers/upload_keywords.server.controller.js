/**
 * Created by sarin on 4/8/17.
 */

var kue = require('kue');
var queue = kue.createQueue();
var zerorpc = require("zerorpc");

exports.uploadKeywords = function(req, res) {
    console.log('inside upload_keywords controller' + JSON.stringify(req.body));

    var job = queue.create('upload_keywords',req.body).save( function(err){
        if(!err){
            queue.process('upload_keywords', function(job, done){

                function perform_keyword_upload(keywords, done){
                    console.log("Inside perform_keyword_upload"+JSON.stringify(keywords));
                    var client = new zerorpc.Client();
                    client.connect("tcp://127.0.0.1:4242");
                    client.invoke("insert_keywords",keywords, function(error, res, more) {
                        console.log(res);
                        job.progress(res,100);
                        done()
                    });
                }

                perform_keyword_upload(job.data,done)
            });
        }
        return res.json({"id":job.id});
    });
};

exports.getKeywordProgress = function(req,res){
    console.log("Inside getKeywordProgress "+JSON.stringify(req.params));
    var job_id = Number(req.params.id);
    kue.Job.get(job_id, function(err, job){
        job.on('progress', function(progress,data){
            return res.json({"progress":progress})
        })
        if (job.state() == 'complete'){
            return res.json({"progress":100})
        }
    })

};