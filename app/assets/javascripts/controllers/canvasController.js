app.controller('CanvasController', function ($scope, $dialog, StorageService){
    $scope.sections = [];
//    Initialize
    var element = {
        title: 'Problem',
        description: "Problems that your solution is solving",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Solution',
        description: "Possible solution for each of the problems that you are trying to solve",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Key Partners',
        description: "Problems that your solution is solving",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Key Activities',
        description: "Problems that your solution is solving",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Value Proposition',
        description: "Clear and compelling message that tries to with turn your visitor into an interested prospect",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Customer Relationship',
        description: "Your path and ways of reaching to your customers",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Customer Segments',
        description: "Your target audience",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Key Resources',
        description: "Problems that your solution is solving",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
    var element = {
        title: 'Channels',
        description: "Problems that your solution is solving",
        text: '',
        tags: []
    };
    $scope.sections.push(element);
//    Persistence
    if (StorageService.get('sections') && StorageService.get('sections').length > 0){
        $scope.sections = StorageService.get('sections');
    }
    $scope.$watch('sections', function() {
        StorageService.put('sections', $scope.sections);
    }, true);

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

app.controller('CanvasDialogController', function ($scope, dialog, item, StorageService){
    $scope.item = item;
    $scope.select2init = {
        tags: $scope.item.tags,
        width:"90%"
    };

    //    Persistence
    if (StorageService.get('item').tags && StorageService.get('item').tags.length > 0){
        var persistedTags = StorageService.get('item').tags;
        $scope.item.tags = $.map(persistedTags, function(v) {return v.text});
    }

    $scope.$watch('item', function() {
        StorageService.put('item', $scope.item);
    }, true);

    $scope.close = function(result){
        dialog.close(result);
    };
});