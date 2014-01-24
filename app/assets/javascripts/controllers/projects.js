app.controller('ProjectsController', function ( $scope, $modalInstance, $location, $modal, Project, ProjectProperties, segmentio) {
    // Define persisted object
    $scope.projects = Project.query();

    $scope.$watch('projects', function() {
        if ($scope.projects.length === 0) {ProjectProperties.unsetProjectExists();} else {ProjectProperties.setProjectExists();}
    }, true);

    $scope.newProject = "";

    $scope.close = function(result){
      $modalInstance.dismiss('cancel');
    };

    $scope.addProject = function(project) {
        if ( !project.length ) {
            return;
        }
        var newProject = new Project();
        newProject.title= project;
        newProject.activated = false;
        // If it is first activate it
        if ($scope.projects.length === 0) {
            newProject.activated = true;

        }

        $scope.projects.push(newProject);
        newProject.$save(newProject);

        // Track project add event
        segmentio.track('Added a Project', {
            projectTitle        : newProject.title,
            user_id: $scope.currentUser.id
        });

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
      if ($scope.projects.length === 1) { // If there is only one project left
        toastr.error('Try creating a new one and deleting the old one!', 'You need to have at least one project.');
      }
      else{
        $scope.project = project;

        $scope.dialog = $modal.open({
          templateUrl: '/assets/partials/deleteProjectDialog.html',
          controller: 'ProjectsController',
          scope: $scope
        });

        $scope.dialog.result.then(function () {
          // delete project
          $scope.projects.splice($scope.projects.indexOf(project), 1);
          if (project.activated) {
            // Remove
            project.$remove();
            // sort to find latest added project
            var projectToActivate =  getLatestAddedProject();
            // and set another one to active
            if (projectToActivate){
              $scope.activateProject(projectToActivate);
            }
          } else {
            project.$remove();
          }
        }, function () {
          //canceled
        });
      }


    };
	
	$scope.yes = function () {
		$scope.dialog.close();
	};
	
	$scope.no = function () {
		$scope.dialog.dismiss();
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

