

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