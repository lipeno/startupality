'use strict';

/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
app.directive('todoBlur', function() {
    return function( scope, elem, attrs ) {
        elem.bind('blur', function() {
            scope.$apply(attrs.todoBlur);
        });
    };
});

app.directive ('unfocus', function() { return {

    restrict: 'A',
    link: function (scope, element, attribs) {

        element[0].focus();

        element.bind ("blur", function() {
            scope.$apply(attribs["unfocus"]);
            console.log("??");
        });

    }

}});

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
app.directive('todoFocus', function( $timeout ) {
    return function( scope, elem, attrs ) {
        scope.$watch(attrs.todoFocus, function( newval ) {
            if ( newval ) {
                $timeout(function() {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});

