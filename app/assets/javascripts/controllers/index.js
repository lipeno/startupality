function IndexCtrl($scope, Script, $http) {

	$scope.maxSize = 10;
	$scope.noOfPages = 0;
	$scope.currentPage = 1;
	$scope.direction = "asc";
	$scope.orderBy = "title";
	$scope.title = "";
	$scope.is_overbrook=false;
	$scope.oncomplete = function(id, fileName, responseJSON) {
		$scope.currentPage = 1;
		$scope.scripts=null;
		$scope.scripts = $scope.getScriptPaged();
	};
	$scope.scripts = Script.get({
		limit: $scope.maxSize,
		page: $scope.currentPage
	}, function() {
		$scope.noOfPages = Math.ceil($scope.scripts.count / $scope.maxSize);
	});
	$scope.getScriptPaged = function(params) {
		var data = $.extend({}, params, {
			limit: $scope.maxSize,
			page: $scope.currentPage
		})
		return Script.get(data, function() {
			$scope.noOfPages = Math.ceil($scope.scripts.count / $scope.maxSize);
		})
	}

	$scope.deleteScript = function(script)
	{
		var answer= confirm("Confirm Deletion?");
		if(answer)
		{
			Script.delete(script,function(){
				$scope.pageChanged($scope.currentPage);
			});

		}
	}
	$scope.pageChanged = function(page){
		$scope.currentPage=page;
		$scope.scripts=null;
		$scope.scripts=$scope.getScriptPaged(getFilter());
	}
	function getFilter(){
		var q={};
		if($scope.title.length>1 )
		{
		q.title=$scope.title;
		}
		return q;
	}
	$scope.sortBy = function(orderBy) {
		$scope.direction = $scope.orderBy == orderBy ? ($scope.direction == "asc" ? "desc" : "asc") : "asc";
		$scope.orderBy = orderBy;
		$scope.selected = orderBy;
		$scope.scripts=null;
		$scope.scripts = $scope.getScriptPaged({
			"sort": orderBy,
			"direction": $scope.direction,
			"title":$scope.title
		});
	}
	$scope.onlyOverbrook= function()
	{
			$scope.is_overbrook=$scope.is_overbrook==false?true:false;
			var q={};
			q.is_overbrook=$scope.is_overbrook;
		$scope.scripts = $scope.getScriptPaged(q);
	}
	$scope.isSelected = function(order, direction) {
				return $scope.orderBy === order && $scope.direction === direction;
	   }

	$scope.$watch("title", function(newVal, oldVal) {
		//if(typeof newVal!="undefined" || newVal.length>1)
		if (newVal.length > 1 ) {
			var q = {};
			q.title = $scope.title;
			$scope.scripts=null;
			$scope.scripts = $scope.getScriptPaged(q)
		} else if (newVal.length == 0) {
			$scope.scripts=null;
			$scope.scripts = $scope.getScriptPaged()
		}


	});



}