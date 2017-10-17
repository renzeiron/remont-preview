$(document).ready(function() {
	$(document).scroll(function () {
		var y = $(this).scrollTop();
		if (y > 300) {
			$('#navbarLogo').fadeIn();
		} else {
			$('#navbarLogo').fadeOut();
		}
	});
});
