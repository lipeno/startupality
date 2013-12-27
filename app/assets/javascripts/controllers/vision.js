app.controller('VisionController', function ($scope, CurrentProject, Section, SectionType){
    $scope.currentView = 'canvas';
    $scope.isCurrentView = function(view){
        if (view === $scope.currentView){
            return true;
        }
        return false;
    }
    $scope.changeView = function(view){
        if (view === 'canvas' || 'checklist'){
            $scope.currentView =  view;
        }
    }
    $scope.getCurrentView = function(){
        if ($scope.currentView === 'canvas'){
            return  '/assets/partials/canvas.html'
        }
        if ($scope.currentView === 'checklist'){
            return  '/assets/partials/checklist.html'
        }
        else return ''
    }
});