var fs = require('fs');

// -------------------------------------------------------------- 
//  Replace the placeholders with the values dynamically
// -------------------------------------------------------------- 
function merge(contents, values) {
	for (var key in values) {
		contents = contents.replace('{{'+key+'}}', values[key]);
	}
	return contents;
}

// -------------------------------------------------------------- 
//  Read the view template files and merge the dynamic values
//  to its placeholders. Write the contents to response object
// -------------------------------------------------------------- 
function view(templateName, values, response) {
	var fileContents = fs.readFileSync('./views/'+templateName+'.html', {encoding:'utf8'});
	fileContents = merge(fileContents, values);
	response.write(fileContents);
}

module.exports.view = view;