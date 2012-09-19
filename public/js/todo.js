function UtgiftCtrl($scope) {
  $scope.utgifter = [
    {tittel: "Hola", sum: "120948"},
    {tittel: "Hola2 awfd", sum: "749234"},
    {tittel: "Hola3 woeigj iigwh ", sum: "3"},
    {tittel: "Hola4777q kjsefoqkw", sum: "2380891"},
    {tittel: "Hola5", sum: "123"}
  ];
 
  $scope.addUtgift = function() {
    var sum = parseFloat($scope.sum, 10);
    $scope.utgifter.unshift({tittel: $scope.tittel, sum: sum});
    $scope.tittel = '';
    $scope.sum = 0.0;
  };
}