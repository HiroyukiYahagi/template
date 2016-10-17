var initTemplate = function (){
	//
	// slider
	//
	$(".hy-slider").each(function(){
		var show = $(this).data('show');
		$(this).slick({
		    dots: true,
		    infinite: true,
		    centerMode: true,
		    slidesToShow: show,
		    slidesToScroll: 1
	    });
	});

	//
	// tab
	//
	$(".hy-tab-menu > button").addClass("inactive");
	$(".hy-tab-menu > button:first-child").removeClass("inactive");
	$(".hy-tab-content > *").each(function(){
		$(this).hide();
	});
	$(".hy-tab-content > *:first-child").each(function(){
		$(this).show(300);
	});
	$(".hy-tab-menu > button").click(function(){
		$(".hy-tab-menu > button").addClass("inactive");	
		$(this).removeClass("inactive");

		var targetId = $(this).attr('for');
		$(".hy-tab-content > *").hide(100);
		$("#" + targetId).show(300);
	});


	//
	// flush
	//
	$(".hy-flush").click(function(){
		$(this).hide(300);
		$(this).remove();
	});


	//
	// main-sub-image
	//
	$(".hy-sub-image").click(function(){
		var src = $(this).data("src");
		var targetId = $(this).attr("for");
		$("#" + targetId).animate({ opacity: 0 }, 300, function () {
			$(this).attr("src", src);
			$("#" + targetId).animate({ opacity: 1 }, 300);
		});
	});

}

$(document).ready(function() {
	initTemplate();

});