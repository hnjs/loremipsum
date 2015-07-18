var loremIpsum 	= require('lorem-ipsum');		// core module that handles the lorem ipsum text generation

function generate(options) {
	return loremIpsum(options);					// return the lorem ipsum text
}

module.exports.generate = generate;				// export the function as module object method