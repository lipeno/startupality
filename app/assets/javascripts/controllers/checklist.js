app.controller('ChecklistController', function ($scope, SectionType, CurrentProject, ProjectChecklistStep, ChecklistStep, Section) {
    $scope.sectionTypes = SectionType.query(function () {});

    var currentProject = CurrentProject.query(function () {
        $scope.currentProject = currentProject[0];
        $scope.projectChecklistSteps = ProjectChecklistStep.query({projectId: $scope.currentProject.id}, function () {
            $scope.projectChecklistSteps = $scope.projectChecklistSteps.sort(function (a, b) {
                return a.stepNumber - b.stepNumber
            });
            calculateProgress();
        });
        var sections = Section.query({projectId: $scope.currentProject.id}, function(){
            $scope.sections = sections;
//            TODO:update only one
            $scope.$watch('sections', function() {
                    for (var i=0; i < $scope.sections.length; i++){
                        $scope.sections[i].$update({projectId: currentProject[0].id});
                    }
            }, true);
        });
    });

    $scope.getProjectChecklistSteps = function (sctType) {
        var projectSteps = [];
        if ($scope.projectChecklistSteps.length !== 0){
            _.each($scope.projectChecklistSteps, function (projectChecklistStep) {
                if (projectChecklistStep.checklist_step.section_type.id === sctType.id){
                    projectSteps.push(projectChecklistStep);
                }
            });
            return projectSteps;
        }
    }

    $scope.getProjectSection = function (identifier) {
        var section = _.where($scope.sections, {sectionTypeIdentifier: identifier})[0];
            return section;
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


    $scope.close = function (result) {
        var currentProject = CurrentProject.query(function () {
            $scope.item.$update({projectId: currentProject[0].id});
        });
        dialog.close(result);
    };
});