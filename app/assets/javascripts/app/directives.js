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

// you can use it by calling tags-input
app.directive('tagsInput', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function($scope, element, attrs) {
            $(element).tagsInput($scope.$eval(attrs.tagsInput));
        }
    };
});

app.directive('select2Input', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function($scope, element, attrs) {
            $(element).select2($scope.$eval(attrs.tagsInput));
        }
    };
});

app.directive('tagInput', function(){
    return {
        restrict: 'E',
        template: '<input type="hidden" style="width:300px" placeholder="Input tags here...">',
        replace: true,
        require: '?ngModel',
        link: function ( scope, element, attrs, ngModel ){

            var drivenByModel = false;

            $(element).select2({
                tags: [],
                tokenSeparators: [","],
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
                }
            };
        }
    };
});

app.factory('$modal', function($rootScope, $compile, $http, $timeout, $q, $templateCache) {
        'use strict';

        var ModalFactory = function ModalFactory(options) {

            function Modal(options) {
                if(!options) options = {};

                var scope = options.scope ? options.scope.$new() : $rootScope.$new(),
                    templateUrl = options.template;

                //@todo support {title, content} object

                return $q.when($templateCache.get(templateUrl) || $http.get(templateUrl, {cache: true}).then(function(res) { return res.data; }))
                    .then(function onSuccess(template) {

                        // Build modal object
                        var id = templateUrl.replace('.html', '').replace(/[\/|\.|:]/g, '-') + '-' + scope.$id;
                        var $modal = $('<div class="modal hide" tabindex="-1"></div>').attr('id', id).addClass('fade').html(template);
                        if(options.modalClass) {
                            $modal.removeClass('modal');
                            $modal.addClass(options.modalClass);
                        }

                        $('body').append($modal);

                        // Compile modal content
                        $timeout(function() {
                            $compile($modal)(scope);
                        });

                        // Provide scope display functions
                        scope.$modal = function(name) {
                            $modal.modal(name);
                        };
                        angular.forEach(['show', 'hide'], function(name) {
                            scope[name] = function() {
                                $modal.modal(name);
                            };
                        });
                        scope.dismiss = scope.hide;

                        // Emit modal events
                        angular.forEach(['show', 'shown', 'hide', 'hidden'], function(name) {
                            $modal.on(name, function(ev) {
                                scope.$emit('modal-' + name, ev);
                            });
                        });

                        // Support autofocus attribute
                        $modal.on('shown', function(ev) {
                            $('input[autofocus]', $modal).first().trigger('focus');
                        });
                        // Auto-remove $modal created via service
                        $modal.on('hidden', function(ev) {
                            if(!options.persist) scope.$destroy();
                        });

                        // Garbage collection
                        scope.$on('$destroy', function() {
                            $modal.remove();
                        });

                        if(options.show) {
                            $modal.modal('show');
                        }

                        return $modal;

                    });

            }

            return new Modal(options);

        };

        return ModalFactory;

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


