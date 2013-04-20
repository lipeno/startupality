var website = angular.module('website', ['ui.bootstrap', 'ui']);

website.config(function ($routeProvider) {
    $routeProvider.
        when('/home', {templateUrl:'partials/basic-template.html'}).
        when('/dashboard', {templateUrl:'partials/projects.html', controller: 'ProjectsController'}).
        when('/canvas', {templateUrl:'partials/canvas.html', controller: 'CanvasController'}).
        when('/risks', {templateUrl:'partials/risks.html'}).
        when('/checklist', {templateUrl:'partials/checklist.html'}).
        when('/businessplan', {templateUrl:'partials/businessplan.html', controller: 'BusinessplanController'}).
        otherwise({redirectTo:'/dashboard'});
});

website.factory('StorageService', function() {
    var APPNAME = 'website' + '-';

    return {
        get: function(storageName) {
            var storageItem = localStorage.getItem(APPNAME + storageName);
            return JSON.parse(storageItem || '[]');
        },

        put: function( storageName, objectToStore ) {
            localStorage.setItem(APPNAME + storageName, JSON.stringify(objectToStore));
        }
    };
});

