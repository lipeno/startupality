app.controller('CanvasController', function ($scope, $dialog, $modal, CurrentProject, Section){
    // TODO: inject this into $rootscope
    $scope.currentProject = {};
    $scope.sections = {};

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
                        break;
                    case 2:
                        $scope.solution = element;
                        break;
                    case 3:
                        $scope.keyPartners = element;
                        break;
                    case 4:
                        $scope.keyActivities = element;
                        break;
                    case 5:
                        $scope.valueProposition = element;
                        break;
                    case 6:
                        $scope.customerRelationships = element;
                        break;
                    case 7:
                        $scope.customerSegments = element;
                        break;
                    case 8:
                        $scope.keyResources = element;
                        break;
                    case 9:
                        $scope.channels = element;
                        break;
                    default:
                        console.log("Type is different then expected.")
                }
            }
        });
    });

    $scope.enableEdit = function() { $scope.edit = true; }
    $scope.disableEdit = function() { $scope.edit = false;  }

    $scope.openDialog = function(item){
        var itemToEdit = item;
        $scope.opts = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogClass: "modalSection",
            templateUrl:  '/assets/partials/canvasDialog.html', // OR: templateUrl: 'path/to/view.html',
            controller: 'CanvasDialogController',
            dialogFade: true,
            backdropFade: true,
            resolve: {item: function(){ return itemToEdit; }}
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

app.controller('CanvasDialogController', function ($scope, dialog, item, CurrentProject){
    $scope.item = item;

    $scope.$watch('item.tags', function() {
        var currentProject = CurrentProject.query(function(){
            $scope.item.$update({projectId: currentProject[0].id});
        });
    }, true);

    $scope.close = function(result){
        dialog.close(result);
    };
});