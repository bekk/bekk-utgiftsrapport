angular.module('usys.components', []).
    directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                var tabs = $scope.tabs = [];

                $scope.select = function(tab) {
                    angular.forEach(tabs, function(tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                }

                this.addTab = function(tab) {
                    if (tabs.length == 0) $scope.select(tab);
                    tabs.push(tab);
                }
            },
            template:
                '<ul class="nav nav-pills">' +
                    '<li ng-repeat="tab in tabs" ng-class="{active:tab.selected}" ng-transclude>' +
                    '</li>' +
                '</ul>',
            replace: true
        };
    }).
    directive('tab', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: {
                url: '@'
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addTab(scope);
            },
            template: '<a href="{{scope.url}}" ng-click="select(scope)" ng-transclude></a>',
            replace: true
        };
    });