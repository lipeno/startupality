var app = angular.module("Startupality", ["ngResource",'ui.bootstrap','ui', 'ngDragDrop']);

// Gets authentication token injected in the DOM
app.config(["$httpProvider", function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

app.config(function ($routeProvider) {
        $routeProvider.
            when('/dashboard', {templateUrl:"/assets/partials/projects.html", controller: 'ProjectsController'}).
            when('/vision', {templateUrl:"/assets/partials/vision.html", controller: 'VisionController'}).
            when('/experiments', {templateUrl:"/assets/partials/canvas.html", controller: 'ExperimentsController'}).
            when('/finance', {templateUrl:"/assets/partials/finance.html", controller: 'FinanceController'}).
            when('/risks', {templateUrl:"/assets/partials/risks.html", controller: 'RisksController'}).
            when('/goals', {templateUrl:"/assets/partials/goals.html", controller: 'GoalsController'}).
            when('/businessplan', {templateUrl:"/assets/partials/businessplan.html", controller: 'BusinessplanController'}).
            when('/export', {templateUrl:"/assets/partials/export.html", controller: 'ExportController'}).
            otherwise({redirectTo:'/dashboard'});
});