app.controller('RisksRegisterController', function ($scope, RegisterRisk, CurrentProject){
    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        $scope.registerRisks = RegisterRisk.query({projectId: $scope.currentProject.id}, function() {});
    });

    $scope.addRegisterRisk = function(registerRisksArray){
        var newRegisterRisk = new RegisterRisk({probability: 0.1, impact:0.1, name: "", responseAction: ""});
        registerRisksArray.push(newRegisterRisk);
        newRegisterRisk.$save({projectId: $scope.currentProject.id});
    }

    $scope.doneEditing = function( row ) {
        console.log(row);
        row.$update({projectId: $scope.currentProject.id});
    };

    $scope.deleteRegisterRisk = function(rows, row){
        var rowId = rows.indexOf(row);
        rows.splice(rows.indexOf(row), 1);
        row.$delete({projectId: $scope.currentProject.id, id: row.id});
        for (var i=rowId; i < rows.length; i++){
            rows[i].rowNumber = rows[i].rowNumber - 1;
            rows[i].$update({projectId: $scope.currentProject.id})
        }
    };

    $scope.calculateExposure = function(risk){
        if (risk){
            return (risk.probability*risk.impact).toFixed(2);
        }
        return null;
    };

    $scope.appliedClass = function(risk) {
        var exposure = $scope.calculateExposure(risk);
//        If it is a green risk
        if (exposure < 0.1) {
            return "badge label label-success";
        }
        // Or if it is a red risk
        if (exposure > 0.15) {
            return "badge label label-important";
        } else {
            return "badge label label-warning";
        }
    };

});