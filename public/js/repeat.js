function doRepeat() {
	function repeat(element) {
		element.find('[repeat]').each(function() {
			repeat($(this))
		});

		var numberOfTimes = parseInt(element.attr('repeat'), 10);

		for (var a = 0; a < numberOfTimes; a++) {
			element.after(element.clone());
		}
	}

	$('[repeat]').each(function() {
		repeat($(this));
	});
}