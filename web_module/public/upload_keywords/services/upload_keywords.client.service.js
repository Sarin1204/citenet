/**
 * Created by sarin on 4/8/17.
 */
angular.module('upload_keywords').factory('UploadKeywords',['$resource',
    function($resource) {
        return {
            GetKeywordProgress:  $resource('api/getKeywordProgress/:id',{
                id:'@id'
            }),
            UploadKeywords:  $resource('api/uploadKeywords')
        };
    }
]);