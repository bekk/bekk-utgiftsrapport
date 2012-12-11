var utils = (function() {
	function receiptsToMatrix(receipts) {
		var matrix = [];

		for (var i in receipts) {
			var row = [];

			for (var j = 0; j < receipts.length*2; j++) {
				row.push(null);
			}

			row[parseInt(i,10)*2] = parseInt(i,10)+1;
			row[parseInt(i,10)*2+1] = receipts[i].sum;

			matrix.push(row);
		}

		return matrix;
	}

	function matrixToRadsummer(matrix) {		
		var radsummer = [];
		
		for (var i = 0; i < matrix.length; i++) {
			var radsum = 0;

			for (var j = 1; j < matrix[i].length; j+=2) {
				if (matrix[i][j] !== null) {
					radsum += parseInt(matrix[i][j], 10);
				}
			}
			radsummer.push(radsum);
		}

		return radsummer;
	}

	return {
		receiptsToMatrix: receiptsToMatrix,
		matrixToRadsummer: matrixToRadsummer
	};

	
})();