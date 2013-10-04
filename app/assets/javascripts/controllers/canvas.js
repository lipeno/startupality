//app.controller('OldCanvasController', function ($scope, $dialog, $modal, CurrentProject, Section, SectionType){
//    // TODO: inject this into $rootscope
//    $scope.currentProject = {};
//    $scope.sections = {};
////    $scope.sectionTypes = SectionType.query(function(){});
//
//    var currentProject = CurrentProject.query(function(){
//        $scope.currentProject = currentProject[0];
//
//        $scope.sections = Section.query({projectId: $scope.currentProject.id}, function() {
//            for (var i = 0; i < $scope.sections.length; i++) {
//                var element = $scope.sections[i];
//                // Sections have types with unique IDs
//                switch(element.section_type.stringIdentifier)
//                {
//                    case "problem":
//                        $scope.problem = element;
//                        break;
//                    case "solution":
//                        $scope.solution = element;
//                        break;
//                    case "keypartners":
//                        $scope.keyPartners = element;
//                        break;
//                    case "keyactivities":
//                        $scope.keyActivities = element;
//                        break;
//                    case "valueproposition":
//                        $scope.valueProposition = element;
//                        break;
//                    case "customerrelationships":
//                        $scope.customerRelationships = element;
//                        break;
//                    case "customersegments":
//                        $scope.customerSegments = element;
//                        break;
//                    case "keyresources":
//                        $scope.keyResources = element;
//                        break;
//                    case "channels":
//                        $scope.channels = element;
//                        break;
//                    default:
//                        console.log("Type is different then expected.")
//                }
//            }
//        });
//    });
//
//    $scope.enableEdit = function() { $scope.edit = true; }
//    $scope.disableEdit = function() { $scope.edit = false;  }
//
//    $scope.openDialog = function(section){
//        $scope.opts = {
//            backdrop: true,
//            keyboard: true,
//            backdropClick: true,
//            dialogClass: "modalSection",
//            templateUrl:  '/assets/partials/checklistDialog.html',
//            controller: 'ChecklistDialogController',
//            dialogFade: true,
//            backdropFade: true,
//            resolve: {item: function(){ return section; }}
//        };
//
//        var d = $dialog.dialog($scope.opts);
//        d.open().then(function(result){
//            if(result)
//            {
//                alert('dialog closed with result: ' + result);
//            }
//        });
//    };
//});

app.controller('NewcanvasController', function ($scope, $dialog, $modal, $element, CurrentProject, Section, SectionType){
    // TODO: inject this into $rootscope
    $scope.currentProject = {};
    $scope.sections = {};
//    $scope.sectionTypes = SectionType.query(function(){});

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

    $scope.openDialog = function(section){
        $scope.opts = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogClass: "modalSection",
            templateUrl:  '/assets/partials/checklistDialog.html',
            controller: 'ChecklistDialogController',
            dialogFade: true,
            backdropFade: true,
            resolve: {currentSection: function(){ return section; }}
        };

        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
            if(result)
            {
                alert('dialog closed with result: ' + result);
            }
        });
    };
	
	$scope.exportImage = function(section, button) {
		
		var logo = new Image();
		logo.src = "/assets/startupalityLogoBig.png";
		
		html2canvas(document.getElementById(section), {
			onrendered: function(canvas) {

				var context = canvas.getContext("2d");
				context.globalAlpha = 0.02;
				context.drawImage(logo, 0, 0);
				
				var img = canvas.toDataURL("image/png");
				
				var elem = document.getElementById(button);
				elem.href = img;
				elem.download = "canvas.png"
				elem.click();
				
			}
		});
		
	}


});

