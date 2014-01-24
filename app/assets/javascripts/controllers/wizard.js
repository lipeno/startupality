app.controller('WizardController', function ($scope, $modalInstance, selectedSections, CurrentProject, SectionType, ProjectChecklistStep){
  $scope.currentSection = selectedSections[0];

  $scope.close = function(result){
    $modalInstance.dismiss('cancel');
  };

  $scope.sectionTypes = SectionType.query(function () {
    $scope.sectionTypes = $scope.sectionTypes.sort(function (a, b) {
      return a.order - b.order
    });
  });

  var currentProject = CurrentProject.query(function () {
    $scope.currentProject = currentProject[0];
    $scope.projectChecklistSteps = ProjectChecklistStep.query({projectId: $scope.currentProject.id}, function () {
      $scope.projectChecklistSteps = $scope.projectChecklistSteps.sort(function (a, b) {
        return a.stepNumber - b.stepNumber
      });
      calculateProgress();
    });
  });

  $scope.getProjectChecklistSteps = function (sctType) {
    var projectSteps = [];
    if ($scope.projectChecklistSteps && ($scope.projectChecklistSteps.length !== 0)){
      _.each($scope.projectChecklistSteps, function (projectChecklistStep) {
        if (projectChecklistStep.checklist_step.section_type.id === sctType.id){
          projectSteps.push(projectChecklistStep);
        }
      });
      return projectSteps;
    }
  }

  $scope.editChecklistStep = function (checklistStep) {
    checklistStep.$update({projectId: $scope.currentProject.id});
    calculateProgress();
  };


  var calculateProgress = function () {
    if ($scope.projectChecklistSteps) {
      var numberOfSteps = $scope.projectChecklistSteps.length;
      var numberOfDoneSteps = _.where($scope.projectChecklistSteps, {done: true}).length;
      var value = (numberOfDoneSteps / numberOfSteps) * 100;
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.progressValue = {
        value: value,
        type: type
      };
    }
  };

  $scope.changeSection = function (orderOfSection) {
    $scope.currentSection = _.find(selectedSections, function(section){ return section.section_type.order == orderOfSection; })
  };

  $scope.changeToPreviousSection = function () {
    if ($scope.currentSection.section_type.order !== 1){
      $scope.currentSection = _.find(selectedSections, function(section){
        return section.section_type.order == $scope.currentSection.section_type.order - 1;
      })
    }
  };

  $scope.changeToNextSection = function () {
    var sectionWithMaxOrder = _.max(selectedSections, function(section){ return section.section_type.order; });
    if ($scope.currentSection.section_type.order !== sectionWithMaxOrder.section_type.order){
      $scope.currentSection = _.find(selectedSections, function(section){
        return section.section_type.order == $scope.currentSection.section_type.order + 1;
      })
    }
  };

  $scope.keyPressed = function(e) {
    // allowing arrow keys only
    if (e.which == 37) {
      $scope.changeToPreviousSection();
    } else if (e.which == 39) {
      $scope.changeToNextSection();
    }
  };

});