/* somemodel.$update used for updating
$save for saving
$remove for removing
query() to fetch all
get to fetch specific */

app.factory("CurrentUser", function($http) {
    return {
        getUser: function(callback) {
            $http.post('/userutil/fetch_current_user').success(
                function(data, status, headers, config) {
                    callback(data);
                });
        },
        getUsers: function(q, callback) {
            $http.post('/userutil/fetch_current_user').success(
                function(data, status, headers, config) {
                    console.log(data);
                    callback(data);
                });
        }
    }
});

app.factory("CurrentProject", function($resource) {
    return $resource("/projects/getActivated", {}, {});
});

app.factory("Project", function($resource) {
    return $resource("/projects/:id", {id: "@id"}, {update: {method: "PUT"}});
});

// Nested resource
app.factory("Section", function($resource) {
    return $resource('/projects/:projectId/sections/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("SectionType", function($resource) {
    return $resource('/section_types/:id', {id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Risk", function($resource) {
    return $resource('/projects/:projectId/risks/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

// Nested resource
app.factory("Tag", function($resource) {
    return $resource('/projects/:projectId/sections/:sectionId/tags/:id', {projectId: '@projectId', sectionId: '@sectionId', id: '@id'}, {update: {method: "PUT"}});
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