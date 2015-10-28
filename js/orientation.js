/**
 * 方向感知
 */

var nowScrollLeft;


// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener( "plusready", onPlusReady, false );
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady() {
	
	plus.orientation.watchOrientation(function(o) {
		maxScroolLeft = $(document).width() - $(window).width();
		maxScroolTop = $(document).height() - $(window).height();
		if (o.gamma > 25 && o.gamma < 90 || o.gamma < -25 && o.gamma > -90) {
			nowScrollLeft = $(document).scrollLeft();
			nowScrollLeft += o.gamma;
			if (nowScrollLeft > maxScroolLeft) {
				nowScrollLeft = maxScroolLeft;
			}
			if (nowScrollLeft < 0) {
				nowScrollLeft = 0;
			}
			$(document).scrollLeft(nowScrollLeft);
		}
	}); 
}