var langs = new Array('en', 'tc', 'sc');
var langCaption = new Array('English', '繁體中文', '簡体中文');
var lang = '';
var langSearch = '';
function Menu() {
	this.contentId = 0;
	this.alt = "";
	this.mDisplay = "";
	this.href = "";
	this.hrefTextOnly = "";
	this.target = "";
	this.folder = "";
	this.Class = "";
	this.aClass = "";
	this.divClass = "";
	this.menuItem="";
	this.ulID = '';
	this.ulClass = '';
	this.extraHTML="";
	this.childs = new Array();
	this.addChild = function(m) {
		this.childs[this.childs.length] = m;
	}
}

for(var counter=0; counter<langs.length; counter++){
	if(location.href.toString().search('/'+langs[counter]+'/')!=-1){
		lang = langs[counter];
		
	}
}
if(lang==''){
	var temp = 1;
	if (location.href.indexOf("lang=")>0) {
		temp = location.href.match(/lang=\d+/)[0];
		temp = temp.replace('lang=','') - 1;
	}
	lang = langs[temp];
	var currentSection = '';
}else{
	var theEval = eval('/'+lang+'\\/[a-zA-Z0-9\_]+/');
	var currentSection = location.href.toString().match(theEval)[0].replace(lang+'/','');
}
try{
	var currentRootSection = zmsCurrentContentId;
	if(zmsParentContentId!=''){
		currentRootSection = zmsParentContentId.match(/\d+,$/)[0].replace(',','');
	}
	
}catch(e){
}

function getPath(){
	var langs = ['en', 'tc', 'sc'];
	var currentLang = langs[0];
	for(x in langs){
		if(location.href.search("/"+langs[x]+"/")!=-1){
			currentLang = langs[x];
		}
	}
	//alert(location.href.substr(0, location.href.search('/'+currentLang+'/')));
	return [location.href.substr(0, location.href.search('/'+currentLang+'/')), currentLang];
}


var temp = getPath();
var currentPath = temp[0];
if (currentPath == "")
	currentPath = "/clcplus/BLP"; // for basic law portal only
var currentLang = temp[1];
var currentPathLang = temp[0] + '/' + temp[1] + '/';
//var zmsCharsetID = langs.indexOf(currentLang) + 1;

function SwitchLang(charsetID){
	var url = window.location.toString();
	var isStaticURL = false;
	var langPaths = new Array("en", "tc", "sc");
	var oldLangPath = "";

	// Check url type (is static page or dynamic page)
	for (i=0; i < langPaths.length; i++){
		if (url.indexOf("/"+langPaths[i]+"/") != -1){
			oldLangPath = "/"+langPaths[i]+"/";
			isStaticURL = true;
			break;
		}
	}

	if (isStaticURL){
		var path;
		path = window.location.href;
		window.location = path.replace(oldLangPath, "/"+langPaths[charsetID - 1]+"/");
	}else{
		if (url.indexOf("lang=") != -1){
			window.location = 
				url.replace(/lang=\d/, "lang="+charsetID);
		}
	}
}

function mobileSwitch(){
  var url = window.location.toString();
  if (url.indexOf(".as"+"px") != -1){
    // dynamic
    if (url.indexOf("textonly=") != -1){
      window.location = url.replace(/textonly=\w*/, "textonly=true");
    }else{
      window.location = url + "&textonly=true";
    }
  }else{
    // static
//    window.location = url.replace(/\/index/, "/index_t");
    window.location = url.replace(/\.htm/, "_m.ht"+"m");
  }
}

function textSwitch(){
  var url = window.location.toString();
  if (url.indexOf(".as"+"px") != -1){
    // dynamic
    if (url.indexOf("textonly=") != -1){
      window.location = url.replace(/textonly=\w*/, "textonly=true");
    }else{
      window.location = url + "&textonly=true";
    }
  }else{
    // static
//    window.location = url.replace(/\/index/, "/index_t");
    window.location = url.replace(/\.htm/, "_t.ht"+"m");
  }
}

function graphicSwitch(){
  var url = window.location.toString();
  if (url.indexOf(".as"+"px") != -1){
    // dynamic
    if (url.indexOf("textonly=") != -1){
      window.location = url.replace(/textonly=\w*/, "textonly=false");
    }else{
      window.location = url + "&textonly=false";
    }
  }else{
    // static
//    window.location = url.replace(/\/index_t/, "/index");
    window.location = url.replace(/_m.htm/, ".ht"+"m");
  }
}

/* FontSize */
var currFontSize = getCookie('blaw_pagesizes');
currFontSize = currFontSize.replace("=","");
if(currFontSize==''){currFontSize = "txt_middle";}
var sizeKeyWords = [
	{classname:'txt_small', caption:'Small'},
	{classname:'txt_middle', caption: 'Mid'}, 
	{classname:'txt_large', caption: 'Large'}
];

function loadFontSize() {
	var currFontSize = getCookie('blaw_pagesizes');
	currFontSize = currFontSize.replace("=","");
	if(currFontSize==''){currFontSize = "txt_middle";}
	var index=1;
	for(var i in sizeKeyWords){
		if(sizeKeyWords[i].classname==currFontSize){	index=i;	break;	}
	}
	changeFontSize(parseInt(index)+1, true);
}

