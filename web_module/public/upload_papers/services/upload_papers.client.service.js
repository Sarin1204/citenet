/**
 * Created by sarin on 11/12/16.
 */
angular.module('upload_papers').factory('UploadPapers',['$resource',
    function($resource) {
        return {
            GetProgress:  $resource('api/getProgress/:user_email',{
                user_email:'@user_email'
            }),
            UploadPapers:  $resource('api/uploadPapers')
        };
    }
]);