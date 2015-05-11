Feed.PostFeed = (function() {

	var TRANSITION_DURATION = 100;

	function PostFeed(container) {
		this.container = container;

		this.loadingElement = this.container.find('.feed-loading');
		this.pageElement = this.container.find('.feed-content');
		this.feedStore = new Feed.FeedStore();

		this.poststart = new Feed.CommentFeedController(
			this.container,
			this.container.find('.feed-form--textarea textarea'),
			this.feedStore
		);
	}

	PostFeed.fn = PostFeed.prototype;
	
	PostFeed.fn.run = function() {
		this.transition();
		this.poststart.init();
	};

	PostFeed.fn.transition = function() {
	    this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};

	return PostFeed;
})();