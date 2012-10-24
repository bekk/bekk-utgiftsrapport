function doRepeat() {
	function repeat(elements) {
		elements.each(function() {
			if ($(this).children().length > 0) {
				repeat($(this).children())
			}

			var attr = $(this).attr('repeat');
			var isInner = false;

			if (attr) {
				if (attr.indexOf('inner') !== -1) {
					attr = attr.split(" ")[0];
					isInner = true;
				}

				var numberOfTimes = parseInt($(this).attr('repeat'), 10);

				if (isInner) {
					var toBeRepeated = $($(this).html());
				} else {
					var toBeRepeated = $(this).clone();
				}

				for (var a = 0; a < numberOfTimes-1; a++) {
					if (isInner) {
						$(this).append(toBeRepeated.clone());
					} else {
						$(this).after(toBeRepeated.clone());
					}
				}
			}
		});
	}

	repeat($(document));
}