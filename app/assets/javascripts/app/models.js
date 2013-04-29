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

app.factory("Project", function($resource) {
    return $resource("/projects/:id", {id: "@id"}, {update: {method: "PUT"}});
});