function changeFontSize(index, isPageStart){
//	if(! isPageStart){
		for(var i in sizeKeyWords){
			var ClassName = sizeKeyWords[i].classname;
			if(i==index-1){
				$('.sizecontrol').addClass(ClassName+'_size');
				$('.size_wrap a.'+ClassName).addClass('selected');
			}else{
				$('.sizecontrol').removeClass(ClassName+'_size');
				$('.size_wrap a.'+ClassName).removeClass('selected');
			}
		}
	 // if(! isPageStart){
//		init();
	//}
//		resizeBottom();
//	}
	setCookie('blaw_pagesizes', sizeKeyWords[index-1].classname, 365);
}

function getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}
function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	deleteCookie(c_name);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/");
}

function deleteCookie(c_name) {
	if (getCookie(c_name))	document.cookie = c_name + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
}

function jumpLink(toLink, jSection){
	location.href = currentPathLang+toLink+"/index.ht"+"ml";
	bmove(jSection);
}

function getURLParameter(name) {
    return decodeURIComponent(
		(location.search.toLowerCase().match(RegExp("[?|&]" + name + '=(.+?)(&|$)')) || [, null])[1]
	);
}

function configureRevisionDate(){
	// For all content page(s) earlier than: dateOfPageToReview
	var dateOfPageToReview = new Date(2013,11,4);	/* (YYYY, [0-11], [1-31]) */
	// Apply new Review Date: newReviewDate
	var newReviewDate = new Date(2013,11,4);	/* (YYYY, [0-11], [1-31]) */

	if (typeof(reviewDateExists) != "undefined" && reviewDateExists){
		var placeHolder = $('.review');
		var divDate = document.getElementById("div_reviewdate");
		// Start: Override by newReviewDate
		if (dateOfPageToReview>new Date(reviewDate_Year,reviewDate_Month-1,reviewDate_Day)) {
			reviewDate_Year = newReviewDate.getFullYear();
			reviewDate_Month = newReviewDate.getMonth()+1;
			reviewDate_Day = newReviewDate.getDate();
			placeHolder = $('.review');
			divDate = document.getElementById("div_reviewdate");
		}
		// End: Override by newReviewDate
		if (placeHolder != null && divDate != null){
			divDate.innerHTML = loadDateString(reviewDate_Year, reviewDate_Month, reviewDate_Day);
			placeHolder.css('display','block');
		}
	}
	if (typeof(revisionDateExists) != "undefined" && revisionDateExists){
		var placeHolder = $('.revision');
		var divDate = document.getElementById("div_revisiondate");
		// Start: Override by newReviewDate
		if (dateOfPageToReview>new Date(revisionDate_Year,revisionDate_Month-1,revisionDate_Day)) {
			revisionDate_Year = newReviewDate.getFullYear();
			revisionDate_Month = newReviewDate.getMonth()+1;
			revisionDate_Day = newReviewDate.getDate();
			placeHolder = $('.revision');
			divDate = document.getElementById("div_revisiondate");
		}
		// End: Override by newReviewDate
		if (placeHolder != null && divDate != null){
			divDate.innerHTML = loadDateString(revisionDate_Year, revisionDate_Month, revisionDate_Day);
			placeHolder.css('display','block');
		}
	}
}

function loadDateString(yyyy, mm, dd){
	//switch ((zmsCharsetID%3)){
	switch (currentLang){
		case 'en':
			var monthName = new Array("", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
			return dd+" "+monthName[mm]+" "+yyyy;
			//return dd+"/"+mm+"/"+yyyy;
			break;
		case 'tc':
			return yyyy+"年"+mm+"月"+dd+"日";
			//return dd+"/"+mm+"/"+yyyy;
			break;
		case 'sc':
			return yyyy+"年"+mm+"月"+dd+"日";
			//return dd+"/"+mm+"/"+yyyy;
			break;
	}
}

function search(search_from){
	//var query = document.getElementById("query").value;
	if(search_from=='from_d')
		var query = $('#header_zone input[name="search"]').val();
	else
		var query = $('#mobile_menu_layer input[name="search"]').val();
	if (query=='') {
		if (currentLang == "en"){
			alert('Please enter search keyword.');
		} else if (currentLang == "tc"){
			alert('請輸入查詢字串.');
		} else {
			alert('请输入查询字串.');
		}
	} else {
		doSearch(query, false);
	}
}

function doSearch(keyword, isCirculars){
/*	var isTextOnly = false;

	if (window.location.toString().indexOf("/index_t") >= 0
			|| window.location.toString().indexOf("textonly=true") >= 0){
		isTextOnly = true;
	}*/

	//var url = "http://search.gov.hk/search.html?";
	var url = currentPathLang + "search/index.html?";
	/* url += "tpl_id=stdsearch&";
	url += "gp0=blaw_home&";
	if (isCirculars){
		url += "gp1=blaw_circulars&";
		url += "a_submit=true&";
	}else{
		url += "gp1=blaw_home&";
	}
	url += "ui_charset=utf-8&";
	url += "web=this&";
	if (currentLang == "en"){
		url += "ui_lang=en&";
	}else if (currentLang == "tc"){
		url += "ui_lang=zh-hk&";
	}else if (currentLang == "sc"){
		url += "ui_lang=zh-cn&";
	} */
/*	if (isTextOnly){
		url += "txtonly=1&";
	}*/
	url += "kw=" + encodeURIComponent(keyword);
	location.href=url;
}
//loadFontSize();

function isPopUp(str){
	var result = str;
	if(str.search('javascript:')!=-1){
		result = '#" onclick="'+str+'';
	}else if(str.search('http:')!=-1){
		result = result;
	}else{
//		result = currentPath.replace(/\/$/, '') + result;
		result = currentPath + result;
	}
	return result;
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

function isDescendant(parent, child) {
	var node = child.parentNode;
	while (node != null) {
		if (node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}