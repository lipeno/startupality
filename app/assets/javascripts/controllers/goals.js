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
        var newCard = new Card({ 'title': 'Edit me', board: boardString, order: $scope[boardString].length + 1});
        board.push(newCard);
        newCard.$save({projectId: $scope.currentProject.id});
//        $scope.editCard(newCard);
    };

    $scope.removeCard = function(board, card){
          $scope.doneEditing(card);
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

//    $scope.stopDragCallback = function(event, ui) {
//        console.log('Why did you stop draggin me?',event, ui);
//    };
//
//    $scope.onDropCallback = function(event, ui) {
//
//		var newBoardName = event.target.getAttribute('ng-model');
//		var board = $scope[newBoardName];
//
//		var cardNumber = board.length - 1;
//		var card = board[cardNumber];
//
//		card.board = newBoardName;
//		card.$update({projectId: $scope.currentProject.id});
//
//    };


    $scope.columnsWithItems = {'Column 1':{'items':['Item 1', 'Item 2']}, 'Column 2':{ 'items': ['Item 3', 'Item 4'] }, 'Column 3':{ 'items': ['Item 5', 'Item 6']}};

    $scope.$watch('board1', function(newvalue) {
        var newElement = _.find(newvalue, function(item){ return item.board !== "board1"; });
        if (newElement) {
            newElement.board = "board1";
            newElement.$update({projectId: $scope.currentProject.id});
        }
    }, true);

    $scope.$watch('board2', function(newvalue) {
        var newElement = _.find(newvalue, function(item){ return item.board !== "board2"; });
        if (newElement) {
            newElement.board = "board2";
            newElement.$update({projectId: $scope.currentProject.id});
        }
    }, true);

    $scope.$watch('board3', function(newvalue) {
        var newElement = _.find(newvalue, function(item){ return item.board !== "board3"; });
        if (newElement) {
            newElement.board = "board3";
            newElement.$update({projectId: $scope.currentProject.id});
        }
    }, true);

    $scope.$watch('board4', function(newvalue) {
        var newElement = _.find(newvalue, function(item){ return item.board !== "board4"; });
        if (newElement) {
            newElement.board = "board4";
            newElement.$update({projectId: $scope.currentProject.id});
        }
    }, true);
	
	
	

});
