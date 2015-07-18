var renderer = require('./renderer'),										// renderer module generate dynamic html content
	querystring = require('querystring'),									// module contains methods to parse message body
	loremipsum = require('./lorem');										// module to generate the lorem ipsum text


function home(request, response) {	
	if (request.url === '/') {												// The home page will have the url '/'	
		if (request.method.toLowerCase() === 'get') {						// if the method is GET (default method is GET )
			response.writeHead(200, {'Content-Type':'text/html'}); 			// set content-type and status code in response header
			renderer.view('header', {}, response);							// Render the header part from the view templates
			renderer.view('footer', {}, response);							// Render the footer part from the view templates
			response.end();													// End the http response
		}
	}
}

function lorem(request, response)
{
	if (request.url === '/') {												// The home page will have the url '/'
		if (request.method.toLowerCase() === 'post') {						// if the method is POST (triggered on form submission)
			var loremOptions = {};											// to store lorem ipsum generator options
			var values = {};												// to store values for renderer to merge & generate view
			var postBody = '';												// to store body of the POST message 

 			request.on("data", function(chunk) {							// request is a readable stream here. Handle data event 
				postBody += chunk.toString();								// accumulate the whole POST message body
			});
			request.on("end", function() {									// on the end of POST message body
				loremOptions = querystring.parse(postBody);					// parse the body to generate the lorem ipsum options object
				values.generatedText = loremipsum.generate(loremOptions);	// store the lorem ipsume text to values object
				response.writeHead(200, {'Content-Type':'text/html'});		// set content-type and status code in response header
				renderer.view('header', {}, response);						// Render the header part from the view templates
				renderer.view('content', values, response);					// Render the content part from the view templates
				renderer.view('footer', {}, response);						// Render the footer part from the view templates
				response.end();												// End the http response
			});
		}
	}
}

module.exports.home = home;													// export the functions as module object methods
module.exports.lorem = lorem;