Feed.FeedStore = (function() {
	function FeedStore() {
		this.storage = {};
		this._id = "";
		this.helpers = "";
	}

	FeedStore.fn = FeedStore.prototype;

	FeedStore.fn.init = function(helpers, socket) {
	    this.helpers = helpers;
	    this.socket = socket;
	};
	
	FeedStore.fn.create = function(textarea, text) {
		var dateActualy = new Date();
		var passPretty = dateActualy.getFullYear() + '-' + this.helpers.addLeadingChars(dateActualy.getMonth() + 1) + '-' + dateActualy.getDate() + ' ' + dateActualy.getHours() + ':' + dateActualy.getMinutes() + ':' + dateActualy.getSeconds();

		var data = {
			body: text,
			author: {
				"name": "Produção Bem Estar " + Math.floor((Math.random() * 100) + 1),
				"avatar": "https://graph.facebook.com/100007906810529/picture"
			},
			createdAt: passPretty,
			status: "published",
			images: [],
			videos: []
		}

		this.socket.emit('createPost', data);
		this.socket.on('createClient', function(msg){
			console.log(msg);
		});
		// var deferred = $.Deferred();
		// var response = $.ajax({
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	url: '/postfeed/' + this._id,
		// 	headers: {"X-HTTP-Method-Override": "PUT"},
		// 	data: data
		// });


		// response.done(function(payload, status, xhr){
		// 	textarea.val('');
			
		// 	this.socket.on('createPost', function(data){
		// 		// io.emit('createPost', msg);
		// 		console.log(this.helpers, 'test')
		// 		this.helpers.onPush(data);
		// 	}.bind(this));

		// }.bind(this));

		// response.fail(function(xhr){
		// 	deferred.reject(xhr.responseJson.errors, xhr);
		// }.bind(this));

		// return deferred.promise();
	};

	FeedStore.fn.get = function() {
	    var deferred = $.Deferred();

		var response = $.ajax({
			url: '/postfeed',
			type: 'GET',
			dataType: 'json'
		});

		response.done(function(payload){
			this._id = payload[0]._id;
			posts = payload[0].postList;
			posts.forEach(function(element, index){

				var data = {
					body: element.body,
					author: {
						"name": element.author.name,
						"avatar": element.author.avatar === "" ? element.author.avatar = "public/images/avatar.png" : element.author.avatar
					},
					createdAt: element.createdAt,
					status: element.status,
					images: element.images !== undefined ? element.images : [],
					videos: element.videos !== undefined ? element.videos : []
				}

				this.helpers.onPush(data);
			}, this);

		}.bind(this));

		response.fail(function(xhr){
			deferred.reject(xhr.responseJson.errors, xhr);
		}.bind(this));

		return deferred.promise();
	};

	return FeedStore;
})();
