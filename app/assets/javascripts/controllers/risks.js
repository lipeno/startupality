app.controller('RisksController', function ($scope, Risk, Section, CurrentProject){
    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        var risks = Risk.query({projectId: $scope.currentProject.id}, function() {
            $scope.risks = risks[0];
        });
    });

    $scope.$watch('risks', function() {
        if ($scope.risks){
            var currentProject = CurrentProject.query(function(){
                // Update can be called because all the risks are persisted in one row
                $scope.risks.$update({projectId: currentProject[0].id});
            });
        }
    }, true);


    $scope.currentView = 'swotpestle';
    $scope.isCurrentView = function(view){
        if (view === $scope.currentView){
            return true;
        }
        return false;
    }
    $scope.changeView = function(view){
        if (view === 'swotpestle' || 'risksregister'){
            $scope.currentView =  view;
        }
    }
    $scope.getCurrentView = function(){
        if ($scope.currentView === 'swotpestle'){
            return  '/assets/partials/swotpestle.html'
        }
        if ($scope.currentView === 'risksregister'){
            return  '/assets/partials/risksregister.html'
        }
        else return ''
    }
});