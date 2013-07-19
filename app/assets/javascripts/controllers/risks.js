app.controller('RisksController', function ($scope, Risk, Section, CurrentProject){
    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        var risks = Risk.query({projectId: $scope.currentProject.id}, function() {
            $scope.risks = risks[0];
        });
    });

    $scope.$watch('risks', function() {
        if ($scope.risks){
            var currentProject = CurrentProject.query(function(){
                // Update can be called because all the risks are persisted in one row
                $scope.risks.$update({projectId: currentProject[0].id});
            });
        }
    }, true);


    $scope.currentView = 'swotpestle';
    $scope.isCurrentView = function(view){
        if (view === $scope.currentView){
            return true;
        }
        return false;
    }
    $scope.changeView = function(view){
        if (view === 'swotpestle' || 'risksregister' || 'revenuesandexpenses' || 'financialIndicators'){
            $scope.currentView =  view;
        }
    }
    $scope.getCurrentView = function(){
        if ($scope.currentView === 'swotpestle'){
            return  '/assets/partials/swotpestle.html'
        }
        if ($scope.currentView === 'risksregister'){
            return  '/assets/partials/risksregister.html'
        }
        if ($scope.currentView === 'revenuesandexpenses'){
            return  '/assets/partials/revenuesandexpenses.html'
        }
        if ($scope.currentView === 'financialIndicators'){
            return  '/assets/partials/financialIndicators.html'
        }
        else return ''
    }
});

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
            return "label label-success";
        }
        // Or if it is a red risk
        if (exposure > 0.15) {
            return "label label-important";
        } else {
            return "label label-warning";
        }
    };

});