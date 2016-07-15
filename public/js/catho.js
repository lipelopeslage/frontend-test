(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


$(window).resize(function(){
	var win = $(this), winW = win.width(), winH = win.height(), chatbox = $('#chatbox'), 
		header = chatbox.children('.header'), body = chatbox.children('.body'), 
		footer = chatbox.children('.footer');

	console.log(winH, header.outerHeight(), footer.outerHeight())

	if(winW < 768) 
		body.height(winH - (header.outerHeight()+footer.outerHeight()))
	else
		body.height('auto');

	footer.find('textarea').width(footer.width() - 22)
	.keyup(function(){
		$(this).parent().parent().addClass('writing');
	}).blur(function(){
		$(this).parent().parent().removeClass('writing');
	})
	
}).trigger('resize');

$('#chatbox').css('visibility', 'visible');
},{}],2:[function(require,module,exports){
//alert('modulo!')
var main = function(){
	require('./chat.js');
}
$(main);
},{"./chat.js":1}]},{},[2])