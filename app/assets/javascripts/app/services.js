app.factory('StorageService', function() {
    var APPNAME = 'website' + '-';

    return {
        get: function(storageName) {
            var storageItem = localStorage.getItem(APPNAME + storageName);
            return JSON.parse(storageItem || '[]');
        },
   //   usage like this:      StorageService.put('projects', $scope.projects);
        put: function( storageName, objectToStore ) {
            localStorage.setItem(APPNAME + storageName, JSON.stringify(objectToStore));
        }
    };
});