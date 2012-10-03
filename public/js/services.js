var services = (function() {
	var sharedProperties = function () {
		var utgifter = [];

		return {
		  	getUtgifter:function () {
		  		return utgifter;
		  	},
		  	setUtgifter:function (value) {
		  		utgifter = value;
		  	}
		};
	}

	return {
		sharedProperties: sharedProperties
	}
})();