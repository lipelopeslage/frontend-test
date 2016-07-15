var showError = function(){
	alert('erro ao carregar conversa');
}

module.exports = {
	loadHistory: function(callback){
		$.get('/static/json/talk.json')
		.done(function(res){
			if(res.statusRequest == true)
				callback.apply(this, [res.talkMessages]);	
			else
				showError();
		})
		.fail(showError);		
	},
	theMessage: function(json, type, isAppend, isFromForm){
		var company = (type == 'clerk') ? '<strong>'+json.company.name+'</strong>' : '',
			str = '', status = (json.message.alreadyRead == true) ? 'read' : '',
			time = (!isFromForm) ? module.exports.theDate(json.message.time) : ' a poucos segundos';

		str += '<span class="message"><span class="content">';
		str += '<span class="text">'+json.message.message+'</span>';
		str += '<span class="from">';
		if(!isAppend){
			str += '<span class="name">'+json.user.name+company+'</span>';
		}
		str += '<span class="time">Enviado '+time+'</span>';
		str += '</span><span class="status '+status+'"></span>';
		str += '</span></span>';
		return str;
	},
	theDate: function(date){
		var d = new Date(date);
		return d.format();
	},
	createInput: function(json, isFromForm){
		var html = '', thumb = '', type = (json.hasOwnProperty('company')) ? 'clerk' : 'client';

		html = '<p class="input '+type+' " data-id="'+json.user.id+'">';
		html += '<span class="thumb"><img src="/static/res/img/'+type+'_thumb.jpg" alt="Avatar de '+json.user.name+'"></span>';
		html += module.exports.theMessage(json, type, false, isFromForm);
		html += '</p>';
		return html;
	}
}