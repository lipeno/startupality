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

app.factory("FlashNotification", function($rootScope) {
    var queue = [], currentMessage = {};

    $rootScope.$on('$routeChangeSuccess', function() {
        if (queue.length > 0)
            currentMessage = queue.shift();
        else
            currentMessage = {};
    });

    return {
        set: function(message) {
            var msg = message;
            queue.push(msg);

        },
        get: function(message) {
            return currentMessage;
        },
        pop: function(message) {
            switch(message.type) {
                case 'success':
                    toastr.success(message.body, message.title);
                    break;
                case 'info':
                    toastr.info(message.body, message.title);
                    break;
                case 'warning':
                    toastr.warning(message.body, message.title);
                    break;
                case 'error':
                    toastr.error(message.body, message.title);
                    break;
            }
        }
    };
});