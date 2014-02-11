app.controller('GoalsController', function ($scope, CurrentProject, Card){
    $scope.board1 = [];
    $scope.board2 = [];
    $scope.board3 = [];
    $scope.board4 = [];

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        $scope.cards = Card.query({projectId: $scope.currentProject.id}, function() {
            // Let's be pragmatic and use underscore :)
            $scope.board1 = _.where($scope.cards , {board: "board1"});
            $scope.board1 = _.sortBy($scope.board1, function(item){ return item.order; });

            $scope.board2 = _.where($scope.cards , {board: "board2"});
            $scope.board2 = _.sortBy($scope.board2, function(item){ return item.order; });

            $scope.board3 = _.where($scope.cards , {board: "board3"});
            $scope.board3 = _.sortBy($scope.board3, function(item){ return item.order; });

            $scope.board4 = _.where($scope.cards , {board: "board4"});
            $scope.board4 = _.sortBy($scope.board4, function(item){ return item.order; });
        });
    });

    $scope.updateOrders = function(boardName){
      // Update target list with updated order of elements
      _.each($scope[boardName], function (item) {
        var currentIndex = _.indexOf($scope[boardName], item);
        item.order = currentIndex + 1;
      });

    };

    $scope.saveCards = function(boardName){
      _.each($scope[boardName], function(item) {
        item.board = boardName;
        item.$update({projectId: $scope.currentProject.id}, function(data) {
          console.log("Received ", data);
        });
      });
    };


    $scope.$watch('board1', function(newvalue) {
      $scope.updateOrders('board1');
      $scope.saveCards('board1');
    }, true);

    $scope.$watch('board2', function(newvalue) {
      $scope.updateOrders('board2');
      $scope.saveCards('board2');
    }, true);

    $scope.$watch('board3', function(newvalue) {
      $scope.updateOrders('board3');
      $scope.saveCards('board3');
    }, true);

    $scope.$watch('board4', function(newvalue) {
      $scope.updateOrders('board4');
      $scope.saveCards('board4');
    }, true);


    // Add
    $scope.addCard = function(boardString){
      var card = new Card({ 'title': null, board: boardString, order: 1});
      $scope.cardBeingAdded = card;
    };

    $scope.cardBeingAdded = null;
    $scope.isBeingAdded = function(){
      return ($scope.cardBeingAdded);
    };

    $scope.doneAdding = function(){
      var card = $scope.cardBeingAdded;
      var boardString = card.board;
      if (!card.title || card.title === ""){
        $scope.cardBeingAdded = null;
      }
      else{
        card.$save({projectId: $scope.currentProject.id});
        $scope[boardString].unshift(card); // Add to beginning of the board
        $scope.cardBeingAdded = null;
      }
    };

    // Remove
    $scope.removeCard = function(board, card){
          boardName = card.board;
          board = $scope[boardName];
          board.splice(board.indexOf(card), 1);
          $scope.doneEditing(card);
          card.$delete({projectId: $scope.currentProject.id, id: card.id});
    };

    // Edit
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
    };

    $scope.doneEditing = function(card){
        if (!card.title || card.title === ""){
          var boardName = card.board;
          var board = $scope[boardName];
          board.splice(board.indexOf(card), 1);
          card.$delete({projectId: $scope.currentProject.id, id: card.id});
        }
        else{
          card.$update({projectId: $scope.currentProject.id});
        }
        $scope.beingEdited.splice($scope.beingEdited.indexOf(card), 1);
    };


});
