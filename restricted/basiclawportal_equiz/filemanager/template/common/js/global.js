var fixedPos = true ; 
var rightOffset;
var isIE = (navigator.appName.indexOf("Microsoft") > -1);
var isIE8 = false /*@cc_on || @_jscript_version == 5.8 @*/
;
var isIELower9 = false /*@cc_on || @_jscript_version <= 5.8 @*/
;
var isAndroid = (navigator.userAgent.toLowerCase().search('android') > -1);
var isIpad = checkIsIphoneIpad();
var isAndroid = checkIsAndroid();
var isMobile = (isIE) ? false : checkMobile();
var isTablet = Boolean(window.navigator.msPointerEnabled);
var ieVersion;
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
	ieVersion = new Number(RegExp.$1);
var d = document;

function checkIsIphoneIpad() {
	var pda_user_agent_list = new Array("iPhone", "iPod", "iPad" /*, "GTB"*/
		);

	var user_agent = navigator.userAgent.toString();
	for (var i = 0; i < pda_user_agent_list.length; i++) {
		if (user_agent.indexOf(pda_user_agent_list[i]) >= 0) {
			return true;
		}
	}

	return false;
}

function checkIsAndroid() {
	var pda_user_agent_list = new Array("Android");

	var user_agent = navigator.userAgent.toString();
	for (var i = 0; i < pda_user_agent_list.length; i++) {
		if (user_agent.indexOf(pda_user_agent_list[i]) >= 0) {
			return true;
		}
	}

	return false;
}

function checkMobile() {
	var pda_user_agent_list = new Array("2.0 MMP", "240320", "AvantGo", "BlackBerry", "Blazer",
			"Cellphone", "Danger", "DoCoMo", "Elaine/3.0", "EudoraWeb", "hiptop", "IEMobile", "KYOCERA/WX310K", "LG/U990",
			"MIDP-2.0", "MMEF20", "MOT-V", "NetFront", "Newt", "Nintendo Wii", "Nitro", "Nokia",
			"Opera Mini", "Opera Mobi",
			"Palm", "Playstation Portable", "portalmmm", "Proxinet", "ProxiNet",
			"SHARP-TQ-GX10", "Small", "SonyEricsson", "Symbian OS", "SymbianOS", "TS21i-10", "UP.Browser", "UP.Link",
			"Windows CE", "WinWAP", "Android", "iPhone", "iPod", /*"iPad", */
			"Windows Phone", "HTC" /*, "GTB", "Tablet PC"*/
		);
	var pda_app_name_list = new Array("Microsoft Pocket Internet Explorer");

	var user_agent = navigator.userAgent.toString();
	for (var i = 0; i < pda_user_agent_list.length; i++) {
		if (user_agent.indexOf(pda_user_agent_list[i]) >= 0) {
			return true;
		}
	}
	var appName = navigator.appName.toString();
	for (var i = 0; i < pda_app_name_list.length; i++) {
		if (user_agent.indexOf(pda_app_name_list[i]) >= 0) {
			return true;
		}
	}

	return false;
}

function backToTop() {
var win_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var scrolltop = $(window).scrollTop();
		var viewHeight = $(window).height();
		rightOffset = $('#content_wrap').offset().left;
		var maxTop = $('#hd_banner_wrap').offset().top;
		
		if(win_w > 767){
			if( ( (scrolltop + viewHeight ) > $('#footer_zone').offset().top ) && !fixedPos && win_w > 767){
				rightOffset = 0;
				$('#backtotop').css({'position':'absolute'});																						
				fixedPos = true;
			}
			else if( ( (scrolltop + viewHeight) < $('#footer_zone').offset().top) && fixedPos)
			{		
				$('#backtotop').css({'position':'fixed', 'opacity':1});
				fixedPos = false ;																											
			}	
			else{
				$('#backtotop').css({'position':'absolute'});	
				$('#backtotop').css({'opacity':1});
			}
		}
		else if(win_w < 767){
			$('#backtotop').css({'position':'fixed', 'opacity':1});	
		}
		if( scrolltop <= maxTop) 	$('#backtotop').fadeOut(500);
		else $('#backtotop').fadeIn(500);		
}

function resetbackToTop(){
	var win_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var scrolltop = $(window).scrollTop();
			var viewHeight = $(window).height();
			rightOffset = $('#content_wrap').offset().left;
			var maxTop = $('#hd_banner_wrap').offset().top;
			if(win_w > 767){
				if( ( (scrolltop + viewHeight ) > $('#footer_zone').offset().top ) && !fixedPos){
					rightOffset = 0;
					$('#backtotop').css({'position':'absolute'});
					fixedPos = true;
				}
				else if( ( (scrolltop + viewHeight  ) < $('#footer_zone').offset().top) && fixedPos ){			
					$('#backtotop').css({'position':'fixed','opacity':1});
					fixedPos = false ;	
				}

			}
			else if(win_w < 767){
				$('#backtotop').css({'position':'fixed', 'opacity':1});		
			}
				
			if( scrolltop <= maxTop) 	$('#backtotop').fadeOut(500);
			else $('#backtotop').fadeIn(500);
}

