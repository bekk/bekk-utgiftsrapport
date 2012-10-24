function refreshList($scope, sharedProperties) {
  jQuery.ajax({url: "/utgifter", 
    success: function(data) {
      sharedProperties.setUtgifter(data);
      $scope.utgifter = data
    },
    error: function(data, status, headers, config) {
        alert("error");
      },
    async: false
  });
}

function UtgiftCtrl($scope, $http, sharedProperties) {
  refreshList($scope, sharedProperties);

  $scope.utgifter = sharedProperties.getUtgifter();
 
  $scope.addUtgift = function() {
    var sum = parseFloat($scope.sum, 10);

    jQuery.ajax({
      url: "/utgift", 
      type: "POST",
      data: {tittel: $scope.tittel, sum: sum},
      success: function(data) {
          refreshList($scope, sharedProperties);
        },
      error: function(data, status, headers, config) {
          alert("error");
        },
      async: false
    });

    $scope.tittel = null;
    $scope.sum = null;

    $('#title-input').focus();
  };

  $scope.slettUtgift = function(event) {
    var id = event.srcElement.id;
    jQuery.ajax({
      url: "/utgift",
      type: "DELETE",
      data: {"id": id},
      success: function(data, status, headers, config) {
          refreshList($scope, sharedProperties);
        },
      error: function(data, status, headers, config) {
          alert("error");
        },
      async: false
    });
  };
}

function RenderReportCtrl($scope, sharedProperties) {
  refreshList($scope, sharedProperties);

	$scope.utgifter = sharedProperties.getUtgifter();
	var matrix = utils.receiptsToMatrix($scope.utgifter);

	$scope.matrix = matrix;

  $scope.$on('$viewContentLoaded', doRepeat);
}