var services = (function() {
	var sharedProperties = function () {
		var utgifter = [
		    {tittel: "Mat", sum: "344"},
		    {tittel: "Taxi", sum: "152"},
		    {tittel: "Bytur", sum: "877"}
		];

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