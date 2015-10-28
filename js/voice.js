/**
 * 控制声音的播放
 */

/*
var bird = document.getElementById('bird');
var people = document.getElementById('people');
var taojia = document.getElementById('taojia');
var water = document.getElementById('water');
var wind = document.getElementById('wind');
var xiqu = document.getElementById('xiqu');

var audios = [bird, people, taojia, water, wind, xiqu];

function setAllPaused() {
	$.each(audios, function(n, ele) {    
		ele.pause();                  
	});
}

function setAllPlayed() {
	$.each(audios, function(n, ele) {    
		ele.play();
	});
}

function setAllHidden() {
	$.each(audios, function(n, ele) {    
		ele.removeAttribute('controls');
	});
}


setAllHidden();
*/

var p = null; 
function startPlay(name) {
	if (plus.audio == undefined) {
		alert("Device not ready!");
	}
	p = plus.audio.createPlayer("wav/" + name + ".wav");
	p.play(function() {
		
	}, function(e) {
		alert("音频播放失败：" + e.message); 
	}); 
}
function stopPlay() {
	p.stop();
}
