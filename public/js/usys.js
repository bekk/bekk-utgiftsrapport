angular.module('usys', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/renderReport', {templateUrl: 'tpl/renderReport.html', controller: RenderReportCtrl}).
      otherwise({templateUrl: 'tpl/addReceipt.html', controller: UtgiftCtrl});
  }]).
  service('sharedProperties', services.sharedProperties);