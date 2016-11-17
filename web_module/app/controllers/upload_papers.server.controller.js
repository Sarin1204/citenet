/**
 * Created by sarin on 11/12/16.
 */

var multer = bcrypt = require('multer'),
    PythonShell = require('python-shell'),
    fs = require("fs"),
    config = require('../../config/config');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, config.scopus_module+'/files_uploaded')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log("file obj is "+JSON.stringify(file));
        console.log("file name is "+req.user[0].email);
        cb(null, req.user[0].email)
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

exports.uploadPapers = function(req, res) {
    //console.log("inside upload papers"+JSON.stringify(req));
    var contents=null;
    try{
        var contents = JSON.parse(fs.readFileSync(config.scopus_module+'/files_uploaded/'+req.user[0].email+'_output.txt','utf8'));
    } catch(e){
        console.log("inside readfilesync error"+JSON.stringify(e));
    }
    if(contents!=null && contents.completed < contents.total)
    {
        console.log("file contents indicate still in progress "+JSON.stringify(contents));
        return res.status(500).send({error: 'previous'})
    }
    console.log("upload papers output file contents "+contents);
    upload(req,res,function(err){
        console.log("inside upload papers"+JSON.stringify(req.user)+JSON.stringify(req.file));
        if(err){
            console.log("upload server controller error " + JSON.stringify(err));
            return res.status(500).send({ error: 'upload server controller error '+err });
        }
        start_graph_insert(req.user[0],req.file,res);
        return res.json({"status": "pass"});
    })
};

exports.getProgress = function(req,res){
    console.log("get progress req users"+req.params.user_email);
    fs.readFile(config.scopus_module+'/files_uploaded/'+req.params.user_email+"_output.txt", 'utf8', function(err, contents) {
        if(err){
            console.log("file read error "+JSON.stringify(err))
            return res.status(500).send({error: "failed"})
        }
        else
        {
            console.log("file read "+ contents);
            return res.json({"message":contents});
        }
    });
};

function start_graph_insert(user,file,res){
    var options = {
        scriptPath: config.scopus_module,
        args: config.scopus_module+'/files_uploaded/'+user.email,
        mode: 'json'
    };
    var pyshell= new PythonShell('insert_papers.py',options);
    PythonShell.run('insert_papers.py',options,function(err,results){
        if(err){
            console.log("error in run "+JSON.stringify(err))
        }
        console.log("results are "+JSON.stringify(results))
    });
    pyshell.end(function(){
        console.log("inside pyshell end");

    })

}