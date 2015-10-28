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
		if (o.beta > 25 && o.beta < 90 || o.beta < -25 && o.beta > -90) {
			nowScrollTop = $(document).scrollTop();
			nowScrollTop += o.beta;
			if (nowScrollTop > maxScroolTop) {
				nowScrollTop = maxScroolTop;
			}
			if (nowScrollTop < 0) {
				nowScrollTop = 0;
			}
			$(document).scrollTop(nowScrollTop);
		}
	});
	
	plus.accelerometer.watchAcceleration(function(a) {
		xisResult = a.xAxis*a.xAxis + a.yAxis*a.yAxis + a.zAxis*a.zAxis;
		if (xisResult > 150) {
			volume = plus.device.getVolume();
			volume *= xisResult / 100;
			volume = volume > 1 ? 1 : volume;
			plus.device.setVolume(volume);
			mui.toast('当前音量'+ toDecimal(volume));
		} else {
			plus.device.setVolume(0.2);
		}
	}, function(e) {
		alert("获取加速度信息失败" + e.message ); 
	});
	
}