app.controller('HeaderController', function ($scope, $location, CurrentUser){
    $scope.currentUser = {};
    $scope.currentUser.email = "";

    CurrentUser.getUser(function(data){
        $scope.currentUser.email = data.email;
    });

    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };
});
