var http = require('http');
var router = require('./router');

// -------------------------------------------------------------- 
//  Create a web server, pass the arguments to the callback
// -------------------------------------------------------------- 

http.createServer(function(request, response) {
	router.home(request, response);										// Handle the requests for home page
	router.lorem(request, response);									// Handle the requests for lorem ipsum generation
}).listen(8000); 														// Server listening on port 8000

console.log('Listening on port 8000...');

