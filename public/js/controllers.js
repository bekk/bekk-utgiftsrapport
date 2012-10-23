function UtgiftCtrl($scope, $http, sharedProperties) {
  function refreshList() {
    jQuery.ajax({url: "/utgifter", 
      success: function(data) {
        sharedProperties.setUtgifter(data);
        $scope.utgifter = data
      },
      async: false
    });
  }

  refreshList();

  $scope.utgifter = sharedProperties.getUtgifter();
 
  $scope.addUtgift = function() {
    var sum = parseFloat($scope.sum, 10);
    $scope.utgifter.unshift({tittel: $scope.tittel, sum: sum});
    jQuery.post("/utgift", {tittel: $scope.tittel, sum: sum });
    $scope.tittel = null;
    $scope.sum = null;

    $('#title-input').focus();
  };

  $scope.slettUtgift = function(event) {
    var id = event.srcElement.id;
    $http({
      url: "/utgift",
      method: "DELETE",
      params: {"id": id}
    }).success(function(data, status, headers, config) {
        refreshList();
    }).error(function(data, status, headers, config) {
        alert("error");
    });
  };
}

function RenderReportCtrl($scope, sharedProperties) {
  
	$scope.utgifter = sharedProperties.getUtgifter();
	var matrix = utils.receiptsToMatrix($scope.utgifter);

	$scope.matrix = matrix;
}