var utils = (function() {
	function receiptsToMatrix(receipts) {
		var matrix = [];

		for (var i in receipts) {
			var row = [receipts[i].tittel];

			for (var j in receipts) {
				row.push(null);
			}

			row[parseInt(i)+1] = receipts[i].sum;

			matrix.push(row);
		}

		return matrix;
	}

	return {
		receiptsToMatrix: receiptsToMatrix
	};
})();