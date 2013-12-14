app.controller('GoalsController', function ($scope, CurrentProject, Card){
    $scope.board1 = [];
    $scope.board2 = [];
    $scope.board3 = [];
    $scope.board4 = [];

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        var cards = Card.query({projectId: $scope.currentProject.id}, function() {
            // Let's be pragmatic and use underscore :)
            $scope.board1 = _.where(cards, {board: "board1"});
            $scope.board1 = _.sortBy($scope.board1, function(item){ return item.order; });

            $scope.board2 = _.where(cards, {board: "board2"});
            $scope.board2 = _.sortBy($scope.board2, function(item){ return item.order; });

            $scope.board3 = _.where(cards, {board: "board3"});
            $scope.board3 = _.sortBy($scope.board3, function(item){ return item.order; });

            $scope.board4 = _.where(cards, {board: "board4"});
            $scope.board4 = _.sortBy($scope.board4, function(item){ return item.order; });
        });
    });

    // Limit items to be dropped in board1
    $scope.addCard = function(board, boardString){
        var elementsWithEmptyName = _.find(board, function(card){ return card.title === ""; });
        if (!elementsWithEmptyName) {
          var newCard = new Card({ 'title': '', board: boardString, order: $scope[boardString].length + 1});
          board.push(newCard);
          newCard.$save({projectId: $scope.currentProject.id});
          $scope.editCard(newCard);
        }
    };

    $scope.removeCard = function(board, card){
//          $scope.doneEditing(card);
          boardName = card.board;
          board = $scope[boardName];
          board.splice(board.indexOf(card), 1);
          card.$delete({projectId: $scope.currentProject.id, id: card.id});
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
    $scope.isBeingEdited = function(card){
        if ($scope.beingEdited.indexOf(card) !== -1){
            return true;
        }
        return false;
    };


    $scope.editCard = function(card){
        if (!$scope.isBeingEdited(card) && $scope.beingEdited.length < 1){
            $scope.beingEdited.push(card);
        }
    }

    $scope.doneEditing = function(card){
        card.$update({projectId: $scope.currentProject.id});
        $scope.beingEdited.splice($scope.beingEdited.indexOf(card), 1);
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

    $scope.$watch('board4', function(newvalue) {
      _.each($scope.board4, function(item) {
        item.board = "board4";
        item.$update({projectId: $scope.currentProject.id}, function(data) {
          console.log("Received ", data)
        });
      });
    }, true);
	
	
	

});
