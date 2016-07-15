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