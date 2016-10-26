var uploadFiles = function(node, file) {
	var fd = new FormData();
	fd.append("file", file);

	$.ajax({
	    url: $(node).data('url'),
	    type: 'POST',
	    data: fd,
	    processData: false,
	    contentType: false,
	    dataType: "json",
	    success: function(data, status, jqXHR) {
	        //画像を設定
	        $img = $(node).find('img');
	        $img.attr('src', data.url);
	        $img.show(300);
	        $(node).children('input').val(data.filename);

	        //閉じるボタンを有効化
	        $(node).find('.close').css('display', 'block');
	        //コンポーネントを追加
	        if(!$(node).hasClass('one')){
	        	$(node).clone(true).insertAfter(node).children('.close').css('display', 'none');	
	        }
	    },
	    error: function(jqXHR, textStatus, errorThrown){
	    	alert(errorThrown);
	    },
	});
}

var initTemplate = function (){

	//
	// menu
	//
	$(".hy-top-menu ul").hide();
	$(".hy-top-menu a").click(function(event) {
		var targetId = $(this).attr('for');
		var isHidden = ($("#" + targetId).css('display') === "none");
		$(".hy-top-menu ul").hide('300');
		if(isHidden){
			$("#" + targetId).show('300');
		}
	});

	//
	// form validation
	//
	$(".hy-validate").blur(function(event) {
		
		if($(this).data("validate-url") == null || $(this).data("validate-url").length == 0){
			if($(this).hasClass('required')){
				if($(this).val().length == 0){
					var targetId = $(this).data('validate-result');
	    			$('#' + targetId).text($(this).data('validate-fail'));
		    		$(this).removeClass('success');
		        	$(this).addClass('fail');
				}else{
					var targetId = $(this).data('validate-result');
		    			$('#' + targetId).text($(this).data('validate-success'));
			        	$(this).removeClass('fail');
			        	$(this).addClass('success');
				}
			}
			return;
		}

		$.ajax({
		    url: $(this).data("validate-url"),
		    method: "POST",
		    data: {
		    	name : $(this).attr('name'), 
		    	data : $(this).val()
		    },
		    context: this,
		    dataType: "json",
		    success: function(data, status, jqXHR) {
		    	if(data.result){
		        	var targetId = $(this).data('validate-result');
		        	$('#' + targetId).text(data.msg);
		        	$(this).removeClass('fail');
		        	$(this).addClass('success');
		    	}else{
		    		var targetId = $(this).data('validate-result');
	    			$('#' + targetId).text(data.msg);
		    		$(this).removeClass('success');
		        	$(this).addClass('fail');
		    	}
		    },
		    error: function(jqXHR, textStatus, errorThrown){
	    		var targetId = $(this).data('validate-result');
	    		$('#' + targetId).text($(this).data('validate-fail'));
	    		$(this).removeClass('success');
		        $(this).addClass('fail');
	    	},
		});
	});
	$(".hy-validate").trigger('blur');

	//
	// ajax form
	//
	$('.hy-ajax-form').each(function(index, el) {
		$(this).on( $(this).data('event'), function(event) {
			var value = $(this).val();
			var url = $(this).parents('form').attr('action');
			var name = $(this).attr('name');
			$.ajax({
			    url: url,
			    type: 'POST',
			    data: {
			    	name: value, 
			    },
			    processData: false,
			    contentType: false,
			    context: this,
			});
		});
	});



	//
	// form-file
	//
    $('.hy-form-file').bind('drop', function(event){
        event.preventDefault();
        $(this).find('img').hide(300);
        var file = event.originalEvent.dataTransfer.files[0];
        if (!/^image\/(png|jpeg|gif)$/.test(file.type)) {
            alert('画像ファイル以外は利用できません');
            return;
        }
        uploadFiles(this, file);
    }).bind('dragenter', function(){
        return false;
    }).bind('dragover', function(){
        return false;
    });
    $('.hy-form-file > .close').click(function(event) {
    	if($(this).parent().hasClass('one')){
    		$img = $(this).parent().find('img');
    		$img.hide(300);
    		$(this).hide(300);
    		$img.removeAttr('src');
    		$(this).parent().children('input').val('');
    	}else{
    		$(this).parent().hide(300);
    		$(this).parent().remove();
    	}
    });
    $('.hy-form-file').each(function(){
    	var src = $(this).find("img").attr("src");
    	if(src.length >= 1){
    		$(this).children('.close').css('display', 'block');
    	}
    });


	//
	//favorite
	//
	$(".status").each(function(index, el) {
		$(this).find('.star:not(.disable)').click(function(event) {
			var on = $(this).hasClass('on')
			var toUrl = $(this).data('url');
			if(on){
				$(this).removeClass('on');
			}else{
				$(this).addClass('on');
			}
			on = !on;

			$.ajax({
			    type: 'GET',
			    url: toUrl + 'mode=' + on,
			    timeout: 10000,
			    cache: false,
			    dataType: 'json',
			    context: this,
			    complete: function(response, textStatus, jqXHR) {
			    	var $numberField = $(this).parent().children('.number');
					var num = $numberField.text();
					if(on){
						var newNum = Number(num) + 1;
					}else{
						var newNum = Number(num) - 1;	
					}
					$numberField.text(newNum);
				},
			});
			return false;
		});
	});

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
		console.log("fire");
		$(".hy-tab-menu > button").addClass("inactive");	
		$(this).removeClass("inactive");

		var targetId = $(this).attr('for');
		$(".hy-tab-content > *").hide(100);
		$("#" + targetId).show(300);
	});
	$(".hy-tab-menu > button[for='" + $(location).attr('hash').slice(1) + "']").trigger('click');

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

	//
	// tag
	//
	$('.hy-tag.close').each(function(index, el) {
		var name = $(this).data('name');
		$(this).click(function(event) {
			$(this).hide(300);
			$(this).remove();
		});
		$(this).append('<input type="hidden" name="tag[]" value="'+ name +'">');
	});


	//
	// LazyLoad
	//
	$('img.lazy').lazyload();


	//
	// datePicker
	//
	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
    $( ".hy-datepicker" ).datepicker();

}


$(document).ready(function() {
	initTemplate();
});
