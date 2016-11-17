/**
 * Created by sarin on 11/12/16.
 */
angular.module('dashboard').config(['AuthProvider','$routeProvider',
    function(AuthProvider,$routeProvider) {
        $routeProvider.
            when('/uploadPapers', {
                templateUrl: 'upload_papers/views/upload_papers.client.view.html',
                resolve: {
                    signedin:AuthProvider.checkSignedin
                }
            })
    }
]);