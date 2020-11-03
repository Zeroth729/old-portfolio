var switchTextStart = '啟動';
var switchTextStop = '暫停';
var myDate = new Date();
//var todaysDate = ((myDate.getFullYear()) + '/' + (myDate.getMonth()+1) + '/' + (myDate.getDate()));
var archiveDate = myDate.addMonths(-2);

$(document).ready(function(){
	if($('#menu_btn').length>0){
		$('#menu_btn').on('click', function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$('#mobile_menu_layer').removeClass('show');
				$('#header_zone').removeClass('showMenu');
				$('#middle_zone').removeClass('showMenu');
				$('#footer_zone').removeClass('showMenu');
				//$('#mobile_bg_layer').remove();
			}else{
				$(this).addClass('active');
				$('#mobile_menu_layer').addClass('show');
				$('#header_zone').addClass('showMenu');
				$('#middle_zone').addClass('showMenu');
				$('#footer_zone').addClass('showMenu');
				// $('#wrapper').append('<div id="mobile_bg_layer"></div>');
				/*$('#mobile_bg_layer').on('click', function(){
					$('#menu_btn').removeClass('active');
					$('#mobile_menu_layer').removeClass('show');
					$(this).remove();
				});*/
			}
		});
	}
	
//	bindMenuPos($(window).height());
	
	if($('#backtotop').length > 0){
		backToTop();
		$(window).on('scroll', function(e) { resetbackToTop();});		
	}
	
	if($('.accordion_wrap').length > 0){
		var icons = {
			header: "arrow-up",
			activeHeader: "arrow-down"
		};
		$('.accordion_wrap').accordion({
			icons: icons,
			header: '.accordion_title',
			collapsible: true,
			heightStyle: 'content'
		});
	}
	
	if($('.fancybox').length > 0){
		$('a.fancybox').fancybox({
			padding:30,
			maxWidth:800,
			helpers : {
				overlay : {
					css : {
						'background' : 'rgba(33, 108, 104, 0.9)'
					}
				}
			}
		});
	}
	if($('#searchResult_wrap').length > 0){
		var kw = getParameterByName('kw');
		generateSearchResult(encodeURIComponent(kw));
	}
	
	
	// wcag icon
	
	try{
		if(typeof(complyWCAG)=='undefined' || complyWCAG || complyWCAG == null){
			$('#footer_right').html('<ul class="clearfix"><li><a href="http://www.webforall.gov.hk/tc/recognition_scheme" target="_blank"><img src="'+currentPath+'/filemanager/template/common/images/index-footer-logo-web-for-all.jpg" id="icon_webforall" alt="無障礙網頁嘉許計劃"></a></li><li><a href="http://www.w3.org/WAI/WCAG2AA-Conformance" target="_blank"><img src="'+currentPath+'/filemanager/template/common/images/index-footer-logo-w3c.jpg" id="icon_w3c" alt="WCAG 2.0 AA"></a></li></ul>');
		}else if(!complyWCAG){
			if(typeof(nonComplyWCAGContentUrl)!='undefined'){
				if(nonComplyWCAGContentUrl != ''){
					$('#footer_right').html('<ul class="clearfix"><li><a href="'+nonComplyWCAGContentUrl+'" target="_blank"><img src="'+currentPath+'/filemanager/template/common/images/index-footer-logo-non-w3c.gif" id="icon_nonw3c" alt="無障礙網頁守則"></a></li></ul>');
				}
			}else{
				$('#footer_right').html('<ul class="clearfix"><li><a href="/'+currentLang+'/web_accessibility_conformance_statement/index.html" target="_blank"><img src="'+currentPath+'/filemanager/template/common/images/index-footer-logo-non-w3c.gif" id="icon_nonw3c" alt="無障礙網頁守則"></a></li></ul>');
			}
		}
	}catch(e){}
	
	try{
		$('input[name="search"]').on("touchstart focusin mouseover" , function(e){
			e.preventDefault();
			$(this).siblings('.btn_search').addClass('focus');
		}).on("touchend focusout mouseout" , function(e){
			e.preventDefault();
			if(!$(this).is(':focus')){
				$(this).siblings('.btn_search').removeClass('focus');	
			}
		});
		
		$('#header_zone input[name="search"]').keypress(function(e) {
			if(e.which == 13){
				e.preventDefault();
				search('from_d');
			}
	//		return false;
		});
		
		$('#mobile_menu_layer input[name="search"]').keypress(function(e) {
			if(e.which == 13){
				e.preventDefault();
				search('from_m');
			}
	//		return false;
		});
		
		$('#header_zone .btn_search').click(function(e){
			e.preventDefault();
			search('from_d');
		});
		
		$('#mobile_menu_layer .btn_search').click(function(e){
			e.preventDefault();
			search('from_m');
		});
	}catch(e){}
	
	loadFontSize();
});

function reInitAfterResize() {
	if($('#backtotop').length > 0){ fixedPos = true; backToTop(); resetbackToTop();}
	if($('#main_nav').length > 0) initSubNavWidth();
}

$(window).load(function(){
	//$('#content p, #content ul').last().addClass('no-margin-bottom');
	if($('#main_nav').length>0){
		$('ul#main_nav > li > a').on("touchstart focusin mouseenter" , function() {
			$(this).children('.bgcolor_line').stop(true,false).animate({height:'128px',top:0},300,"linear");	
		}).on("touchend focusout mouseleave" , function(){
			$(this).children('.bgcolor_line').stop(true,false).animate({height:0,top:0},300,"linear");
		});
		initMainNav();
		initSubNavWidth();
	}
	if($('#mobile_menu_nav').length>0) initMobileNav();
	if(isMobile){
		$('html, body').css({'height':'100%','overflow-y':'auto','-webkit-overflow-scrolling':'touch'});
	}
	//tab to focus menu starts
	$('a').on("focusin mouseover" , function() {
		$(this).addClass('focus');
		if(!isDescendant(document.getElementById("main_nav"), this)){
			$("ul#main_nav li").removeClass('active');
			$("ul#main_nav li .pulldown").slideUp(800);
		}else{
			var currA = $(this);
			
			// check submenu
			$("ul#main_nav li .pulldown").each(function(){
				if(!isDescendant($(this).parent('li').get(0), currA.get(0))){
					$(this).parent('li').removeClass('active');
					$(this).slideUp(800);
				}
			});
		}			
	}).on("focusout mouseout" , function() {
		$(this).removeClass('focus');
	});	
	$('ul#main_nav li').on('focusin', function(){
		if($('.pulldown', this).length > 0){																										
			$(this).addClass('active');
			$(this).children('.pulldown').slideDown(500);
			$(this).parent().children('li:not(.active)').children('.pulldown').stop(true,true).slideUp(800);
		}
	});
	$("a[href^='#']").click(function(evt){
		var anchortarget = $(this).attr("href");
		$(anchortarget).attr("tabindex", -1).focus();
	 });
	//tab to focus menu ends
});
	

function bindMenuPos(win_height){
	$(window).scroll(function() {
		//if ($(window).scrollTop() > win_height/2){
		if ($(window).scrollTop() > 10){
			if(!$('#header_zone').hasClass('stuck'))
				$('#header_zone').addClass('stuck');
		}else{
			$('#header_zone').removeClass('stuck');
		}
	});
}

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();


$(window).resize(function () {
    waitForFinalEvent(function(){			
			reInitAfterResize();
     // console.log('resize......');
    }, 10, "call function once only");
});

(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));