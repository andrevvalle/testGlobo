Feed.Application = (function() {
	function Application(container) {
		
		this.container = $(container);
		this.routes = {
			'/': Feed.PostFeed
		}
	}

	Application.fn = Application.prototype;

	Application.fn.run = function(location) {
	    var routeClass = this.routes[location.pathname];

	    if (routeClass) {
	    	var route = new routeClass(this.container);
	    	route.run();
	    }
	};
	
	return Application;
})();
