app.controller('FinanceController', function ($scope, RevenueOrExpense, CurrentProject){
    $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    $scope.discountRate = 0.04;
    $scope.activeYear = new Date().getFullYear(); // Get current year

    $scope.$watch("activeYear", function(){
      loadExpenses();
    })

    loadExpenses();
    function loadExpenses(){
      var currentProject = CurrentProject.query(function(){
        $scope.currentProject = currentProject[0];
        $scope.revenueOrExpenses = RevenueOrExpense.query({projectId: $scope.currentProject.id}, function() {
          $scope.revenues = _.where($scope.revenueOrExpenses, {isExpense: false, year: $scope.activeYear});
          $scope.expenses = _.where($scope.revenueOrExpenses, {isExpense: true, year: $scope.activeYear});

          $scope.revenues = $scope.revenues.sort(function(a, b){return a.rowNumber-b.rowNumber});
          $scope.expenses = $scope.expenses.sort(function(a, b){return a.rowNumber-b.rowNumber});

          if ($scope.chartData) {
			  $scope.redrawGraph();
          } else {
			  $scope.drawGraph();
          }
		  
        });
      });
    }

    $scope.getRevenuesArray = function(){
        var revenuesData = [];
        _.map($scope.months, function(month){
            revenuesData.push($scope.calculateRevenueForMonth(month));
        });
        return revenuesData;
    }

    $scope.getIncomeArray = function(){
        var incomeData = [];
        _.map($scope.months, function(month){
            incomeData.push($scope.calculateRevenueForMonth(month) - $scope.calculateExpenseForMonth(month));
        });
        return incomeData;
    }

    $scope.calculateNpv = function (payments) {
        var npv = 0;
        for (var i=0; i<payments.length; i++){
                npv += payments[i] / Math.pow((1 + $scope.discountRate), i);
        }
        var precision = 4; // floating point precision;
        return npv.toFixed(precision);
    };

    $scope.calculateRoi = function () {
        var totalRevenue = $scope.calculateRevenueForYear();
        var totalExpense = $scope.calculateExpenseForYear();

        var precision = 4; // floating point precision;
        var roi = ( totalRevenue - totalExpense ) / totalExpense;
        return roi.toFixed(precision);
    }

    $scope.calculateIrr = function (){
        guess = 0.1;
        var cashFlow = $scope.getIncomeArray();
        var npv;
        var cnt = 0;
        do
        {
            npv = NPV(guess,cashFlow);
            guess+= 0.001;
            cnt++;
        }
        while(npv > 0)
        var precision = 4; // floating point precision;
        return guess.toFixed(precision);
    }

    function NPV(discountRate, cashFlow){
        var npv = 0;
        for(var t = 0; t < cashFlow.length; t++) {
            npv += cashFlow[t] / Math.pow((1+ discountRate),t);
        }
        return npv;
    }



    $scope.drawGraph = function() {
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
                valueSuffix: 'EUR'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
			credits: {
				enabled: false
			},
            series: [{
                name: 'Revenues',
                data: [$scope.calculateRevenueForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]), $scope.calculateRevenueForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11])]
            }, {
                name: 'Expenses',
                data: [$scope.calculateExpenseForMonth($scope.months[0]), $scope.calculateExpenseForMonth($scope.months[1]), $scope.calculateExpenseForMonth($scope.months[2]), $scope.calculateExpenseForMonth($scope.months[3]), $scope.calculateExpenseForMonth($scope.months[4]), $scope.calculateExpenseForMonth($scope.months[5]), $scope.calculateExpenseForMonth($scope.months[6]), $scope.calculateExpenseForMonth($scope.months[7]), $scope.calculateExpenseForMonth($scope.months[8]), $scope.calculateExpenseForMonth($scope.months[9]), $scope.calculateExpenseForMonth($scope.months[10]), $scope.calculateExpenseForMonth($scope.months[11])]
            }, {
                name: 'Profit',
                data: [$scope.calculateRevenueForMonth($scope.months[0]) - $scope.calculateExpenseForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]) - $scope.calculateExpenseForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]) - $scope.calculateExpenseForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]) - $scope.calculateExpenseForMonth($scope.months[3]), $scope.calculateRevenueForMonth($scope.months[4]) - $scope.calculateExpenseForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]) - $scope.calculateExpenseForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6])  - $scope.calculateExpenseForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]) - $scope.calculateExpenseForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]) - $scope.calculateExpenseForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]) - $scope.calculateExpenseForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]) - $scope.calculateExpenseForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11]) - $scope.calculateExpenseForMonth($scope.months[11])]
            }]
        };
		Highcharts.getOptions().exporting.buttons.contextButton.menuItems.splice(5,1);
    };

    $scope.redrawGraph = function () {
		for (var i = 0; i < Highcharts.charts.length; i++) {
			if (Highcharts.charts[i]) {
      	  		Highcharts.charts[i].series[0].setData([$scope.calculateRevenueForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]), $scope.calculateRevenueForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11])],true);
      			Highcharts.charts[i].series[1].setData([$scope.calculateExpenseForMonth($scope.months[0]), $scope.calculateExpenseForMonth($scope.months[1]), $scope.calculateExpenseForMonth($scope.months[2]), $scope.calculateExpenseForMonth($scope.months[3]), $scope.calculateExpenseForMonth($scope.months[4]), $scope.calculateExpenseForMonth($scope.months[5]), $scope.calculateExpenseForMonth($scope.months[6]), $scope.calculateExpenseForMonth($scope.months[7]), $scope.calculateExpenseForMonth($scope.months[8]), $scope.calculateExpenseForMonth($scope.months[9]), $scope.calculateExpenseForMonth($scope.months[10]), $scope.calculateExpenseForMonth($scope.months[11])],true);
      			Highcharts.charts[i].series[2].setData([$scope.calculateRevenueForMonth($scope.months[0]) - $scope.calculateExpenseForMonth($scope.months[0]), $scope.calculateRevenueForMonth($scope.months[1]) - $scope.calculateExpenseForMonth($scope.months[1]), $scope.calculateRevenueForMonth($scope.months[2]) - $scope.calculateExpenseForMonth($scope.months[2]), $scope.calculateRevenueForMonth($scope.months[3]) - $scope.calculateExpenseForMonth($scope.months[3]), $scope.calculateRevenueForMonth($scope.months[4]) - $scope.calculateExpenseForMonth($scope.months[4]), $scope.calculateRevenueForMonth($scope.months[5]) - $scope.calculateExpenseForMonth($scope.months[5]), $scope.calculateRevenueForMonth($scope.months[6])  - $scope.calculateExpenseForMonth($scope.months[6]), $scope.calculateRevenueForMonth($scope.months[7]) - $scope.calculateExpenseForMonth($scope.months[7]), $scope.calculateRevenueForMonth($scope.months[8]) - $scope.calculateExpenseForMonth($scope.months[8]), $scope.calculateRevenueForMonth($scope.months[9]) - $scope.calculateExpenseForMonth($scope.months[9]), $scope.calculateRevenueForMonth($scope.months[10]) - $scope.calculateExpenseForMonth($scope.months[10]), $scope.calculateRevenueForMonth($scope.months[11]) - $scope.calculateExpenseForMonth($scope.months[11])],true);
			}
		}
    };

    $scope.doneEditing = function( row ) {
        row.$update({projectId: $scope.currentProject.id});
        $scope.redrawGraph();
	};

    $scope.addRevenueRow = function(rowsToAdd){
        var newRevenue = new RevenueOrExpense({isExpense: false, rowNumber:(rowsToAdd.length + 1) || 1, rowName: "", january: 0, february:0, march:0, april:0, may:0, june:0, july:0, august:0, september:0, october:0, november:0, december:0, year:$scope.activeYear});
        rowsToAdd.push(newRevenue);
        newRevenue.$save({projectId: $scope.currentProject.id});
    }

    $scope.addExpenseRow = function(rowsToAdd){
        var newExpense = new RevenueOrExpense({isExpense: true, rowNumber:(rowsToAdd.length + 1) || 1, rowName: "", january: 0, february:0, march:0, april:0, may:0, june:0, july:0, august:0, september:0, october:0, november:0, december:0, year:$scope.activeYear});
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
		$scope.redrawGraph();
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


    $scope.currentView = 'revenuesandexpenses';
    $scope.isCurrentView = function(view){
        if (view === $scope.currentView){
            return true;
        }
        return false;
    }
    $scope.changeView = function(view){
        if (view === 'revenuesandexpenses' || 'financialIndicators'){
            $scope.currentView =  view;
        }
    }
    $scope.getCurrentView = function(){
        if ($scope.currentView === 'revenuesandexpenses'){
            return  '/assets/partials/revenuesandexpenses.html'
        }
        if ($scope.currentView === 'financialIndicators'){
            return  '/assets/partials/financialIndicators.html'
        }
        else return ''
    }



    $scope.isCollapsedExperiments = true;
    // To load video iframes only when collapse is triggered
    $scope.loadExperiments = function(){
        if (!$scope.isCollapsedExperiments){
            return  '/assets/partials/canvasExperiments.html'
        }
        else return ''
    }
});