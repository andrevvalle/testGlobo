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
		var socket = io('http://localhost:8080');

	    if (routeClass) {
	    	var route = new routeClass(this.container, socket);
	    	route.run();
	    }
	};
	
	return Application;
})();
