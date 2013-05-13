app.controller('ProjectsController', function ( $scope, $location, $dialog, Project, ProjectProperties) {
    // Define persisted object
    $scope.projects = Project.query();

    $scope.$watch('projects', function() {
        if ($scope.projects.length === 0) {ProjectProperties.unsetProjectExists();} else {ProjectProperties.setProjectExists();}
//        $scope.remainingCount = $scope.projects.length;
//        $scope.doneCount = $scope.projects.length - $scope.remainingCount;
//        $scope.allChecked = !$scope.remainingCount;
    }, true);

    $scope.newProject = "";

    $scope.addProject = function() {
        if ( !$scope.newProject.length ) {
            return;
        }
        var newProject = new Project();
        newProject.title= $scope.newProject;
        newProject.activated = false;
        // If it is first activate it
        if ($scope.projects.length === 0) {
            newProject.activated = true;

        }

        $scope.projects.push(newProject);
        newProject.$save(newProject);

        $scope.newProject = '';
    };

    $scope.editedProject = null;
    $scope.editProject = function( project ) {
        $scope.editedProject = project;
    };

    $scope.doneEditing = function( project ) {
        console.log(project);
        // Persist to DB
        $scope.editedProject.$update($scope.editedProject.id);
        $scope.editedProject = null;
        if ( !project.title ) {
            $scope.removeProject(project);
        }
        console.log("id ", $scope.editedProject);
    };

    $scope.removeProject = function(project){
        var msgbox = $dialog.messageBox('Delete project', 'Are you sure you want to delete project ' + '"' + project.title + '"' + '?', [{label:'Yes', result: 'yes', cssClass:'btn btn-primary'},{label:'No', result: 'no'}]);
        msgbox.open().then(function(result){
            if(result === 'yes') {
                $scope.projects.splice($scope.projects.indexOf(project), 1);
                console.log(project.id);
                if (project.activated) {
                    // Remove
                    project.$remove();
                    // sort to find latest added project
                    var projectToActivate =  getLatestAddedProject();
                    // and set another one to active
                    if (projectToActivate){
                        $scope.activateProject(projectToActivate);
                    }
                }
                else {
                    project.$remove();
                }
            }
        });
    };

    $scope.activateProject = function( project ) {
        $scope.projects.forEach(function( projectItem ) {
            projectItem.activated = false;
            projectItem.$update();
        });

        project.activated = true;
        project.$update();
    };

    function getLatestAddedProject() {
        return $scope.projects.sort(function(a,b)
        {
            var aTime = new Date();
            aTime.setUTCHours(
                parseInt(a.created_at.substr(0, 2), 10),
                parseInt(a.created_at.substr(3, 2), 10),
                0,
                0
            );
            var bTime = new Date();
            bTime.setUTCHours(
                parseInt(b.created_at.substr(0, 2), 10),
                parseInt(b.created_at.substr(3, 2), 10),
                0,
                0
            );
            return bTime - aTime
        })[0];
    }
});

