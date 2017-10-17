$(document).ready(function() {
	$(document).scroll(function () {
		var y = $(this).scrollTop();
		if (y > 300) {
			$('#navbarLogo').fadeIn();
		} else {
			$('#navbarLogo').fadeOut();
		}
	});

	$('#navigation .navbar-nav li>a').click(function() {
		var link = $(this).attr('href');
		var pos = $(link).offset().top;
		$('body,html').animate({ scrollTop: pos }, 700);
	});

	$('#navigation .navbar-brand').click(function() {
		var link = $(this).attr('href');
		var pos = $(link).offset().top;
		$('body,html').animate({ scrollTop: pos }, 700);
	});

    sections = $('.section'),
    nav = $('.navbar-nav');
	$(window).on('scroll', function () {
    	var pos = $(this).scrollTop();
		
      	sections.each(function () {
        	var top = $(this).offset().top,
			bottom = top + $(this).outerHeight();
			
			if (pos >= top && pos <= bottom) {
				nav.children('.nav-item').find('a').removeClass('active');
				nav.children('.nav-item').find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
			} else {
				nav.children('.nav-item').find('a[href="#' + $(this).attr('id') + '"]').removeClass('active');
			}
      	});
	});
});
