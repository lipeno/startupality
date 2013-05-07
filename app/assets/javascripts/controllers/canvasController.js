app.controller('CanvasController', function ($scope, $dialog, $modal, CurrentProject, Section, SectionType){
    // TODO: inject this into $rootscope
    $scope.currentProject = {};
    $scope.sections = {};
    $scope.sectionTypes = SectionType.query(function(){});
    // Sort sections by IDs, the order that they are put in the database should be the same

    function getElementByStringIdentifier(array, value)
    {
        for (var i = 0; i < array.length; i++)
        {
            if (array[i].stringIdentifier == value)
            {
                return array[i];
            }
        }
    }

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
                        $scope.problemType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "solution":
                        $scope.solution = element;
                        $scope.solutionType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "keypartners":
                        $scope.keyPartners = element;
                        $scope.keyPartnersType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "keyactivities":
                        $scope.keyActivities = element;
                        $scope.keyActivitiesType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "valueproposition":
                        $scope.valueProposition = element;
                        $scope.valuePropositionType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "customerrelationships":
                        $scope.customerRelationships = element;
                        $scope.customerRelationshipsType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "customersegments":
                        $scope.customerSegments = element;
                        $scope.customerSegmentsType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "keyresources":
                        $scope.keyResources = element;
                        $scope.keyResourcesType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
                        break;
                    case "channels":
                        $scope.channels = element;
                        $scope.channelsType = getElementByStringIdentifier($scope.sectionTypes, element.sectionTypeIdentifier);
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