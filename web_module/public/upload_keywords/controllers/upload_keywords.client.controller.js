/**
 * Created by sarin on 4/8/17.
 */
angular.module('upload_keywords').controller('UploadKeywordsController',['$scope',
    '$routeParams', '$location','UploadKeywords','$timeout','$interval','alertify',
    function($scope, $routeParams, $location, UploadKeywords,$timeout,$interval,alertify){
        var key = this;
        key.is_keyword_uploaded=false;
        key.upload_keywords = function(){
            console.log('Inside upload_keywords');
            var keywords = new UploadKeywords.UploadKeywords({
                keyword1: this.keyword1,
                keyword2: this.keyword2,
                keyword3: this.keyword3,
                keyword4: this.keyword4,
                keyword5: this.keyword5
            });
            console.log('keywords uploaded are'+JSON.stringify(keywords));

            keywords.$save(function(response){
                console.log("Inside keywords "+JSON.stringify(response));

                key.postKeywordUploadResult = {type:"alert alert-success", msg: "Keywords Uploaded"};
                key.showKeywordMessage = true;
                key.is_keyword_uploaded = true;
                $timeout(function() {
                    key.showKeywordMessage = false;
                }, 3000);
                key.keyword_progress=0;
                get_keyword_progress(key,response);

            }, function(errorResponse){
                console.log('error'+JSON.stringify(errorResponse));
            });
        };

        function get_keyword_progress(key,response){
            interval_promise = $interval(function(){
                console.log("get keyword progress job id is "+response.id);
                UploadKeywords.GetKeywordProgress.get({"id":response.id},function(response){
                    console.log("get progress response is "+JSON.stringify(response));
                    var status = JSON.parse(response.progress);
                    var percent_completed = Math.round(status);
                    key.keyword_progress=percent_completed;
                    if(percent_completed == 100)
                    {
                        $interval.cancel(interval_promise);
                    }
                },function(error){
                    console.log("get keyword error is"+JSON.stringify(error));
                    $interval.cancel(interval_promise);
                    key.postKeywordUploadResult =  {type:"alert alert-danger", msg: "Keyword upload failed"};
                    key.showKeywordMessage = true;
                    $timeout(function() {
                        key.showKeywordMessage = false;
                    }, 3000);

                })
            }, 3000);

        }

    }
]);