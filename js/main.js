(function($) {

	var XR = {};

	XR.filters = {
		previousFilterType: '',
		previousFilter: '',
		toggleCount: 0,
		init: function() {
			XR.filters.filter();
		},
		filter: function() {
			$(document).on('click', '.filter', function() {
				// ex: 'role'
				const $type = $(this).data('type');
				// ex: 'dev'
				const $filter = $(this).data('filter');
				const $filtereds = $('.js-filtered-content');
				const $years = $('.js-filtered');
				var activeYears = [];

				sameAsPrevious = ($type == XR.filters.previousFilterType) && ($filter == XR.filters.previousFilter);
				XR.filters.toggleCount = sameAsPrevious ? XR.filters.toggleCount + 1 : 0;

				$('.filter').removeClass('is-active');

				// toggle on / off
				// if odd count and clicking the same filter, turn off filter
				if ( sameAsPrevious && (XR.filters.toggleCount % 2 != 0)) {
					$('.js-filtered-content, .js-filtered').removeClass('is-not-selected');
				} else {
					$(this).addClass('is-active');
					for (i = 0; i < $filtereds.length; i++) {
						$filtered = $($filtereds[i]);
						// ex: 'code ui'
						$filters = $filtered.data($type).toString().split(' ');
						$filtered.addClass('is-not-selected');
						$years.addClass('is-not-selected');
						for (n = 0; n < $filters.length; n++) {
							if ($filters[n] == $filter) {
								$filtered.removeClass('is-not-selected');
								activeYears.push($filtered.data('year'));
							}
						}
					}
					for (x = 0; x < activeYears.length; x++) {
						activeYear = activeYears[x];
						$('.js-filtered[data-year=' + activeYear + ']' ).removeClass('is-not-selected');
					}

				}

				XR.filters.previousFilterType = $type;
				XR.filters.previousFilter = $filter;

			});
		}
	};

	/*
	XR.details = {
		init: function() {
			$(document).on('click', '.js-view-details', function() {
				$('body').addClass('is-view-details');
				$(this).addClass('is-active');
				$('.js-view-links').removeClass('is-active');
			});
			$(document).on('click', '.js-view-links', function() {
				$('body').removeClass('is-view-details');
				$(this).addClass('is-active');
				$('.js-view-details').removeClass('is-active');
			});
		}
	};
	*/

	XR.images = {
		$images: $('.js-image'),
		$captions: $('.js-image-caption'),
		pastImages: [],
		init: function() {
			XR.images.getRandomImage();
			$(document).on('click', '.js-get-new-image', function() {
				XR.images.getRandomImage();
			});
		},
		getRandomImage: function() {
			XR.images.$images.hide();
			XR.images.$captions.hide();
			// get a random number
			var random = XR.images.getNumber();
			// get an image based on that number
			var $image = $(XR.images.$images[random]);
			var $caption = $(XR.images.$captions[random]);
			// get image src
			var src = $image.data('src');

			// if getting a new image
			if (src && XR.images.pastImages.indexOf(src) == -1) {
				XR.images.pastImages.push(src);
				var img = new Image();
				img.onload = function() {
					XR.images.fadeIn($image, $caption);
				};
				$image.append(img);
				img.src = src;
			} else {
				XR.images.fadeIn($image, $caption);
			}
		},
		fadeIn: function($image, $caption) {
			$image.fadeIn(500);
			$caption.fadeIn(500);
		},
		getNumber: function() {
			const min = 0;
			const max = XR.images.$images.length;
			var random;

			do {
				random = Math.floor(Math.random() * (max - min)) + min;
			} while (random === XR.images.getNumber.last);
			XR.images.getNumber.last = random;
			return random;
		}

	}


	XR.scrollToc = {
		init: function() {
			var navHeight = $('.js-nav').outerHeight(true);
			$('.nav-pushdown').height(navHeight);
			window.addEventListener('scroll', _.throttle( function() { XR.scrollToc.activeOnScroll(navHeight) }, 1000));

			$('.js-nav-item').click(function(e) {
				e.preventDefault();

				$('html, body').animate({
					scrollTop: $('#'+$(this).data('scrollto')).offset().top
				}, 900);

			});
		},
		activeOnScroll: function(navHeight) {
			var scrollPos = $(document).scrollTop();
			var windowHeight = $(window).height();

			$('.js-nav-item').each(function() {
				var currLink = $(this);
				var refElement =  '#' + $(this).data('scrollto');
				refElement =  $(refElement);

				if ( (refElement.offset().top  - navHeight < scrollPos ) && (refElement.offset().top  + refElement.outerHeight(true) - navHeight  >= scrollPos ) ) {
					$('.js-nav-item').removeClass('is-active');
					currLink.addClass('is-active');
				} else {
					currLink.removeClass('is-active');
				}

			});
		}
	}


	$(document).ready(function(){
		XR.filters.init();
		// XR.details.init();
		XR.images.init();
		XR.scrollToc.init();
	});


})(jQuery);

