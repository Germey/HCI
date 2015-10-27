var initPosX, initPoxY;
var initWidth, initHeight;
var pic = $("#mainpic");
var initialScale = 1;
var currentScale = 1;


$(function() {
	init();
});

function init() {
	var height = $(window).height();
	pic.height(height);
	initWidth = pic.width();
	initHeight = pic.height();
	initPosX = pic.position().left;
	initPoxY = pic.position().top;
}


/**
 * 单击双击
 */

touch.on(pic, 'tap', function(ev) {
	currentScale *= 2;
	currentScale = currentScale > 5 ? 5 : currentScale;
	$(this).removeClass("img-trans");
	$(this).width(initWidth * currentScale);
	$(this).height(initHeight * currentScale);
});

touch.on(pic, 'doubletap', function(ev){
	currentScale /= 2;
	currentScale = currentScale < 1 ? 1 : currentScale;
	$(this).removeClass("img-trans");
	$(this).width(initWidth * currentScale);
	$(this).height(initHeight * currentScale);
});


/**
 * 	放缩手势
 */

touch.on(pic, 'pinchin', function(ev){
	currentScale = ev.scale - 1;
	currentScale = initialScale + currentScale;
	currentScale = currentScale < 1 ? 1 : currentScale;
	this.style.webkitTransform = 'scale(' + currentScale + ')';
});

touch.on(pic, 'pinchout', function(ev) {
	currentScale = ev.scale - 1;
	currentScale = initialScale + currentScale;
	currentScale = currentScale > 5 ? 5 : currentScale;
	this.style.webkitTransform = 'scale(' + currentScale + ')';
});

touch.on(pic, 'pinchend', function(ev){
	initialScale = currentScale;
});


/**
 * 长按手势
 */

touch.on(pic, 'hold', function() {
	pic.width(initWidth);
	pic.height(initHeight);
	pic.position().left = initPosX;
	pic.position().top = initPoxY;
});

/**
 * 拖拽手势
 */
/*
var dx, dy;

touch.on(pic, 'drag', function(ev){
	dx = dx || 0;
	dy = dy || 0;
	var offx = dx + ev.x + "px";
	var offy = dy + ev.y + "px";
	this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
});

touch.on(pic, 'dragend', function(ev){
	dx += ev.x;
	dy += ev.y;
});
*/



/**
 * 语音识别
 */


var voicePic = $(".voice img");
var voiceOn = 0;
var imgPath = "images/";
var voiceOffImg = imgPath + "voiceoff.png";
var voiceOnImg = imgPath + "voiceon.png";
var nowLeft = 0;
var nowTop = 0;

function hasContent(voiceResult, target) {
	if (voiceResult.toString().indexOf(target) > -1) {
		return true;
	} else {
		return false;
	}
}

function handleVoice(voiceResult) {
	nowLeft = $(document).scrollLeft();
	nowTop = $(document).scrollTop();
	if (hasContent(voiceResult, "右")) {
		$(document).scrollLeft(nowLeft + 100);
	}
	if (hasContent(voiceResult, "左")) {
		$(document).scrollLeft(nowLeft - 100);
	}
	if (hasContent(voiceResult, "上")) {
		$(document).scrollTop(nowTop - 100);
	}
	if (hasContent(voiceResult, "下")) {
		$(document).scrollTop(nowTop + 100);
	}
	//alert($(document).scrollLeft());
	
}

function startRecognize() {
	var options = {};
	options.engine = 'iFly';
	plus.speech.startRecognize(options, function(s) {
		handleVoice(s);
	}, function(e) {
		alert("没有听清你在说什么");
	});
}

voicePic.on("click", function() {
	if ($(this).attr("src") == voiceOffImg) {
		voiceOn = 1;
		$(this).attr("src", voiceOnImg);
		startRecognize();
	} else if ($(this).attr("src") == voiceOnImg) {
		voiceOn = 0;
		$(this).attr("src", voiceOffImg);
	}
});

