website.controller('NavbarController', function($scope, $location) {

    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };

});