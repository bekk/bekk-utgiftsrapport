var services = (function() {
	var sharedProperties = function () {
		var expenses = [];

		function getDeliveredExpenses() {
	  		return _(expenses).filter(function(expense) {
	  			return expense.levert === true;
	  		});
	  	}

	  	function getNewExpenses() {
	  		return _(expenses).filter(function(expense) {
	  			return expense.levert !== true;
	  		});
	  	}

	  	function setExpenses(newExpenses) {
	  		expenses = newExpenses;
	  	}

		return {
		  	getDeliveredExpenses : getDeliveredExpenses,
		  	getNewExpenses : getNewExpenses,
		  	setExpenses : setExpenses
		};
	}

	return {
		sharedProperties: sharedProperties
	}
})();