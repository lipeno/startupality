app.factory("Script", function($resource) {
	return $resource("/scripts/:id", {
		id: "@id"
	}, {
		update: {
			method: "PUT"
		}
	});
});
app.factory("ScriptFiles", function($resource) {
	return $resource("/script_files/:id", {
		id: "@id"
	}, {
		update: {
			method: "PUT"
		}
	});
});
app.factory("ScriptCoverage", function($resource) {
	return $resource("/scripts_coverages/:id", {
		id: "@id"
	}, {
		update: {
			method: "PUT"
		}
	});
});

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

function ScriptCtrl($scope, Script, $http) {}

function ScriptsCtrl($scope, Script, ScriptFiles,ScriptCoverage, CurrentUser, $http, $compile) {
	//console.log($scope.script_id);

	$scope.newScript = {};
	$scope.newReview = {};
	$scope.newReview.user_id = $scope.current_user_id;
	$scope.maxSize = 4;
	$scope.noOfPages = 0;
	$scope.currentPage = 1;
	$scope.modalType = "New";
	$scope.allowReview = false;
	$scope.current_user = {};
	


	$scope.set_current_user = function(data) {
		$scope.current_user = data;
	}
	//CurrentUser.getUser($scope.set_current_user);
	$scope.users1 = {
		ajax: {
			url: '/userutil/get_users_select2',
			dataType: 'json',
			data: function(term, page) {
				var user_ids = _.map($scope.script.users, function(val, key) {
					return val.id;
				});
				user_ids.push()
				return {
					users_ids: user_ids,
					q: term, // search term
					page_limit: 10,
					pagema: page
				};
			},
			results: function(data, page) { // parse the results into the format expected by Select2.
				return {
					results: data
				};
			},

		},
		formatResult: function(data) {
			return "<div class='select2-user-result'>" + data.email + "</div>";
		},
		formatSelection: function(user) {
			$scope.script.users.push(user);
			var res = _.where($scope.script.scripts_users_attributes, {
				user_id: user.id
			});
			if (!_.isEmpty(res)) {
				delete res[0]._destroy;
			} else {
				$scope.script.scripts_users_attributes.push({
					user_id: user.id
				});
			}
			return user.email;
		},
	};


	var img_link = '<li><a href="{{file.get_file_url}}" target="_blank" >{{file.script_file_file_name}} - {{file.created_at | date:"yyyy-MM-dd HH:mm:ss"}}<img src= "/assets/pdf.gif"}</li>';

	$scope.removeUser = function(user) {
		var res = _.where($scope.script.scripts_users_attributes, {
			user_id: user.id
		});
		res[0]._destroy = true;
		var left_users = _.filter($scope.script.users, function(val) {
			return val.id != user.id
		});
		$scope.script.users = left_users;
	}
	$scope.show=true;
	
	$scope.oncompleteCoverage=function(id, fileName, responseJSON)
	{
		$scope.script.scripts_coverages.push(responseJSON.script_file)
		$scope.$apply();
		//$scope.getScript($scope.script.id);

	}
	$scope.oncomplete = function(id, fileName, responseJSON) {
		$(".script_form").show(500);
		if ($scope.script) {
			$scope.script.script_files.push(responseJSON.script_file)
			$scope.$apply();
		} else {
			$scope.newScript.script_files_attributes = Array();
			$scope.newScript.script_files_attributes.push({});
			$scope.newScript.script_files_attributes[0].script_file_file_name = fileName;
			$(".show-file").append(fileName + " <img src='/assets/pdf.gif' />");
		}
		$compile(img_link)($scope);
		$(".script-upload").hide();
	};
	//Must be Edit or view
	if ($scope.script_id) {
		$scope.script = Script.get({
			id: $scope.script_id
		}, function() {
			$scope.script.scripts_users_attributes = [];
			$scope.script.scripts_users_attributes = _.map($scope.script.scripts_users, function(val) {
				return {
					id: val.id,
					user_id: val.user_id
				};
			});
			$scope.$watch(function(){ return angular.toJson($scope.script.scripts_coverages); },function()
				{
					$scope.showCoverage=$scope.script.scripts_coverages.length==0;
				})

		});
	}
	$scope.addReview = function() {
		if (typeof $scope.newReview.rating != "undefined") {
			var send_data = {};
			send_data.script_id = $scope.script.id;
			send_data.review = $scope.newReview;
			$http.post('/scripts/review_script', send_data).success(

			function(data, status, headers, config) {
				$scope.script = data;
				$scope.newReview = {};

			});
		} else {
			alert('You need to add Rating!');
		}
	}
	$scope.deleteFile = function(file) {
		var answer = confirm("Delete file?")
		if (answer) {
			ScriptFiles.delete(file, function() {
				$scope.script.script_files.pop(file);
				$scope.$apply();
			});
		}

	}
	$scope.deleteCoverage = function(file) {
		var answer = confirm("Delete coverage?")
		if (answer) {
			ScriptCoverage.delete(file, function() {
				$scope.script.scripts_coverages.pop(file);
				//$scope.$apply();

			});
		}

	}
	$scope.getScript = function(id) {
		$scope.script = Script.get({
			id: id
		}, function() {
			$scope.script.scripts_users_attributes = [];
			$scope.script.scripts_users_attributes = _.map($scope.script.scripts_users, function(val) {
				return {
					id: val.id,
					user_id: val.user_id
				};
			});
		});

	};

	$scope.addNewScript = function() {
		Script.save($scope.newScript, function() {
			location.href = "/scripts"
		});
	};
	$scope.updateScript = function() {
		Script.update($scope.script, function() {
			location.href = "/scripts"
		});

	};
	$scope.setrating=function(rating)
	{

		$scope.newReview.rating=rating;
	}

}