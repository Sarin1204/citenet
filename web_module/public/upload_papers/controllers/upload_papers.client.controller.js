/**
 * Created by sarin on 11/12/16.
 */
angular.module('upload_papers').controller('UploadPapersController',['Upload','$timeout','$interval','getUser','UploadPapers', function(Upload,$timeout,$interval,getUser,UploadPapers){
    var vm=this;
    vm.is_uploaded = false;

    vm.upload_papers = function(){
        if(vm.upload_form.file.$valid){
            var uploadPapers = new Upload.upload({
                url: 'api/uploadPapers',
                data: {file:vm.file},
                user: getUser.user
            }).then(function(resp){
                    console.log("inside upload papers resp "+resp);
                    vm.postUploadResult = {type:"alert alert-success", msg: "File Uploaded"};
                    vm.showMessage = true;
                    $timeout(function() {
                        vm.showMessage = false;
                    }, 3000);
                    vm.is_uploaded=true;
                    vm.progress=0;
                    get_progress(vm);
                }, function(err){
                    console.log("inside upload papers err "+err);
                    if(err.data.error == "previous"){
                        vm.postUploadResult =  {type:"alert alert-danger", msg: "File upload failed... previous file still in progress"};
                        vm.is_uploaded=true;
                        vm.progress=0;
                        get_progress(vm)
                    }
                    else{
                        vm.postUploadResult =  {type:"alert alert-danger", msg: "File upload failed..."};
                    }
                    vm.showMessage = true;
                    $timeout(function() {
                        vm.showMessage = false;
                    }, 3000);
                });
        }
        else
        {
            vm.postUploadResult =  {type:"alert alert-danger", msg: "Incorrect file type...only .txt files allowed"};
            vm.showMessage = true;
            $timeout(function() {
                vm.showMessage = false;
            }, 3000);

        }
    }

    vm.upload_phrase = function(){
        console.log('Inside upload_phrase');
        var phrase = new UploadPapers.UploadPhrase({
            phrase: this.phrase,
            user: getUser.user
        });
        console.log('phrase uploaded are'+JSON.stringify(phrase));

        phrase.$save(function(response){
            console.log("Inside phrase "+JSON.stringify(response));

            vm.postPhraseUploadResult = {type:"alert alert-success", msg: "Phrase Uploaded"};
            vm.showPhraseMessage = true;
            vm.is_phrase_uploaded = true;
            $timeout(function() {
                vm.showPhraseMessage = false;
            }, 3000);
            vm.phrase_progress=0;
            get_phrase_progress(vm);

        }, function(errorResponse){
            console.log('error'+JSON.stringify(errorResponse));
        });
    };


    function get_progress(vm){
        interval_promise = $interval(function(){
            console.log("get progress user email is "+getUser.user.email);
            UploadPapers.GetProgress.get({"user_email":getUser.user.email},function(response){
                console.log("get progress response is "+JSON.stringify(response));
                var status = JSON.parse(response.message);
                var percent_completed = Math.round(status.completed/status.total*100)
                vm.progress=percent_completed;
                if(percent_completed == 100)
                {
                    $interval.cancel(interval_promise);
                }
            },function(error){
                console.log("get progress error is"+JSON.stringify(error));
                $interval.cancel(interval_promise);
                vm.postUploadResult =  {type:"alert alert-danger", msg: "File upload failed..."};
                vm.showMessage = true;
                $timeout(function() {
                    vm.showMessage = false;
                }, 3000);

            })
        }, 3000);

    }

    function get_phrase_progress(vm){
        interval_promise = $interval(function(){
            console.log("get phrase progress user email is "+getUser.user.email);
            UploadPapers.GetPhraseProgress.get({"user_email":getUser.user.email},function(response){
                console.log("get phrase progress response is "+JSON.stringify(response));
                var status = JSON.parse(response.message);
                var percent_completed = Math.round(status.completed/status.total*100)
                vm.phrase_progress=percent_completed;
                if(percent_completed == 100)
                {
                    $interval.cancel(interval_promise);
                }
            },function(error){
                console.log("get phrase progress error is"+JSON.stringify(error));
                $interval.cancel(interval_promise);
                vm.postPhraseUploadResult =  {type:"alert alert-danger", msg: "Phrase upload failed..."};
                vm.showPhraseMessage = true;
                $timeout(function() {
                    vm.showPhraseMessage = false;
                }, 3000);

            })
        }, 3000);

    }

}]);