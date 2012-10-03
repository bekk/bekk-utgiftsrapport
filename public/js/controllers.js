function UtgiftCtrl($scope, sharedProperties) {
  $scope.utgifter = sharedProperties.getUtgifter();
 
  $scope.addUtgift = function() {
    var sum = parseFloat($scope.sum, 10);
    $scope.utgifter.unshift({tittel: $scope.tittel, sum: sum});
    $scope.tittel = null;
    $scope.sum = null;

    $('#title-input').focus();
  };
}

function RenderReportCtrl($scope, sharedProperties) {
	$scope.utgifter = sharedProperties.getUtgifter();
	var matrix = utils.receiptsToMatrix($scope.utgifter);

	$scope.matrix = matrix;
}