app.controller('FinanceController', function ($scope, StorageService){
    $scope.columns = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $scope.revenues = {};
    $scope.revenues.rows = [{id:1, name:""},{id:2, name:""},{id:3, name:""},{id:4, name:""}];
    $scope.revenues.cells = {};

    $scope.expenses = {};
    $scope.expenses.rows = [{id:1, name:""},{id:2, name:""},{id:3, name:""},{id:4, name:""}];
    $scope.expenses.cells = {};

    $scope.addRow = function(rowsToAdd){
        rowsToAdd.push({id:rowsToAdd.length+1, name:""})
    }

    $scope.calculateTotalForColumn = function(data, column){
        var total= 0;
        for (var i=0; i<data.rows.length; i++){
            total += parseInt(data.cells[column+i]) || 0;
        }
        return total;
    }

    $scope.revenuesTotal = [];
    for (var i=0; i<$scope.columns.length; i++){
        $scope.revenuesTotal.push($scope.calculateTotalForColumn($scope.revenues, $scope.columns[i]));
    }

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
            data: $scope.revenuesTotal
        }, {
            name: 'Loss',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Income',
            data: [-0.5, 0.8, 5.7, 19.3, 17.0, 25.0, 16.8, 24.1, 11.1, 29.1, 24.6, 7.5]
        }]
    };
});