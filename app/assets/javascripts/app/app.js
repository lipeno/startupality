var app = angular.module("Startupality", ["ngResource",'ui.bootstrap','ui']);

// Gets authentication token injected in the DOM
app.config(["$httpProvider", function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

app.config(function ($routeProvider) {
        $routeProvider.
            when('/dashboard', {templateUrl:"/assets/partials/projects.html", controller: 'ProjectsController'}).
            when('/canvas', {templateUrl:"/assets/partials/canvas.html", controller: 'CanvasController'}).
            when('/finance', {templateUrl:"/assets/partials/finance.html", controller: 'FinanceController'}).
            when('/risks', {templateUrl:"/assets/partials/risks.html", controller: 'RisksController'}).
            when('/checklist', {templateUrl:"/assets/partials/checklist.html"}).
            when('/businessplan', {templateUrl:"/assets/partials/businessplan.html", controller: 'BusinessplanController'}).
            otherwise({redirectTo:'/dashboard'});
});