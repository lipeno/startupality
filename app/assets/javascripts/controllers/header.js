app.controller('HeaderController', function ($rootScope, $scope, $location, CurrentUser, CurrentProject, ProjectProperties){
    $scope.currentUser = {};
    $scope.currentUser.email = "";
    // To disable the links when there are no projects created
    $scope.projectCreated = true;
    $scope.projectCreated = function() { return ProjectProperties.getProjectExists(); }
    $scope.buildUrl = function(url) {
      if ($scope.projectCreated()){
        $location.path(url);
      }
      else{
        toastr.error('Please add your idea or project first.', 'No projects exist!');
        $location.path("#");
      }
    };

    CurrentUser.getUser(function(data){
        $scope.currentUser.email = data.email;
    });

    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };

    $scope.handleClick = function(routeName) {
      return $location.path() === routeName;
    };

    $scope.toastr = toastr;
});
