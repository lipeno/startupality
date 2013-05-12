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
            $scope.board2 = _.where(cards, {board: "board2"});
            $scope.board3 = _.where(cards, {board: "board3"});
            $scope.board4 = _.where(cards, {board: "board4"});
        });
    });

//    $scope.$watch('board4', function(newArray, oldArray) {
//        var currentProject = CurrentProject.query(function(){
//            for (var i=0; i<newArray.length; i++) {
//                index = oldArray.indexOf(newArray[i]);
//                // if elem does not exist in oldArray then it was added
//                if (index === -1) {
//                    newArray[i]
//                }
//            }
//            $scope.board4.$update({projectId: currentProject[0].id});
//        });
//    }, true);

    // Limit items to be dropped in board1
    $scope.addCard = function(board, boardString){
        var newCard = new Card({ 'title': 'Edit me', board: boardString});
        board.push(newCard);
        newCard.$save({projectId: $scope.currentProject.id});
        $scope.editCard(newCard);
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

    $scope.stopDragCallback = function(event, ui) {
        console.log('Why did you stop draggin me?',event, ui);
    };

    $scope.onDropCallback = function(event, ui) {
        console.log('dropped',event, ui);
    };

});
