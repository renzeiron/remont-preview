$(document).ready(function() {

	$('[data-fancybox]').fancybox({
		buttons : [ 'close' ]
	});

	$('#navigation .navbar-nav li > a').click(function(e) {
		$('.navbar-collapse').collapse('hide');
		e.preventDefault(); 
		var link = $(this).attr('href');
		var pos = $(link).offset().top;
		//var pos = $(link).offset().top + $('#navbarLogo').outerHeight();
		//$('body, html').animate({ scrollTop: pos - $('.navbar-collapse').outerHeight() + $('#navbarLogo').outerHeight() }, 700);
		if (document.documentElement.clientWidth <= 992) {
			pos = pos + $('#navbarLogo').outerHeight() - $('.navbar-collapse').outerHeight() - 10
			$('body, html').animate({ scrollTop: pos }, 700);
		} else {
			$('body, html').animate({ scrollTop: pos }, 700);
		}
	});

	$('#navigation .navbar-brand').click(function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var pos = $(link).offset().top;
		$('body, html').animate({ scrollTop: pos }, 700);
	});

	$('#services a').click(function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		$(link).addClass('show');
		var pos = $(link).offset().top;
		$('body, html').animate({ scrollTop: pos - $('#navigation').outerHeight() }, 700);
	});

	$('a').click(function(e) {
		$(this).blur();
		e.preventDefault();
	});

	$('#calculate').click(function() {
		var total = 0;

		$('#calc-body tbody tr').each(function() {
			var price;
			
			$(this).find('.td-price').each(function() {
				price = parseInt($(this).html());
			});

			$(this).find('input').each(function(index, elem) {
				var val = parseInt($(elem).val());
				if (!isNaN(val)) {
					total += val * price;
				}
			});
		});

		$('#total').text('Итого: ' + total + ' грн.');
	});

    sections = $('.section'),
	nav = $('.navbar-nav');

	$(window).on('scroll', function () {
    	var pos = $(this).scrollTop() + $('#navigation').outerHeight();
		
		if (pos >= $('#top').outerHeight()) {
			$('#navbarLogo').fadeIn();
		} else {
			$('#navbarLogo').fadeOut();
		}

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

	$('#privacy-link').on('click', function() {
		$('#privacy-policy').modal('show');
	});

	$('#req-link').on('click', function() {
		$('#requisites').modal('show');
	});

});

function addEvent(node, type, callback) {
	if (node.addEventListener) {
		node.addEventListener(
			type,
			function(e) {
				  callback(e, e.target);
			},
			false
		);
	} else if (node.attachEvent) {
		node.attachEvent("on" + type, function(e) {
			callback(e, e.srcElement);
		});
	}
}

function shouldBeValidated(field) {
	return (
		!(field.getAttribute("readonly") || field.readonly) &&
		  !(field.getAttribute("disabled") || field.disabled) &&
		  (field.getAttribute("pattern") || field.getAttribute("required"))
	);
}

function instantValidation(field) {
	if (shouldBeValidated(field)) {
		//the field is invalid if:
		  //it's required but the value is empty
		  //it has a pattern but the (non-empty) value doesn't pass
		var invalid =
			(field.getAttribute("required") && !field.value) ||
			(field.getAttribute("pattern") &&
			field.value &&
			!new RegExp(field.getAttribute("pattern")).test(field.value));
  
		  //add or remove the attribute is indicated by
		  //the invalid flag and the current attribute state
		  if (!invalid && field.getAttribute("aria-invalid")) {
			field.removeAttribute("aria-invalid");
		  } else if (invalid && !field.getAttribute("aria-invalid")) {
			field.setAttribute("aria-invalid", "true");
		}
	}
}

(function() {
	'use strict';	  
	window.addEventListener('load', function() {
		var form = document.getElementById('contact-form');
		var fields = [ form.getElementsByTagName("input") ];
		
		for (var a = fields.length, i = 0; i < a; i++) {
			for (var b = fields[i].length, j = 0; j < b; j++) {
				  addEvent(fields[i][j], "change", function(e, target) {
					instantValidation(target);
				});
			}
		}
		
		form.addEventListener('submit', function(event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
			  event.stopPropagation();
			}

			$('#needs-validation').addClass('was-validated');
		}, false);
	}, false);
})();