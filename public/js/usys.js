angular.module('usys', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/renderReport', {
        	templateUrl: 'tpl/report.html',
        	controller: RenderReportCtrl
        }).
        otherwise({
        	templateUrl: 'tpl/expenses.html',
        	controller: UtgiftCtrl
        });
    }])
    .service('sharedProperties', services.sharedProperties);
