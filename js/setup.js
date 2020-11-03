var setup = {
	start:function() {
		setup.bindBtn();
		setup.bindFilter();
		setup.bindPlugins();
		setup.onResize();

		setup.adjustPadding();
		setup.adjustImgRatio();
	},
	bindBtn:function(){
		$('#menu_btn').on('click', function(){
			if (!$(this).hasClass('opened')) {
				$(this).addClass('opened');
				$('#menu').stop().slideDown();
			} else {
				$(this).removeClass('opened');
				$('#menu').stop().slideUp();
			}
		})
	},
	bindFilter:function(){
		$('input[name="proj_filter"]').on('change', function(){
			var show = $('input[name="proj_filter"]:checked').val();
			$('#tri_column li').removeClass('disabled');
			$('#tri_column li:not(.'+show+')').addClass('disabled');
		});
		$('#btn_reset').on('click', function(){
			$('#tri_column li').removeClass('disabled');
			$('input[name="proj_filter"]:checked').prop('checked', false);
		});
	},
	bindPlugins:function(){
		$('.scrollpane').jScrollPane({
			autoReinitialise: true,
			horizontalGutter: 30,
			contentWidth: '0px'
		});
	},
	onResize:function(){
		$(window).resize(function(){
			clearTimeout(once);
			var once = setTimeout(function(){
				setup.adjustPadding();
				setup.adjustImgRatio();
			}, 500);
		});
	},
	adjustPadding:function(){
		var introHeight = $('#intro_wrap').height();
		$('#middle_zone').css('padding-top', introHeight+30);
	},
	adjustImgRatio:function(){
		$('#tri_column > li > div').each(function(){
			var imgWidth = $(this).find('img').width();
			var newWidth = imgWidth*0.75;
			$(this).css('height', newWidth);
		});	
	}
}

document.addEventListener("DOMContentLoaded", function() {
	setup.start();
});