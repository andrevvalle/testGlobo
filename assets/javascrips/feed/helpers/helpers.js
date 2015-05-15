Feed.Helpers = (function() {
	function Helpers(container, textarea) {
		this.container = container;
		this.textarea = textarea;
	}

	Helpers.fn = Helpers.prototype;
	
	Helpers.fn.prettyDate = function(time) {
		/*
			* JavaScript Pretty Date
			* Copyright (c) 2011 John Resig (ejohn.org)
			* Licensed under the MIT and GPL licenses.
		*/
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);

		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return;
				
		return day_diff == 0 && (
				diff < 60 && "Há menos de um minuto" ||
				diff < 120 && "Há um minuto" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutos atrás" ||
				diff < 7200 && "Há uma hora" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " horas atrás") ||
			day_diff == 1 && "Há um dia" ||
			day_diff < 7 && day_diff + " dias atras" ||
			day_diff < 31 && Math.ceil( day_diff / 7 ) + " semanas atrás";
	};

	Helpers.fn.addLeadingChars = function(string, nrOfChars, leadingChar) {
		string = string + '';
		return Array(Math.max(0, (nrOfChars || 2) - string.length + 1)).join(leadingChar || '0') + string;
	};

	Helpers.fn.textIsEmpty = function() {
	    this.alertError = this.container.find('.alert-error');

	    this.textarea.addClass('fi-error');
	    this.alertError.html('O campo precisa ser preenchido.');
	    this.alertError.fadeIn();

	    var fadeOutClear = setTimeout(function() {
	    	this.alertError.fadeOut(400);
	    	this.textarea.removeClass('fi-error');
	    	clearTimeout(fadeOutClear);
	    }.bind(this), 3000);
	};

	Helpers.fn.onPush = function(data) {
		var html = "";
		
		this.prettyDate(data.createdAt) == undefined ? this.prettyDateAt = "Mais de um ano" : this.prettyDateAt = this.prettyDate(data.createdAt);

		if(data.videos[0] !== undefined){
			html = Feed.templates.postfeed({author: data.author.name, avatar: data.author.avatar, videopost: { url: data.videos[0].thumb }, text: data.body, time: this.prettyDateAt});
		}else if(data.images[0] !== undefined){
			html = Feed.templates.postfeed({author: data.author.name, avatar: data.author.avatar, imagepost: { url: data.images[0].croppedUrl }, text: data.body, time: this.prettyDateAt});
		}else{
	    	html = Feed.templates.postfeed({author: data.author.name, avatar: data.author.avatar, text: data.body, time: this.prettyDateAt});
		}

		$('.loaderPost').hide();
	    $('.feed-posts--list').prepend(html);
	};

	return Helpers;
})();