app.controller('ChecklistDialogController', function ($scope, dialog, currentSection, CurrentProject, SectionType, ProjectChecklistStep, ChecklistStep, Section){
    $scope.currentSection = currentSection;

    $scope.close = function(result){
        var currentProject = CurrentProject.query(function(){
            $scope.item.$update({projectId: currentProject[0].id});
        });
        dialog.close(result);
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
        var sections = Section.query({projectId: $scope.currentProject.id}, function(){
            $scope.sections = sections;
//            TODO:update only one
//            $scope.$watch('sections', function() {
//                for (var i=0; i < $scope.sections.length; i++){
//                    $scope.sections[i].$update({projectId: currentProject[0].id});
//                }
//            }, true);
        });
    });

    $scope.tagsChanged = function(section) {
        if ($scope.currentProject){
            section.$update({projectId: $scope.currentProject});
        }
    }

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

    $scope.getProjectSection = function (sctType) {
        if ($scope.sections && ($scope.sections.length !== 0)){
            _.each($scope.sections, function (section) {
                if (sctType && sctType.id){

                    if (section.section_type.id === sctType.id){
                    return section;
                }
                }
            });
        }
        return null;
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
        $scope.currentSection = _.find($scope.sections, function(section){ return section.section_type.order == orderOfSection; })
    };

    $scope.changeToPreviousSection = function () {
        if ($scope.currentSection.section_type.order !== 1){
            $scope.currentSection = _.find($scope.sections, function(section){
                return section.section_type.order == $scope.currentSection.section_type.order - 1;
            })
        }
    };

    $scope.changeToNextSection = function () {
        var sectionWithMaxOrder = _.max($scope.sections, function(section){ return section.section_type.order; });
        if ($scope.currentSection.section_type.order !== sectionWithMaxOrder.section_type.order){
            $scope.currentSection = _.find($scope.sections, function(section){
                return section.section_type.order == $scope.currentSection.section_type.order + 1;
            })
        }
    };

    $scope.close = function (result) {
        var currentProject = CurrentProject.query(function () {
            $scope.item.$update({projectId: currentProject[0].id});
        });
        dialog.close(result);
    };

    $scope.handleArrowKeys = function (){
        alert("key pressed");
    }

});



//app.controller('CanvasDialogController', function ($scope, dialog, item, CurrentProject){
//    $scope.item = item;
//    $scope.itemType = item.section_type;
//
//    $scope.isCollapsed = true;
//    // To load video iframes only when collapse is triggered
//    $scope.loadVideos = function(){
//        if (!$scope.isCollapsed){
//            return  '/assets/partials/canvasVideos.html'
//        }
//        else return ''
//    }
//
//    $scope.isCollapsedExperiments = true;
//    // To load video iframes only when collapse is triggered
//    $scope.loadExperiments = function(){
//        if (!$scope.isCollapsedExperiments){
//            return  '/assets/partials/canvasExperiments.html'
//        }
//        else return ''
//    }
//
//    // Ratin the section
//    $scope.rating = 7;
//
//    $scope.$watch('item.tags.length', function() {
//        $scope.currentProject = CurrentProject.query(function(){
//            $scope.item.$update({projectId: $scope.currentProject[0].id});
//        });
//    }, true);
//
//    $scope.close = function(result){
//        var currentProject = CurrentProject.query(function(){
//            $scope.item.$update({projectId: currentProject[0].id});
//        });
//        dialog.close(result);
//    };
//});

app.controller('ExperimentsDialogController', function ($scope, ProjectChecklistStep, ChecklistStep){
    // get steps specific for section

//    var checklistStep = ChecklistStep.query({}, function(){
//        $scope.checklistSteps = _.where(checklistStep, {sectionTypeIdentifier: $scope.itemType.stringIdentifier});
//    });

    $scope.getChecklistStepQuestion = function (item){
        var question = _.where($scope.checklistSteps, {stepNumber: item.stepNumber})[0];
        return question.title;
    }

    var projectChecklistSteps = ProjectChecklistStep.query({projectId: $scope.currentProject[0].id}, function() {

        if (projectChecklistSteps.length !== 0){
            _.each(projectChecklistSteps, function (projectChecklistStep) {
                if (projectChecklistStep.checklist_step.section_type.id === sctType.id){
                    $scope.projectChecklistSteps.push(projectChecklistStep);
                }
            });
        }
        $scope.projectChecklistSteps = $scope.projectChecklistSteps.sort(function(a, b){return a.stepNumber-b.stepNumber});

//            $scope.projectChecklistSteps = _.where(projectChecklistStep, {sectionTypeIdentifier: $scope.itemType.stringIdentifier});
    });

    $scope.editChecklistStep = function( checklistStep ) {
        checklistStep.$update({projectId: $scope.currentProject[0].id});
    };
});
