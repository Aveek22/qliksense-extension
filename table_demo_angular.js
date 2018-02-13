define( ["qlik","jquery", "text!./style.css", "text!./template.html"], function (qlik, $, cssContent, template ) {'use strict';
    $("<style>").html(cssContent).appendTo("head");
	return {
       template: template,
       initialProperties : {
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 10,
					qHeight : 50
				}]
			}
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				dimensions : {
					uses : "dimensions",
					min : 3
				},
				measures : {
					uses : "measures",
					min : 3
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings",
					items : {
						initFetchRows : {
							ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
							label : "Initial fetch rows",
							type : "number",
							defaultValue : 50
						}
					}
				}
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : true
		},
		paint: function ( ) {
			//setup scope.table
			if ( !this.$scope.table ) {
				this.$scope.table = qlik.table( this );
			}
			console.log("$scope.table: ", this.$scope.table);
			return qlik.Promise.resolve();
		},
		controller: ['$scope', function ($scope) {
			$scope.title = "Demo";
			// $scope.tableData = $scope.table;
			// console.log($scope.table);
			$scope.img = "http://kikkidu.com/wp-content/uploads/2011/03/central.jpg";
			$scope.getWidth = function(row, measureinfo) {
				var width = 80 * row[1].qNum / ( measureinfo ? measureinfo[0].qMax * 1.5 : 1) + '%';
				return {
					"width" : width
				}
			}
		}]
	};

} );
