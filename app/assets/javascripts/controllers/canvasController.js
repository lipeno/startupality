app.controller('CanvasController', function ($scope, $dialog, $modal, CurrentProject, Section, SectionType){
    // TODO: inject this into $rootscope
    $scope.currentProject = {};
    $scope.sections = {};
    $scope.sectionTypes = SectionType.query(function(){});
    // Sort sections by IDs, the order that they are put in the databse should be the same
    $scope.sectionTypes.sort(function(a, b) {return a.id - b.id})

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];

        $scope.sections = Section.query({projectId: $scope.currentProject.id}, function() {
            for (var i = 0; i < $scope.sections.length; i++) {
                var element = $scope.sections[i];
                // Sections have types with unique IDs
                switch(element.section_type_id)
                {
                    case 1:
                        $scope.problem = element;
                        $scope.problemType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 2:
                        $scope.solution = element;
                        $scope.solutionType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 3:
                        $scope.keyPartners = element;
                        $scope.keyPartnersType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 4:
                        $scope.keyActivities = element;
                        $scope.keyActivitiesType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 5:
                        $scope.valueProposition = element;
                        $scope.valuePropositionType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 6:
                        $scope.customerRelationships = element;
                        $scope.customerRelationshipsType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 7:
                        $scope.customerSegments = element;
                        $scope.customerSegmentsType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 8:
                        $scope.keyResources = element;
                        $scope.keyResourcesType = $scope.sectionTypes[element.section_type_id - 1];
                        break;
                    case 9:
                        $scope.channels = element;
                        $scope.channelsType = $scope.sectionTypes[element.section_type_id - 1];
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
            templateUrl:  '/assets/partials/canvasDialog.html', // OR: templateUrl: 'path/to/view.html',
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
    // Ratin the section
    $scope.rate = 7;

    $scope.$watch('item.tags', function() {
        var currentProject = CurrentProject.query(function(){
            $scope.item.$update({projectId: currentProject[0].id});
        });
    }, true);

    $scope.close = function(result){
        var currentProject = CurrentProject.query(function(){
            $scope.item.$update({projectId: currentProject[0].id});
        });
        dialog.close(result);
    };
});