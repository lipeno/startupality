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
		
		var newBoardName = event.target.getAttribute('ng-model');
		var board = $scope[newBoardName];
		
		var cardNumber = board.length - 1;
		var card = board[cardNumber];
		
		card.board = newBoardName;
		card.$update({projectId: $scope.currentProject.id});
		
    };
	
	
	
	
	
	$scope.model = [
	        {
	            "id": 1,
	            "value": "Who the fuck is Arthur Digby Sellers?"
	        },
	        {
	            "id": 2,
	            "value": "I've seen a lot of spinals, Dude, and this guy is a fake. "
	        },
	        {
	            "id": 3,
	            "value": "But that is up to little Larry here. Isn't it, Larry?"
	        },
	        {
	            "id": 4,
	            "value": " I did not watch my buddies die face down in the mud so that this fucking strumpet."
	        }
	    ];
 
	    $scope.source = [
	        {
	            "id": 5,
	            "value": "What do you mean \"brought it bowling\"? I didn't rent it shoes."
	        },
	        {
	            "id": 6,
	            "value": "Keep your ugly fucking goldbricking ass out of my beach community! "
	        },
	        {
	            "id": 7,
	            "value": "What the fuck are you talking about? I converted when I married Cynthia!"
	        },
	        {
	            "id": 8,
	            "value": "Ja, it seems you forgot our little deal, Lebowski."
	        }
	    ];
		
	    $scope.olal = [
	        {
	            "id": 9,
	            "value": "What do you mean \"brought it bowling\"? I didn't rent it shoes."
	        }
		];
 
	    // watch, use 'true' to also receive updates when values
	    // change, instead of just the reference
	    $scope.$watch("model", function(value) {
	        console.log("Model: " + value.map(function(e){return e.id}).join(','));
	    },true);
 
	    // watch, use 'true' to also receive updates when values
	    // change, instead of just the reference
	    $scope.$watch("source", function(value) {
	        console.log("Source: " + value.map(function(e){return e.id}).join(','));
	    },true);
		
	    $scope.$watch("olal", function(value) {
	        console.log("Source: " + value.map(function(e){return e.id}).join(','));
	    },true);
		
		
	    $scope.sourceEmpty = function() {
	           return $scope.source.length == 0;
	       }
 
	       $scope.modelEmpty = function() {
	           return $scope.model.length == 0;
	       }
	
	
	
	
	

});
