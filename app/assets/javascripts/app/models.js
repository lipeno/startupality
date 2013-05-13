app.factory("CurrentUser", function($http) {
    return {
        getUser: function(callback) {
            $http.post('/userutil/fetch_current_user').success(
                function(data, status, headers, config) {
                    callback(data);
                });
        },
        getUsers: function(q, callback) {
            $http.post('/userutil/get_users_select2').success(
                function(data, status, headers, config) {
                    callback(data);
                });
        }
    }
});

app.factory("CurrentProject", function($resource) {
    return $resource("/projects/getActivated", {}, {});
});

/*
 $update used for updating
 $save for saving
 $remove for removing
 query() to fetch all
 get to fetch specific
 */
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

app.factory("Revenue", function($resource) {
    return $resource('/projects/:projectId/revenues/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Expense", function($resource) {
    return $resource('/projects/:projectId/expenses/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Tag", function($resource) {
    return $resource('/projects/:projectId/sections/:sectionId/tags/:id', {projectId: '@projectId', sectionId: '@sectionId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Card", function($resource) {
    return $resource('/projects/:projectId/cards/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

// Nested resource
app.factory("ProjectChecklistStep", function($resource) {
    return $resource('/projects/:projectId/project_checklist_steps/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("ChecklistStep", function($resource) {
    return $resource('/checklist_steps/:id', {id: '@id'}, {update: {method: "PUT"}});
});

