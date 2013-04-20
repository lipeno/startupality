website.controller('ProjectsController', function ( $scope, $location, $dialog, StorageService ) {
    $scope.projects = [];
    if (StorageService.get('projects')){
        $scope.projects = StorageService.get('projects');
    }

    $scope.newProject = "";
    $scope.editedProject = null;

    $scope.$watch('projects', function() {
        $scope.remainingCount = $scope.projects.length;
        $scope.doneCount = $scope.projects.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount
        StorageService.put('projects', $scope.projects);
    }, true);

    $scope.addProject = function() {
        if ( !$scope.newProject.length ) {
            return;
        }

        $scope.projects.push({
            title: $scope.newProject,
            completed: false
        });

        $scope.newProject = '';
    };


    $scope.editProject = function( project ) {
        $scope.editedProject = project;
    };


    $scope.doneEditing = function( project ) {
        $scope.editedProject = null;
        if ( !project.title ) {
            $scope.removeProject(project);
        }
    };

    $scope.removeProject = function(item){
        var msgbox = $dialog.messageBox('Delete project', 'Are you sure you want to delete project ' + '"' + item.title + '"' + '?', [{label:'Yes', result: 'yes', cssClass:'btn btn-primary'},{label:'No', result: 'no'}]);
        msgbox.open().then(function(result){
            if(result === 'yes') {$scope.projects.splice($scope.projects.indexOf(item), 1);}
        });
    };

    $scope.activateProject = function( project ) {
        $scope.projects.forEach(function( projectItem ) {
            projectItem.completed = false;
        });
        project.completed = true;
    };
});

