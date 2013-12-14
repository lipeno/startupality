app.controller('HypothesesController', function ($scope, CurrentProject, Hypothesis){
    $scope.board1 = [];
    $scope.board2 = [];
    $scope.board3 = [];
    $scope.board4 = [];

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        var hypotheses = Hypothesis.query({projectId: $scope.currentProject.id}, function() {
            // Let's be pragmatic and use underscore :)
            $scope.board1 = _.where(hypotheses, {board: "board1"});
            $scope.board1 = _.sortBy($scope.board1, function(item){ return item.order; });

            $scope.board2 = _.where(hypotheses, {board: "board2"});
            $scope.board2 = _.sortBy($scope.board2, function(item){ return item.order; });

            $scope.board3 = _.where(hypotheses, {board: "board3"});
            $scope.board3 = _.sortBy($scope.board3, function(item){ return item.order; });
        });
    });

    // Limit items to be dropped in board1
    $scope.addHypothesis = function(board, boardString){
        var elementsWithEmptyName = _.find(board, function(hypothesis){ return hypothesis.title === ""; });
        if (!elementsWithEmptyName) {
          var newhypothesis = new Hypothesis({ 'title': '', board: boardString, order: $scope[boardString].length + 1});
          board.push(newhypothesis);
          newhypothesis.$save({projectId: $scope.currentProject.id});
          $scope.editHypothesis(newhypothesis);
        }
    };

    $scope.removeHypothesis = function(board, hypothesis){
//          $scope.doneEditing(hypothesis);
          boardName = Hypothesis.board;
          board = $scope[boardName];
          board.splice(board.indexOf(hypothesis), 1);
          hypothesis.$delete({projectId: $scope.currentProject.id, id: hypothesis.id});
    };

    // Limit items to be dropped in board3
    $scope.optionsRestrictSize = {
        accept: function(dragEl) {
            if ($scope.board3.length >= 5) {
                return false;
            } else {
                return true;
            }
        }
    };


    $scope.beingEdited = [];
    $scope.isBeingEdited = function(hypothesis){
        if ($scope.beingEdited.indexOf(hypothesis) !== -1){
            return true;
        }
        return false;
    };


    $scope.editHypothesis = function(hypothesis){
        if (!$scope.isBeingEdited(hypothesis) && $scope.beingEdited.length < 1){
            $scope.beingEdited.push(hypothesis);
        }
    }

    $scope.doneEditing = function(hypothesis){
        hypothesis.$update({projectId: $scope.currentProject.id});
        $scope.beingEdited.splice($scope.beingEdited.indexOf(hypothesis), 1);
    }


    $scope.columnsWithItems = {'Column 1':{'items':['Item 1', 'Item 2']}, 'Column 2':{ 'items': ['Item 3', 'Item 4'] }, 'Column 3':{ 'items': ['Item 5', 'Item 6']}};

    $scope.$watch('board1', function(newvalue) {
      _.each($scope.board1, function(item) {
        item.board = "board1";
        item.$update({projectId: $scope.currentProject.id}, function(data) {
              console.log("Received ", data)
        });
      });
    }, true);

    $scope.$watch('board2', function(newvalue) {
      _.each($scope.board2, function(item) {
        item.board = "board2";
        item.$update({projectId: $scope.currentProject.id}, function(data) {
          console.log("Received ", data)
        });
      });
    }, true);

    $scope.$watch('board3', function(newvalue) {
      _.each($scope.board3, function(item) {
        item.board = "board3";
        item.$update({projectId: $scope.currentProject.id}, function(data) {
          console.log("Received ", data)
        });
      });
    }, true);
	
	
	

});
