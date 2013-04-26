var app = angular.module("Scriptecology", ["ngResource",'ui.bootstrap', 'ui']);
app.config(["$httpProvider", function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/dashboard', {templateUrl:"/assets/partials/projects.html", controller: 'ProjectsController'}).
        when('/canvas', {templateUrl:"/assets/partials/canvas.html", controller: 'CanvasController'}).
        when('/risks', {templateUrl:"/assets/partials/risks.html"}).
        when('/checklist', {templateUrl:"/assets/partials/checklist.html"}).
        when('/businessplan', {templateUrl:"/assets/partials/businessplan.html", controller: 'BusinessplanController'}).
        otherwise({redirectTo:'/dashboard'});
});

app.factory('StorageService', function() {
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

//app.value('ui.config', {
//   select2: {
//      allowClear: true,
//       minimumInputLength: 1
//   }
//});