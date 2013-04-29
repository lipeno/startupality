var uploaderQQ = angular.module("uploaderModule", ["ngResource"]);
uploaderQQ.directive('uploaderqq', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: {
			dataobject: '=dataobject',
			oncomplete: '=oncomplete',
			show: '=showMe'
		},

		link: function($scope, element, attributes, ngModel) {
			
			
			$scope.uploader = new qq.FineUploader({
				element: element[0],
				debug: true,
				listElement: null,
				multiple: true,
				request: {
					endpoint: attributes.uploadDestination,
					customHeaders:{
						"X-CSRF-Token" : $("meta[name='csrf-token']").attr("content")
					},

				},

				validation:{
					allowedExtensions: attributes.uploadExtensions.split(','),
				},

				callbacks: {
				onSubmit: function(id, name) {
					var data = {};
						data.filename=name;

					if ($scope.dataobject) {

						//data.script={};
						//data.script.id=$scope.dataobject.id;
						data[attributes.type] = mObj = JSON.parse(JSON.stringify($scope.dataobject));


					}

					this.setParams(data,id) ;
				},
				onComplete: function(id, name, responseJSON) {
					if (typeof $scope.oncomplete === "function") {
						$scope.oncomplete(id, name, responseJSON);
					}

				}

				},

				// dragAndDrop: {
				// 	// extraDropzones: [$('.header-nav')],
				// 	hideDropzones: true,
				// 	disableDefaultDropzone: true,
				// },

				text: {
					uploadButton: '<div>ADD NEW '+attributes.fileis+'</div>',
					dragZone: 'Drop Script Here'
				},
				template: '<div class="qq-uploader">' +
									'<pre class="qq-upload-drop-area"><span>{dragZoneText}</span></pre>' +
									'<div class="qq-upload-button" style="width: auto;">{uploadButtonText}</div>' +
									'<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
									'<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
									'</div>',
				classes: {
					success: 'alert alert-success',
					fail: 'alert alert-error'
				}

			});
		}
	};
});