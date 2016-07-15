(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
	init: function(){
		var ui = require('./ui.js');
		var utils = require('./utils.js');

		ui.init();	
		utils.loadHistory(function(){
			console.log('historico carregado')
			ui.enable();
		});
	}
}
},{"./ui.js":2,"./utils.js":3}],2:[function(require,module,exports){
var chatbox = $('#chatbox'), header = chatbox.children('.header'), 
	body = chatbox.children('.body'), footer = chatbox.children('.footer');

module.exports = {
	init: function(){
		console.log('chat.ui.init()');
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
	},
	enable: function(){
		chatbox.removeClass('disabled');
	}
}
},{}],3:[function(require,module,exports){
module.exports = {
	loadHistory: function(callback){
		callback.call(this);
	}
}
},{}],4:[function(require,module,exports){
//alert('modulo!')
var main = function(){
	var chat = require('./catho_chat/chat.js');
	chat.init();
}
$(main);
},{"./catho_chat/chat.js":1}]},{},[4])