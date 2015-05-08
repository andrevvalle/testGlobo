Feed.CommentFeedController = (function() {
	// Set the Keyboard code for <enter>
	var ENTER_KEYCODE = 13;

	function CommentFeedController(container, textarea, store, socket) {
		this.container = $(container);
		this.textarea = textarea;
		this.submit = this.container.find('.feed-form');
		this.store = store;
		this.socket = socket;
		
		this.helpers = new Feed.Helpers(this.container, this.textarea);

		this.store.init(this.helpers, this.socket);
	}

	CommentFeedController.fn = CommentFeedController.prototype;
	
	CommentFeedController.fn.init = function() {
		this.loadPostFeed();
		this.textarea.on('keydown', $.proxy(this, 'onKeyDown'));
		this.submit.on('submit', $.proxy(this, 'onClickSend'));
	};

	CommentFeedController.fn.loadPostFeed = function() {
	    this.store.get();
	};

	CommentFeedController.fn.onKeyDown = function(event) {
		var text = this.textarea.val();

		if(text && event.which === ENTER_KEYCODE){
			event.preventDefault();

			this.createFeed(text);
		}
	};

	CommentFeedController.fn.onClickSend = function(event) {
		event.preventDefault();
		var text = this.textarea.val();

		this.createFeed(text);
	};

	CommentFeedController.fn.createFeed = function(text) {
		var textPost = $.trim(this.textarea.val());

		if(textPost.length === 0){
			this.helpers.textIsEmpty();
		}else{

			this.store.create(this.textarea, text);
		}

	};

	return CommentFeedController;
})();