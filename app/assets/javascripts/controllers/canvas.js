app.controller('CanvasController', function ($scope, $dialog, $modal, CurrentProject, Section, SectionType){
    // TODO: inject this into $rootscope
    $scope.currentProject = {};
    $scope.sections = {};
    $scope.sectionTypes = SectionType.query(function(){});

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];

        $scope.sections = Section.query({projectId: $scope.currentProject.id}, function() {
            for (var i = 0; i < $scope.sections.length; i++) {
                var element = $scope.sections[i];
                // Sections have types with unique IDs
                switch(element.sectionTypeIdentifier)
                {
                    case "problem":
                        $scope.problem = element;
                        $scope.problemType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "solution":
                        $scope.solution = element;
                        $scope.solutionType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "keypartners":
                        $scope.keyPartners = element;
                        $scope.keyPartnersType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "keyactivities":
                        $scope.keyActivities = element;
                        $scope.keyActivitiesType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "valueproposition":
                        $scope.valueProposition = element;
                        $scope.valuePropositionType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "customerrelationships":
                        $scope.customerRelationships = element;
                        $scope.customerRelationshipsType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "customersegments":
                        $scope.customerSegments = element;
                        $scope.customerSegmentsType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "keyresources":
                        $scope.keyResources = element;
                        $scope.keyResourcesType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    case "channels":
                        $scope.channels = element;
                        $scope.channelsType = _.where($scope.sectionTypes, {stringIdentifier: element.sectionTypeIdentifier})[0];
                        break;
                    default:
                        console.log("Type is different then expected.")
                }
            }
        });
    });

    $scope.enableEdit = function() { $scope.edit = true; }
    $scope.disableEdit = function() { $scope.edit = false;  }

    $scope.openDialog = function(section, sectionType){
        $scope.opts = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogClass: "modalSection",
            templateUrl:  '/assets/partials/canvasDialog.html',
            controller: 'CanvasDialogController',
            dialogFade: true,
            backdropFade: true,
            resolve: {item: function(){ return section; }, itemType: function(){ return sectionType; }}
        };

        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
            if(result)
            {
                alert('dialog closed with result: ' + result);
            }
        });
    };
});

app.controller('CanvasDialogController', function ($scope, dialog, item, itemType, CurrentProject){
    $scope.item = item;
    $scope.itemType = itemType;

    $scope.isCollapsed = true;
    // To load video iframes only when collapse is triggered
    $scope.loadVideos = function(){
        if (!$scope.isCollapsed){
            return  '/assets/partials/canvasVideos.html'
        }
        else return ''
    }

    $scope.isCollapsedExperiments = true;
    // To load video iframes only when collapse is triggered
    $scope.loadExperiments = function(){
        if (!$scope.isCollapsedExperiments){
            return  '/assets/partials/canvasExperiments.html'
        }
        else return ''
    }

    // Ratin the section
    $scope.rating = 7;

    $scope.$watch('item.tags', function() {
        $scope.currentProject = CurrentProject.query(function(){
            $scope.item.$update({projectId: $scope.currentProject[0].id});
        });
    }, true);

    $scope.close = function(result){
        var currentProject = CurrentProject.query(function(){
            $scope.item.$update({projectId: currentProject[0].id});
        });
        dialog.close(result);
    };
});

app.controller('TestExperimentsDialogController', function ($scope, ProjectChecklistStep, ChecklistStep){
    // get steps specific for section
    var checklistStep = ChecklistStep.query({}, function(){
        $scope.checklistSteps = _.where(checklistStep, {sectionTypeIdentifier: $scope.itemType.stringIdentifier});
    });

    $scope.getChecklistStepQuestion = function (item){
        var question = _.where($scope.checklistSteps, {stepNumber: item.stepNumber})[0];
        return question.title;
    }

    var projectChecklistStep = ProjectChecklistStep.query({projectId: $scope.currentProject[0].id}, function() {
            $scope.projectChecklistSteps = _.where(projectChecklistStep, {sectionTypeIdentifier: $scope.itemType.stringIdentifier});
            $scope.projectChecklistSteps = $scope.projectChecklistSteps.sort(function(a, b){return a.stepNumber-b.stepNumber});
    });

    $scope.editChecklistStep = function( checklistStep ) {
        checklistStep.$update({projectId: $scope.currentProject[0].id});
    };
});