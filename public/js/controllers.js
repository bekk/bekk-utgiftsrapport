function refreshList($scope, sharedProperties) {
    jQuery.ajax({url: "/utgifter", 
        success: function(data) {
            sharedProperties.setExpenses(data);
            $scope.newExpenses = sharedProperties.getNewExpenses();
            $scope.deliveredExpenses = sharedProperties.getDeliveredExpenses();
        },
        error: function(data, status, headers, config) {
            alert("error");
        },
        async: false
    });
}

function MenuCtrl($scope, $location) {
    $scope.location = $location;
}

function UtgiftCtrl($scope, $http, sharedProperties) {
    refreshList($scope, sharedProperties);

    $scope.newExpenses = sharedProperties.getNewExpenses();
    $scope.deliveredExpenses = sharedProperties.getDeliveredExpenses();
 
    $scope.addUtgift = function() {
        var sum = parseFloat($scope.sum, 10);

        jQuery.ajax({
            url: "/utgift", 
            type: "POST",
            data: {'tittel': $scope.tittel, 'sum': sum, 'levert': false},
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

    $scope.slettUtgift = function(id) {
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

function tilpassAntallUtgifter(utgifter) {
    utgifter = utgifter.slice(0, 3);
    var arrayLength = utgifter.length;
    for (var i = 0; i < 3 - arrayLength; i++) {
        utgifter.push({tittel: "-", sum: "-"});
    }
    return utgifter;
}

function RenderReportCtrl($scope, sharedProperties) {
    refreshList($scope, sharedProperties);

	$scope.utgifter = sharedProperties.getNewExpenses();
    
    if ($scope.utgifter.length != 3) {
        //TODO: Må ha kun 3 kvitteringer slik nåværende receiptsToMatrix fungerer!
        $scope.utgifter = tilpassAntallUtgifter($scope.utgifter);
    }

	var matrix = utils.receiptsToMatrix($scope.utgifter);

	$scope.matrix = matrix;

    $scope.radsummer = utils.matrixToRadsummer(matrix);

    $scope.$on('$viewContentLoaded', doRepeat);

    $scope.genererRapport = function (event) {
        var opts = {
            lines: 11, // The number of lines to draw
            length: 4, // The length of each line
            width: 2, // The line thickness
            radius: 5, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var target = $('#generate-report');
        var spinner = new Spinner(opts).spin(target);
        jQuery.ajax({
            url:"/rapport",
            type:"GET",
            success:function (data, status, headers, config) {
                console.log(headers);
                spinner.stop();
            },

            error:function (data, status, headers, config) {
                console.log("noe gikk galt ved generering: " + headers);
                spinner.stop();
            },
            async:false
        })
    }

    $scope.deliverReport = function(event) {
        var idList = _.map(sharedProperties.getNewExpenses(), function(item) {
            return item._id.$oid;
        });
        var obj = { 'utgifter': idList };
        jQuery.ajax({
            url: "/utgifter/lever",
            type: "POST",
            data: obj,
            success: function(data) {
                console.log("det gikk!");
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}