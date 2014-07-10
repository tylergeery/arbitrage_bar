var arbitrage = angular.module('arbitrage', ['googlechart']);


arbitrage.controller('priceManager', function priceManager($scope, $timeout) {
	$scope.customer = true;
	$scope.data = false;
	$scope.add_info = false;
	$scope.customers = {};
	$scope.beers = 	{
						'samAdams': {
							'code': 'samAdams',
							'name': 'Samuel Adams',
							'price': 7,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'sam_adams.jpg'

						},
						'pabst': {
							'code': 'pabst',
							'name': 'Pabst Blue Ribbon',
							'price': 4,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'pabst.jpg'
						},
						'shockTop': {
							'code': 'shockTop',
							'name': 'Shock Top',
							'price': 8,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'shocktop.jpg'

						},
						'coors': {
							'code': 'coors',
							'name': 'Coors',
							'price': 4,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'coors.jpg'

						},
						'bud': {
							'code': 'bud',
							'name': 'Budweiser',
							'price': 6,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'budweiser.jpg'

						},
						'guinness': {
							'code': 'guinness',
							'name': 'Guiness Lager',
							'price': 5,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'guinness.jpg'

						},
						'pacifico': {
							'code': 'pacifico',
							'name': 'Pacifico',
							'price': 9,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'pacifico.jpg'

						},
						'corona': {
							'code': 'corona',
							'name': 'Corona',
							'price': 6,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'corona.jpg'

						},
						'heineken': {
							'code': 'heineken',
							'name': 'Heineken',
							'price': 5,
							'change': 0,
							'purchased':0,
							'total': 0,
							'sales_count': 0,
							'keg_count': 65,
							'sales': [0,0,0,0,0],
							'picture': 'heineken.jpg'

						}

					}
	$scope.total_cost = 0;
	$scope.costs = [];
	$scope.total_customers = 1;
	$scope.customers = {};

	$scope.removeCosts = function() {
		$scope.customers[$scope.total_customers] = { 'costs' : $scope.costs, 'total_cost' : $scope.total_cost };
		$scope.total_customers += 1;
		$scope.costs = [];
		$scope.total_cost = 0;
		console.log('Customer Orders: ' + JSON.stringify($scope.customers));
	}

	var cost_length = 0;
	$scope.addCost = function( beer ) {
		$scope.costs.push({'name':beer.name, 'price':beer.price});
		$scope.total_cost += beer.price;
		if($scope.beers[beer.code].sales_count >= 5 ) {
			$scope.beers[beer.code].sales.push(beer.price);
		} else {
			$scope.beers[beer.code].sales[$scope.beers[beer.code].sales_count] = beer.price;
		}
		$scope.beers[beer.code].sales_count += 1;
		$scope.beers[beer.code].purchased += 1;
		$scope.beers[beer.code].total += 1;
		
	}




	var decrement = function() {
		var beers = $scope.beers;
        for(beer in beers) {
        	// console.log($scope);
        	// console.log(JSON.stringify(beer));
        	// console.log(JSON.stringify(beers));
        	if ($scope.beers[beer].purchased > 0) {
        		$scope.beers[beer].price += .25;
        		$scope.beers[beer].change = .25;
        		$scope.beers[beer].purchased = 0;
        	} else {
        		$scope.beers[beer].price -= .01;
        		$scope.beers[beer].change = -.01;
        	}
        	console.log('Sales Array: ' + JSON.stringify($scope.beers[beer].sales));
        }
        $timeout(decrement, 10000);

    }

    $scope.showNav = function() {
    	$scope.nav = true;
    }

    $timeout(decrement, 15000);

    $scope.followNav = function(nav, index) {
    	if(nav == 'add') {
    		$scope.add_info = true;
    		$scope.customer = false;
    		$scope.data = false;
    		$scope.nav = false;
    	} else if(nav == 'data') {
    		$scope.data = true;
    		$scope.customer = false;
    		$scope.add_info = false;
    		$scope.nav = false;
    	} else if(nav == 'customer') {
    		if(index) {
    			$scope.customer = true;
    			$scope.data = false;
    			$scope.add_info = false;
    			$scope.nav = false;
    			console.log('TEST: ' + JSON.stringify($scope.customers));
    			$scope.costs = $scope.customers[index].costs;
    			$scope.total_cost = $scope.customers[index].total_cost;
    		} else {
    			$scope.customer = true;
    			$scope.data = false;
    			$scope.add_info = false;
    			$scope.nav = false;
    		}
    		
    	}
    }


    var chart1 = {};
    chart1.type = "AreaChart";
    chart1.displayed = true;
    chart1.cssStyle = "width:400px";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "price-id", label: "Sale Price", type: "number"}
    ], "rows": [
        {c: [
            {v: "Beginning"},
            {v: 6}
        ]},
        {c: [
            {v: ""},
            {v: 6.73}
        ]},
        {c: [
            {v: ""},
            {v: 6.19}

        ]},
        {c: [
            {v: ""},
            {v: 5.97}
        ]},
        {c: [
            {v: "End"},
            {v:  .81}
        ]}
    ]};

    chart1.options = {
        "title": "Sales",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Sales Price", "gridlines": {"count": 10}
        },
        "hAxis": {
            "title": "Event Time"
        }
    };


    var formatCollection = [
        {
            name: "color",
            format: [
                {
                    columnNum: 4,
                    formats: [
                        {
                            from: 0,
                            to: 3,
                            color: "white",
                            bgcolor: "red"
                        },
                        {
                            from: 3,
                            to: 5,
                            color: "white",
                            fromBgColor: "red",
                            toBgColor: "blue"
                        },
                        {
                            from: 6,
                            to: null,
                            color: "black",
                            bgcolor: "#33ff33"
                        }
                    ]
                }
            ]
        },
        {
            name: "arrow",
            checked: false,
            format: [
                {
                    columnNum: 1,
                    base: 19
                }
            ]
        },
        {
            name: "date",
            format: [
                {
                    columnNum: 5,
                    formatType: 'long'
                }
            ]
        },
        {
            name: "number",
            format: [
                {
                    columnNum: 4,
                    prefix: '$'
                }
            ]
        },
        {
            name: "bar",
            format: [
                {
                    columnNum: 1,
                    width: 100
                }
            ]
        }
    ]

    chart1.formatters = {};

    $scope.chart = chart1;

    $scope.chart2 = {
  "type": "ColumnChart",
  "displayed": true,
  "cssStyle": "height:600px; width:100%;",
  "data": {
    "cols": [
      {
        "id": "month",
        "label": "Beer",
        "type": "string"
      },
      {
        "id": "laptop-id",
        "label": "Used",
        "type": "number"
      },
      {
        "id": "other-id",
        "label": "Remain",
        "type": "number"
      }
    ],
    "rows": [
      {
        "c": [
          {
            "v": "Used"
          },
          {
            "v": 19,
            "f": "19 items"
          }
        ],
        "c": [
          {
            "v": "Remaining"
          },
          {
            "v": 46,
            "f": "46 items"
          }
        ]
      }
    ]
  },
  "options": {
    "title": "Inventory",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Cups",
      "gridlines": {
        "count": 10
      }
    },
    "hAxis": {
      "title": "Supply"
    }
  },
  "formatters": {}
}
    /*$scope.chartSelectionChange = function () {

        if (($scope.chart.type === 'Table' && $scope.chart.data.cols.length === 6 && $scope.chart.options.tooltip.isHtml === true) ||
            ($scope.chart.type != 'Table' && $scope.chart.data.cols.length === 6 && $scope.chart.options.tooltip.isHtml === false)) {
            $scope.chart.data.cols.pop();
            delete $scope.chart.data.rows[0].c[5];
            delete $scope.chart.data.rows[1].c[5];
            delete $scope.chart.data.rows[2].c[5];
        }


        if ($scope.chart.type === 'Table') {

            $scope.chart.options.tooltip.isHtml = false;

            $scope.chart.data.cols.push({id: "data-id", label: "Date", type: "date"});
            $scope.chart.data.rows[0].c[5] = {v: "Date(2013,01,05)"};
            $scope.chart.data.rows[1].c[5] = {v: "Date(2013,02,05)"};
            $scope.chart.data.rows[2].c[5] = {v: "Date(2013,03,05)"};
        }

    } */


    /*$scope.htmlTooltip = function () {

        if ($scope.chart.options.tooltip.isHtml) {
            $scope.chart.data.cols.push({id: "", "role": "tooltip", "type": "string", "p": { "role": "tooltip", 'html': true} });
            $scope.chart.data.rows[0].c[5] = {v: " <b>Shipping " + $scope.chart.data.rows[0].c[4].v + "</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />"};
            $scope.chart.data.rows[1].c[5] = {v: " <b>Shipping " + $scope.chart.data.rows[1].c[4].v + "</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />"};
            $scope.chart.data.rows[2].c[5] = {v: " <b>Shipping " + $scope.chart.data.rows[2].c[4].v + "</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />"};
        } else {
            $scope.chart.data.cols.pop();
            delete $scope.chart.data.rows[0].c[5];
            delete $scope.chart.data.rows[1].c[5];
            delete $scope.chart.data.rows[2].c[5];
        }
    }*/


    /*$scope.hideServer = false;
    $scope.selectionChange = function () {
        if ($scope.hideServer) {
            $scope.chart.view = {columns: [0, 1, 2, 4]};
        } else {
            $scope.chart.view = {};
        }
    }

    $scope.formatCollection = formatCollection;
    $scope.toggleFormat = function (format) {
        $scope.chart.formatters[format.name] = format.format;
    };*/

    /*$scope.chartReady = function () {
        fixGoogleChartsBarsBootstrap();
    }*.

    /*function fixGoogleChartsBarsBootstrap() {
        // Google charts uses <img height="12px">, which is incompatible with Twitter
        // * bootstrap in responsive mode, which inserts a css rule for: img { height: auto; }.
        // *
        // * The fix is to use inline style width attributes, ie <img style="height: 12px;">.
        // * BUT we can't change the way Google Charts renders its bars. Nor can we change
        // * the Twitter bootstrap CSS and remain future proof.
        // *
        // * Instead, this function can be called after a Google charts render to "fix" the
        // * issue by setting the style attributes dynamically.

        $(".google-visualization-table-table img[width]").each(function (index, img) {
            $(img).css("width", $(img).attr("width")).css("height", $(img).attr("height"));
        });
    };*/


		
});
