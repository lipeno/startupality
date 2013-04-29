var raty = angular.module("ratyModule", ["ngResource"]);
raty.directive('raty', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: {
			datascore: '=datascore',
			setrating: "=setrating"
		},
		link: function($scope, element, attributes, ngModel) {

			$(element).raty({
				path: "/assets/raty/",
				number: 5,
				hintList: [1, 2, 3, 4, 5],
				noRatedMsg: 'Not rated yet!',
				size: 38,
				targetKeep: true,
				target: attributes.target,
				targetType: 'number',
				readOnly: parseInt(attributes.readonly),
				score: function() {
					return $scope.datascore;
				},
				click: function(score, evt) {

					$scope.setrating(score);
				}
			});
		}
	}
});