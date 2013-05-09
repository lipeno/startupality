app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

//TODO: it is called too many times
app.filter('stringToArray', function() {
    return function(items) {
        if (items){
            return JSON.parse(items);
        }
        return items;
    };
});

app.filter('capitalize', function() {
    return function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
    }
});