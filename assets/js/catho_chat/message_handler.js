/*
	Uma pequena feature pra trazer mais realismo na hora de inserir mensagens.
	Faz com que a mensagem apareça como lida e muda seu horário após um tempo.
*/

module.exports = function(lastMessage, time, isFromForm){
	var lM = lastMessage, lMH, lMThumb, lMStatus, lMTime;
	if(lM.length){
		lMH = lM.height();
		lMThumb = lM.find('.thumb');
		lMThumb.height(lMH);
		lMStatus = lM.find('.status');
		lMTime = lM.find('.time');
		setTimeout(function(){
			lMStatus.addClass('read');
		}, 2000);

		if(isFromForm){
			setTimeout(function(){
				lMTime.html('Enviado '+time)
			}, 8000);	
		}
		
	}
}