function generateSearchResult(query){
	var html = '';
	var iconClass = '';
	var iconAlt = [];
	html += '<ul>';
	$.ajax({
		type: "GET",
		dataType: "json",
		url: currentPathLang+'searcher.ashx?kw='+query,
		async: false,
		success: function(data){
			//console.log(data.length);
			/* if(isMobile){
				if(records.length>=20){
					var loopLength = 20;
				}else{
					var loopLength = records.length;
				}
			}else{ */
			//}
			html += '<p>關鍵字: '+decodeURIComponent(query);
			html += '<br>搜尋結果 (其'+data.length+'個搜尋結果)</p>';
			html += '<table cellpadding="0" cellspacing="0" class="tbl_whatsnew">';
			html += '<tr>';
			html += '	<th>標題</th>';
			html += '	<th>網址</th>';
			html += '</tr>';
			if(data.length>0){
				$.each(data, function(i, item){
					html += '<tr><td class="no_wrap">'+item.Title+'</td><td><a href="'+item.URL+'">' + item.URL + '</a><br/>'+item.HTML.substring(0, 100)+' ...</td></tr>';
				});
			}else{
				html += '<tr><td colspan="2">沒有結果</td></tr>';
			}
			html += '</table>';
  			/* $.each(data, function(i, item){
				html += '<tr valign="top"><th>'+item.date_day+'.'+item.date_month+'.'+item.date_year+'</th><td><a href="'+item.url+'" target="'+item.target+'">'+item.title+'</a></td></tr>';
			}); */
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			console.log('generateHomeDirectorsNotes error' + currentPathLang+'searcher.ashx?kw='+query, XMLHttpRequest, textStatus, errorThrown);
		}
	});
	$('#searchResult_wrap').html('');
	$('#searchResult_wrap').html(html);
}

function initMainNav(){
	$('ul#main_nav').children('li').each(function(index){
		/* click version for ipad */
		if (!isIE && (isIpad || isAndroid)) {
			$(this).children('a').click(function () {
				$(this).parent('li').siblings('li').removeClass('active');
				$(this).parent('li').siblings('li').children('.pulldown').stop(true, true, true).fadeOut(500);
				if (!$(this).parent('li').hasClass('active')) {
					var pos = $(this).parent('li').position();
					$(this).parent('li').addClass('active');
					$(this).siblings('.pulldown').stop(true, true, true).fadeIn(500);
				} else {
					$(this).parent('li').removeClass('active');
					$(this).siblings('.pulldown').stop(true, true, true).fadeOut(500);
				}
			});
		} else {
			$(this).hover(function () {
				var pos = $(this).position();
				$(this).addClass('active');
				$(this).children('.pulldown').stop(true, true, true).fadeIn(500, function(){
					$(this).siblings('a').css('background-color','#efc337');
				});
			}, function () {
				$(this).removeClass('active');
				$(this).children('.pulldown').stop(true, true, true).fadeOut({
					duration:500,
					start:function(){
						$(this).siblings('a').css('background-color','');
					}
				});
			});
		}
	});
}

function initSubNavWidth(){
	$('ul#main_nav > li').find('li').each(function(index){
		$(this).css('width',$(this).parents('li').width());
	});
}

function initMobileNav(){
	/* $('#mobile_menu_btn').children('a').click(function(){
		if(!$(this).hasClass('opened')){
			$(this).addClass('opened');
			$('#mobile_nav_wrap').stop().slideDown(500);
		}else{
			$(this).removeClass('opened');
			$('#mobile_nav_wrap').stop().slideUp(500);
		}
	}); */
	$('ul#mobile_nav').find('li.hasSub > a').each(function(){
		$(this).click(function(){
			//if($(this).hasClass('hasChild')){
				if(!$(this).parent('li').hasClass('opened')){
					$(this).siblings('ul').stop().slideDown();
					$(this).parent('li').addClass('opened');
					$(this).parent('li').siblings('li').find('li').removeClass('opened');
					$(this).parent('li').siblings('li').find('li').children('ul').stop().slideUp();
					$(this).parent('li').siblings('li').removeClass('opened');
					$(this).parent('li').siblings('li').children('ul').stop().slideUp();
				}else{
					$(this).parent('li').find('li').removeClass('opened');
					$(this).parent('li').find('li').children('ul').stop().slideUp();
					$(this).siblings('ul').stop().slideUp();
					$(this).parent('li').removeClass('opened');
				}
			//}
		});
	});
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}