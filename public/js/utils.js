var utils = (function() {
	function receiptsToMatrix(receipts) {
		if (receipts.length != 3) {
			alert("TODO: Må ha kun 3 kvitteringer!");
		}

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

	return {
		receiptsToMatrix: receiptsToMatrix
	};
})();