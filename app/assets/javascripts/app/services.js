app.factory('StorageService', function() {
    var APPNAME = 'website' + '-';

    return {
        get: function(storageName) {
            var storageItem = localStorage.getItem(APPNAME + storageName);
            return JSON.parse(storageItem || '[]');
        },
        //   Usage like this:      StorageService.put('projects', $scope.projects);
        put: function( storageName, objectToStore ) {
            localStorage.setItem(APPNAME + storageName, JSON.stringify(objectToStore));
        }
    };
});

app.service('ProjectProperties', function() {
    this.projectExists = false;
    return {
        getProjectExists: function() {
            return this.projectExists;
        },
        setProjectExists: function() {
            this.projectExists = true;
        },
        unsetProjectExists: function() {
            this.projectExists = false;
        }
    }
});