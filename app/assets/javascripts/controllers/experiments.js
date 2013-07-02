app.controller('ExperimentsController', function ($scope){
    $scope.currentView = 'goals';
    $scope.isCurrentView = function(view){
        if (view === $scope.currentView){
            return true;
        }
        return false;
    }
    $scope.changeView = function(view){
        if (view === 'goals'){
            $scope.currentView =  view;
        }
    }
    $scope.getCurrentView = function(){
        if ($scope.currentView === 'goals'){
            return  '/assets/partials/goals.html'
        }
//        if ($scope.currentView === 'financialIndicators'){
//            return  '/assets/partials/financialIndicators.html'
//        }
        else return ''
    }

    $scope.toastr = toastr;
});