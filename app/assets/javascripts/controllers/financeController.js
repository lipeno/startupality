app.controller('FinanceController', function ($scope, Revenue, CurrentProject){
    $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    $scope.expenses = {};
    $scope.expenses.rows = [{id:1, name:""},{id:2, name:""},{id:3, name:""},{id:4, name:""}];
    $scope.expenses.cells = {};

    var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        $scope.revenues = Revenue.query({projectId: $scope.currentProject.id}, function() {
            $scope.revenues = $scope.revenues.sort(function(a, b){return a.rowNumber-b.rowNumber});
            $scope.chartData = {
                chart: {
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 25
                },
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
                    name: 'Profit',
                    data: [$scope.calculateRevenueForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]), $scope.calculateRevenueForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11])]
                }, {
                    name: 'Loss',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                    name: 'Income',
                    data: [-0.5, 0.8, 5.7, 19.3, 17.0, 25.0, 16.8, 24.1, 11.1, 29.1, 24.6, 7.5]
                }]
            };


        });
    });

    $scope.doneEditing = function( row ) {
        console.log(row);
        row.$update({projectId: $scope.currentProject.id});
    };

    $scope.addRow = function(rowsToAdd){
        var newRevenue = new Revenue({rowNumber:(rowsToAdd.length + 1) || 1, rowName: "", january: 0, february:0, march:0, april:0, may:0, june:0, july:0, august:0, september:0, october:0, november:0, december:0, year:2013});
        rowsToAdd.push(newRevenue);
        newRevenue.$save({projectId: $scope.currentProject.id});
    }

    $scope.deleteRow = function(rows, row){
        var rowId = row.rowNumber;
        row.$remove({projectId: $scope.currentProject.id});
        for (var i=rowId; i < rows.length; i++){
            rows[i].rowNumber = rows[i].rowNumber - 1;
            rows[i].$save({projectId: $scope.currentProject.id})
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

});