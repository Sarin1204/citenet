/**
 * Created by sarin on 11/12/16.
 */
angular.module('upload_papers').factory('UploadPapers',['$resource',
    function($resource) {
        return {
            GetProgress:  $resource('api/getProgress/:user_email',{
                user_email:'@user_email'
            }),
            UploadPapers:  $resource('api/uploadPapers'),

            GetPhraseProgress:  $resource('api/getPhraseProgress/:user_email',{
                user_email:'@user_email'
            }),
            UploadPhrase:  $resource('api/uploadPhrase')
        };
    }
]);