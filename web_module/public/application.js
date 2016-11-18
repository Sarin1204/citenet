/**
 * Created by vipul on 4/23/2016.
 */
var mainApplicationModuleName = 'citenet';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','ngTagsInput','ngAnimate','ui.bootstrap','ui.select','ngSanitize','frapontillo.bootstrap-switch','ngFileUpload',
    'auth','home','getUser','signupPerson','signinPerson','dashboard','roles','roleStatus','upload_papers','shortest_path','subject_area_connection','sphere_influence','incoming_relation']);
mainApplicationModule.config(['$locationProvider','$httpProvider',
    function($locationProvider,$httpProvider){
        $locationProvider.hashPrefix('!');
        $httpProvider.interceptors.push(function($q, $location)
        {
            return {
                response: function(response) {
                    // do something on success
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401) {
                        console.log("In responseError");
                        $location.url('/');
                    }
                    return $q.reject(response);
                }
            };
        });
    }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});