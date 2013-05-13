app.controller('HeaderController', function ($scope, $location, CurrentUser, CurrentProject, ProjectProperties){
    $scope.currentUser = {};
    $scope.currentUser.email = "";
    // To disable the links when there are no projects created
    $scope.projectCreated = true;
    $scope.projectCreated = function() { return ProjectProperties.getProjectExists(); }
    $scope.buildUrl = function(url) { return $scope.projectCreated() ? url: "#" };
    $scope.isDisabled = function() { return $scope.projectCreated() ? "": "disabledLink"; }

    CurrentUser.getUser(function(data){
        $scope.currentUser.email = data.email;
    });

    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };

    $scope.toastr = toastr;
});
