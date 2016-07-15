require('./polyfills.js');
var main = function(){
	var chat = require('./catho_chat/chat.js');
	chat.init();
}
$(main);
