module.exports = {
	init: function(){
		var utils, ui, html,
		
		html = '<div id="chatbox-holder"><div id="chatbox" class="disabled"><div class="header"><div class="title">Vaga: Desenvolvedor Front-end</div><div class="controls"><button class="min">Minimizar</button><button class="res">Restaurar</button><button class="cl">Fechar</button></div></div><div class="body"><div class="history"></div></div><div class="footer"><form><fieldset><textarea disabled name="message" placeholder="Digite aqui sua mensagem..."></textarea></fieldset><button type="submit">Enviar</button><button type="reset">Limpar</button></form></div></div></div>';
		
		$('body').append(html);
		
		utils = require('./utils.js');
		ui = require('./ui.js')(utils);
		
		utils.loadHistory(function(res){
			res.map(function(talk){
				ui.sendMessage(talk);
			});
			ui.enable();
		});
	}
}