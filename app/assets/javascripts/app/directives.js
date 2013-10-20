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
            if ( newval )
            {
                $timeout(function()
                {
                    elem[0].focus();

                }, 0, false);
            }
        });
    };
});

//// you can use it by calling tags-input
//app.directive('tagsInput', function() {
//    return {
//        // Restrict it to be an attribute in this case
//        restrict: 'A',
//        // responsible for registering DOM listeners as well as updating the DOM
//        link: function($scope, element, attrs) {
//            $(element).tagsInput($scope.$eval(attrs.tagsInput));
//        }
//    };
//});

app.directive('tagInput', function(){
    return {
        restrict: 'E',
        template: '<input type="hidden" placeholder="Input tags here...">',
        replace: true,
        require: '?ngModel',
        link: function ( scope, element, attrs, ngModel ){

            var drivenByModel = false;
            var elemClass = attrs.class;

            $(element).select2({
                tags: [],
                tokenSeparators: [","],
                containerCssClass : elemClass,
                formatNoMatches: function(){ return '';}
            }).on('change', function(e){
                    if (!drivenByModel) {
                        ngModel.$setViewValue(JSON.stringify(e.val));
                        scope.$apply();
                    } else {
                    }
                    drivenByModel = false;
                });


            ngModel.$render = function(){
                drivenByModel = true;
                if (ngModel.$viewValue){
                    var data = JSON.parse(ngModel.$viewValue);
                    $(element).val(data).trigger('change');
//                  Add class which was specified in the element
                    if(!$(element).hasClass(elemClass)){
                        $(element).addClass(elemClass);
                    }
                }
            };
        }
    };
});

// Highcharts directive
app.directive('chart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            transclude:true,
            replace: true,

            link: function (scope, element, attrs) {
                var chartsDefaults = {
                    chart: {
                        renderTo: element[0],
                        type: attrs.type || null,
                        height: attrs.height || null,
                        width: attrs.width || null
                    }
                };

                //Update when charts data changes
                scope.$watch(function() { return attrs.value; }, function(value) {
                    if(!attrs.value) return;
                    // We need deep copy in order to NOT override original chart object.
                    // This allows us to override chart data member and still the keep
                    // our original renderTo will be the same
                    var deepCopy = true;
                    var newSettings = {};
                    $.extend(deepCopy, newSettings, chartsDefaults, JSON.parse(attrs.value));
                    var chart = new Highcharts.Chart(newSettings);
                });
            }
        }

});

// Calendar with year only picker
app.directive('calendarYear', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.datepicker( {
        format: " yyyy",
        viewMode: "years",
        minViewMode: "years"
      });
    }
  }

});


app.directive('sortable', function(){
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel){
            if (ngModel){
                ngModel.$render = function(){
                    element.sortable( 'refresh' );
                };
            }

            element.sortable({
                connectWith: attrs.sortableSelector,
                cancel: 'a',
                revert: true,
                remove: function(e, ui){
                    if (ngModel.$modelValue.length === 1) {
                        ui.item.sortable.moved = ngModel.$modelValue.splice(0, 1)[0];
                    } else {
                        ui.item.sortable.moved =  ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0];
                    }
                },
                receive: function(e, ui){
                    ui.item.sortable.relocate = true;
                    ngModel.$modelValue.splice(ui.item.index(), 0, ui.item.sortable.moved);
                },
                update: function(e, ui){
                    ui.item.sortable.resort = ngModel;
                },
                start: function(e, ui){
                    ui.item.sortable = { index: ui.item.index(), resort: ngModel };
                },
                stop: function(e, ui){
                    if (ui.item.sortable.resort && !ui.item.sortable.relocate){
                        var end, start;
                        start = ui.item.sortable.index;
                        console.log("start Index", start)
                        end = ui.item.index();
                        console.log("end Index", end)
                        ui.item.sortable.resort.$modelValue.splice(end, 0, ui.item.sortable.resort.$modelValue.splice(start, 1)[0]);
                    }
                    if (ui.item.sortable.resort || ui.item.sortable.relocate) {
                        scope.$apply();
                    }
                    setTimeout()
                }
            });
        }
    };
});


