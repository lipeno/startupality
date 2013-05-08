app.controller('RisksController', function ($scope, Risk, Section, CurrentProject){
    $scope.risks = {};
    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        var risks = Risk.query({projectId: $scope.currentProject.id}, function() {
            $scope.risks = risks[0];
        });
    });

    $scope.$watch('risks', function() {
        var currentProject = CurrentProject.query(function(){
            $scope.risks.$update({projectId: currentProject[0].id});
        });
    }, true);


});