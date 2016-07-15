(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
	init: function(){
		this.check(function(){
			var utils, ui, html;

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
		});		
	},
	check: function(callback){
		if(!window.jQuery){
			console.error('Este chat precisa de jQuery para funcionar corretamente!');
		}else{
			callback.call(this);
		}
	}
}
},{"./ui.js":3,"./utils.js":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./message_handler.js":2}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
require('./polyfills.js');
var main = function(){
	var chat = require('./catho_chat/chat.js');
	chat.init();
}
window.onload = main;
},{"./catho_chat/chat.js":1,"./polyfills.js":6}],6:[function(require,module,exports){
/*
  Polyfill pessoal
*/
if(!Date.prototype.format){
  Date.prototype.format = function(){
    return ' as '+this.getHours()+'h'+this.getMinutes();
  }
}


/*-------------------------------------------*/

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    //  1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

/*-------------------------------------------*/

/*
	https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
*/

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
},{}]},{},[5])