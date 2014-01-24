app.controller('CanvasController', function ($scope, $modal, $element, CurrentProject, Section, SectionType){
  // TODO: inject this into $rootscope
  $scope.currentProject = {};
  $scope.sections = {};

  $scope.getCurrentProject = function(){
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
  };

  $scope.getCurrentProject();

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
    var modalInstance = $modal.open({
      windowClass: 'modalSection',
      templateUrl: '/assets/partials/wizard.html',
      controller: 'WizardController',
      resolve: {
        selectedSections: function () {
          return sections;
        }
      }
    });

  };

  $scope.openProjectsList = function(){
    var modalInstance = $modal.open({
      windowClass: 'modalSection',
      templateUrl: '/assets/partials/projects.html',
      controller: 'ProjectsController',
      scope: $scope
    });

    modalInstance.result.then(function () {
      $scope.getCurrentProject();
    }, function () {
      $scope.getCurrentProject();
    });
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
