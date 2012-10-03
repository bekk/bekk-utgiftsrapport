var services = (function() {
	var sharedProperties = function () {
		var utgifter = [
		    {tittel: "Hola", sum: "120948"},
		    {tittel: "Hola2 awfd", sum: "749234"},
		    {tittel: "Hola3 woeigj iigwh ", sum: "3"},
		    {tittel: "Hola4777q kjsefoqkw", sum: "2380891"},
		    {tittel: "Hola5", sum: "123"}
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