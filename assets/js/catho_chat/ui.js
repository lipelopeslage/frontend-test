var message_handler = require('./message_handler.js');

var chatbox = $('#chatbox'), header = chatbox.children('.header'), 
	body = chatbox.children('.body'), footer = chatbox.children('.footer'), 
	history = body.children('.history'), form = footer.find('form');

var scrollChat = function(lastMessage){
	body.scrollTop(history.height());
}

var validateMessage = function(){
	var textArea = form.get(0).message, text = textArea.value, json = {};
	
	if(text.length){
		json = {
			user: {
				id: 9483484,
				name: 'Nome do Candidato'
			},
			message: {
				time: new Date().getTime(),
				message:text
			}
		};
		this.sendMessage(json, true);
		textArea.value = '';
	}
	return false;
}

var inputFocus = function(){
	if(this.value != '')
		$(this).parent().parent().addClass('writing');
}

var inputBlur = function(){
	$(this).parent().parent().removeClass('writing');
}

var controlHandler = function(){
	var type = $(this).attr('class');
	switch(type){
		case 'min':
			chatbox.addClass('minimized');
		break;
		case 'res':
			chatbox.removeClass('minimized');
		break;
		case 'cl':
			chatbox.parent().remove();
	}
}

var resizeHandler = function(){
	var win = $(this), winW = win.width(), winH = win.height(), headerH = header.outerHeight(), 
		footerW = footer.width(), footerH = footer.outerHeight();
	
	if(winW < 768) 
		body.height(winH - (headerH+footerH));
	else
		body.height(409);

	footer.find('textarea').width(footerW - 22);
}

module.exports = function(utils){
	$(window).resize(resizeHandler).trigger('resize');
	chatbox.css('visibility', 'visible');

	return {
		sendMessage: function(json, isFromFor){
			var lastMessage = history.children().last(), newMessage;
			if(lastMessage.length > 0){
				if(parseInt(lastMessage.attr('data-id')) == json.user.id){
					lastMessage.append(utils.theMessage(json, null, true, isFromFor));
				}
				else{
					history.append(utils.createInput(json, isFromFor));
				}
			}else{
				history.append(utils.createInput(json, isFromFor));
			}
			newMessage = history.children().last();
			message_handler(newMessage, utils.theDate(json.message.time), isFromFor);
			scrollChat(newMessage);
		},
		enable: function(){
			var textarea = form.submit(validateMessage.bind(this)).find('textarea'), 
				controls = header.find('.controls');
			
			controls.find('button').click(controlHandler);
			
			textarea.removeAttr('disabled')
			.focusin(inputFocus).blur(inputBlur)
			.keyup(inputFocus).focus();

			setTimeout(function(){
				chatbox.removeClass('disabled');
			}, 100);
		}
	}
}