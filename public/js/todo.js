function UtgiftCtrl($scope) {
  $scope.utgifter = [];
 
  $scope.addUtgift = function() {
    var sum = parseFloat($scope.sum, 10);
    $scope.utgifter.unshift({tittel: $scope.tittel, sum: sum});
    $scope.tittel = '';
    $scope.sum = 0.0;
  };
}