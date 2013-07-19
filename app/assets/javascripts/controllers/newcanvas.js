app.controller('NewcanvasController', function ($scope, $dialog, $modal, CurrentProject, Section, SectionType){
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
                    default:
                        console.log("Type is different then expected.")
                }
            }
            var sectionIdentificators = ['problem', 'solution', 'keypartners', 'keyactivities', 'valueproposition', 'customerrelationships', 'customersegments', 'keyresources','channels'];
            for(var i =0; i < sectionIdentificators.length; i++) {
                    $scope.$watch(sectionIdentificators[i], function(section) {
                            $scope.currentProject = CurrentProject.query(function(){
                                section.$update({projectId: $scope.currentProject[0].id});
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
            templateUrl:  '/assets/partials/canvasDialog.html',
            controller: 'CanvasDialogController',
            dialogFade: true,
            backdropFade: true,
            resolve: {item: function(){ return section; }}
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