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

// directive for drag and drop
app.directive('dndBetweenList', function($parse) {
 
    return function(scope, element, attrs) {
 
        // contains the args for this component
        var args = attrs.dndBetweenList.split(',');
        // contains the args for the target
        var targetArgs = $('#'+args[1]).attr('dnd-between-list').split(',');
		
		
		alert(args[0]);
		alert(targetArgs[0]);
		
 
        // variables used for dnd
        var toUpdate;
        var target;
        var startIndex = -1;
        var toTarget = true;
 
        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(args[0], function(value) {
            toUpdate = value;
        },true);
 
        // also watch for changes in the target list
        scope.$watch(targetArgs[0], function(value) {
            target = value;
        },true);
		
 
        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            items:'li',
            start:function (event, ui) {
                // on start we define where the item is dragged from
                startIndex = ($(ui.item).index());
                toTarget = false;
            },
            stop:function (event, ui) {
                var newParent = ui.item[0].parentNode.id;
				

 
                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
 
                // we need to remove him from the configured model
                toUpdate.splice(startIndex,1);
 
	            if (newParent == args[1]) {
                    // and add it to the linked list
                    target.splice(newIndex,0,toMove);
                }  else {
                    toUpdate.splice(newIndex,0,toMove);
                }
 
                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(targetArgs[0]);
                scope.$apply(args[0]);
            },
            connectWith:'.aaaaa'
        })
    }
});


