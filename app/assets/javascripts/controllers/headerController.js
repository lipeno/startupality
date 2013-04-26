app.controller('HeaderController', function ($scope, CurrentUser){
    $scope.currentUser = {};
    $scope.currentUser.email = "";
    CurrentUser.getUser(function(data){
        $scope.currentUser.email = data.email;
    });
});
