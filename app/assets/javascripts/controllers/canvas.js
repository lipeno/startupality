app.controller('NewcanvasController', function ($scope, $dialog, $modal, $element, CurrentProject, Section, SectionType){
    // TODO: inject this into $rootscope
    $scope.currentProject = {};
    $scope.sections = {};

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];

        $scope.sections = Section.query({projectId: $scope.currentProject.id}, function() {
            for (var i = 0; i < $scope.sections.length; i++) {
                var element = $scope.sections[i];
                // Sections have types with unique IDs
                switch(element.section_type.stringIdentifier)
                {
                    case "problem":
                        $scope.problem = element;
                        break;
                    case "solution":
                        $scope.solution = element;
                        break;
                    case "keypartners":
                        $scope.keypartners = element;
                        break;
                    case "keyactivities":
                        $scope.keyactivities = element;
                        break;
                    case "valueproposition":
                        $scope.valueproposition = element;
                        break;
                    case "customerrelationships":
                        $scope.customerrelationships = element;
                        break;
                    case "customersegments":
                        $scope.customersegments = element;
                        break;
                    case "keyresources":
                        $scope.keyresources = element;
                        break;
                    case "channels":
                        $scope.channels = element;
                        break;
                    case "revenuestreams":
                        $scope.revenuestreams = element;
                        break;
                    case "coststructure":
                        $scope.coststructure = element;
                        break;
                    default:
                        console.log("Type is different then expected.")
                }
            }
            var sectionIdentificators = ['problem', 'solution', 'keypartners', 'keyactivities', 'valueproposition', 'customerrelationships', 'customersegments', 'keyresources','channels'];
            for(var i =0; i < sectionIdentificators.length; i++) {
                $scope.$watch(sectionIdentificators[i], function(section) {
                    $scope.currentProject = CurrentProject.query(function(){
                        if ($scope.currentProject.length > 0){
                            section.$update({projectId: $scope.currentProject[0].id});
                        }
                    });
                }, true);
            }
        });
    });

    $scope.enableEdit = function() { $scope.edit = true; }
    $scope.disableEdit = function() { $scope.edit = false;  }

    $scope.openDialog = function(sections){
        $scope.opts = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogClass: "modalSection",
            templateUrl:  '/assets/partials/checklistDialog.html',
            controller: 'ChecklistDialogController',
            dialogFade: true,
            backdropFade: true,
            resolve: {selectedSections: function(){ return sections; }}
        };

        var d = $dialog.dialog($scope.opts);
        d.open();
    };
	
	$scope.exportImage = function(businessCanvas, downloadLink, logo) {

		html2canvas(document.getElementById(businessCanvas), {
			onrendered: function(canvas) {

				var context = canvas.getContext("2d");
				context.globalAlpha = 0.03;
				context.drawImage(document.getElementById(logo), 0, 0);

				var canvasImage = canvas.toDataURL("image/png");

				var link = document.getElementById(downloadLink);
				link.href = canvasImage;
				link.download = "canvas.png"
				link.click();
				
			}
		});
	}

});

app.controller('ChecklistDialogController', function ($scope, dialog, selectedSections, CurrentProject, SectionType, ProjectChecklistStep){
    $scope.currentSection = selectedSections[0];
	
    $scope.close = function(result){
        dialog.close();
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
