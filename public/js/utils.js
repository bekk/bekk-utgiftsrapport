var utils = (function() {
	function receiptsToMatrix(receipts) {
		// TODO: Lag ordentlig kode
		return [
			["Taxi", 123, null, null], 
			["Mat", null, 2323, null], 
			["Bytur", null, null, 424]
		];
	}

	return {
		receiptsToMatrix: receiptsToMatrix
	};
})();