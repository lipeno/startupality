app.factory("CurrentUser", function($http) {
    return {
        getUser: function(callback) {
            $http.post('/api/userutil/fetch_current_user').success(
                function(data, status, headers, config) {
                    callback(data);
                });
        },
        getUsers: function(q, callback) {
            $http.post('/api/userutil/get_users_select2').success(
                function(data, status, headers, config) {
                    callback(data);
                });
        }
    }
});

app.factory("CurrentProject", function($resource) {
    return $resource("/api/projects/getActivated", {}, {});
});

/*
 $update used for updating
 $save for saving
 $remove for removing
 query() to fetch all
 get to fetch specific
 */
app.factory("Project", function($resource) {
    return $resource("/api/projects/:id", {id: "@id"}, {update: {method: "PUT"}});
});

// Nested resource
app.factory("Section", function($resource) {
    return $resource('/api/projects/:projectId/sections/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("SectionType", function($resource) {
    return $resource('/api/section_types/:id', {id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Risk", function($resource) {
    return $resource('/api/projects/:projectId/risks/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("RevenueOrExpense", function($resource) {
    return $resource('/api/projects/:projectId/revenueOrExpenses/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Tag", function($resource) {
    return $resource('/api/projects/:projectId/sections/:sectionId/tags/:id', {projectId: '@projectId', sectionId: '@sectionId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("Card", function($resource) {
    return $resource('/api/projects/:projectId/cards/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

// Nested resource
app.factory("ProjectChecklistStep", function($resource) {
    return $resource('/api/projects/:projectId/project_checklist_steps/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});

app.factory("ChecklistStep", function($resource) {
    return $resource('/api/checklist_steps/:id', {id: '@id'}, {update: {method: "PUT"}});
});

app.factory("RegisterRisk", function($resource) {
    return $resource('/api/projects/:projectId/register_risks/:id', {projectId: '@projectId', id: '@id'}, {update: {method: "PUT"}});
});