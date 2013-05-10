app.controller('FinanceController', function ($scope, Revenue, Expense, CurrentProject){
    $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        $scope.revenues = Revenue.query({projectId: $scope.currentProject.id}, function() {
            $scope.revenues = $scope.revenues.sort(function(a, b){return a.rowNumber-b.rowNumber});

            $scope.expenses = Expense.query({projectId: $scope.currentProject.id}, function() {
                $scope.expenses = $scope.expenses.sort(function(a, b){return a.rowNumber-b.rowNumber});
                $scope.chartData = {
                    chart: {
                        type: 'line',
                        marginRight: 130,
                        marginBottom: 25
                    },
                    colors: [
                        '#058DC7', //'#2f7ed8',
                        '#ea0c0c',
                        '#50B432', //'#8bbc21',
                        '#910000',
                        '#1aadce',
                        '#492970',
                        '#f28f43',
                        '#77a1e5',
                        '#c42525',
                        '#a6c96a'
                    ],
                    title: {
                        text: 'Income Statement',
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'Profit and Loss Account',
                        x: -20
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Value (HRK)'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'HRK'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -10,
                        y: 100,
                        borderWidth: 0
                    },
                    series: [{
                        name: 'Revenues',
                        data: [$scope.calculateRevenueForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]), $scope.calculateRevenueForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11])]
                    }, {
                        name: 'Expenses',
                        data: [$scope.calculateExpenseForMonth($scope.months[0]), $scope.calculateExpenseForMonth($scope.months[1]), $scope.calculateExpenseForMonth($scope.months[2]), $scope.calculateExpenseForMonth($scope.months[3]), $scope.calculateExpenseForMonth($scope.months[4]), $scope.calculateExpenseForMonth($scope.months[5]), $scope.calculateExpenseForMonth($scope.months[6]), $scope.calculateExpenseForMonth($scope.months[7]), $scope.calculateExpenseForMonth($scope.months[8]), $scope.calculateExpenseForMonth($scope.months[9]), $scope.calculateExpenseForMonth($scope.months[10]), $scope.calculateExpenseForMonth($scope.months[11])]
                    }, {
                        name: 'Income',
                        data: [$scope.calculateRevenueForMonth($scope.months[0]) - $scope.calculateExpenseForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]) - $scope.calculateExpenseForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]) - $scope.calculateExpenseForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]  - $scope.calculateExpenseForMonth($scope.months[3])), $scope.calculateRevenueForMonth($scope.months[4]) -  - $scope.calculateExpenseForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]) - $scope.calculateExpenseForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6])  - $scope.calculateExpenseForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]) - $scope.calculateExpenseForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]) - $scope.calculateExpenseForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]) - $scope.calculateExpenseForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]) - $scope.calculateExpenseForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11]) - $scope.calculateExpenseForMonth($scope.months[12])]
                    }]
                };
            });
        });
    });

    $scope.doneEditing = function( row ) {
        console.log(row);
        row.$update({projectId: $scope.currentProject.id});
    };

    $scope.addRevenueRow = function(rowsToAdd){
        var newRevenue = new Revenue({rowNumber:(rowsToAdd.length + 1) || 1, rowName: "", january: 0, february:0, march:0, april:0, may:0, june:0, july:0, august:0, september:0, october:0, november:0, december:0, year:2013});
        rowsToAdd.push(newRevenue);
        newRevenue.$save({projectId: $scope.currentProject.id});
    }

    $scope.addExpenseRow = function(rowsToAdd){
        var newExpense = new Expense({rowNumber:(rowsToAdd.length + 1) || 1, rowName: "", january: 0, february:0, march:0, april:0, may:0, june:0, july:0, august:0, september:0, october:0, november:0, december:0, year:2013});
        rowsToAdd.push(newExpense);
        newExpense.$save({projectId: $scope.currentProject.id});
    }

    $scope.deleteRow = function(rows, row){
        var rowId = rows.indexOf(row);
        rows.splice(rows.indexOf(row), 1);
        row.$delete({projectId: $scope.currentProject.id, id: row.id});
        for (var i=rowId; i < rows.length; i++){
            rows[i].rowNumber = rows[i].rowNumber - 1;
            rows[i].$update({projectId: $scope.currentProject.id})
        }
    };

    $scope.calculateRevenueForMonth = function(month){
        var total= 0;
        if ($scope.revenues){
            for (var i=0; i < $scope.revenues.length; i++){
                total += parseInt($scope.revenues[i][month]);
            }
        }
        return total;
    }

    $scope.calculateRevenueForYear = function(){
        var total= 0;
        if ($scope.revenues){
            for (var i=0; i < $scope.revenues.length; i++){
            for (var j=0; j < $scope.months.length; j++){
                total += parseInt($scope.revenues[i][$scope.months[j]]) || 0;
            }
        }
        }
        return total;
    }

    $scope.calculateExpenseForMonth = function(month){
        var total= 0;
        if ($scope.expenses){
            for (var i=0; i < $scope.expenses.length; i++){
                total += parseInt($scope.expenses[i][month]);
            }
        }
        return total;
    }

    $scope.calculateExpenseForYear = function(){
        var total= 0;
        if ($scope.expenses){
            for (var i=0; i < $scope.expenses.length; i++){
                for (var j=0; j < $scope.months.length; j++){
                    total += parseInt($scope.expenses[i][$scope.months[j]]) || 0;
                }
            }
        }
        return total;
    }
});