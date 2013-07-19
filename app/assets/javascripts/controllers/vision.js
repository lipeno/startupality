app.controller('VisionController', function ($scope, $dialog, $modal, CurrentProject, Section, SectionType){
    $scope.currentView = 'newcanvas';
    $scope.isCurrentView = function(view){
        if (view === $scope.currentView){
            return true;
        }
        return false;
    }
    $scope.changeView = function(view){
        if (view === 'newcanvas' || 'checklist'){
            $scope.currentView =  view;
        }
    }
    $scope.getCurrentView = function(){
        if ($scope.currentView === 'canvas'){
            return  '/assets/partials/newcanvas.html'
        }
        if ($scope.currentView === 'checklist'){
            return  '/assets/partials/checklist.html'
        }
        else return ''
    }
});