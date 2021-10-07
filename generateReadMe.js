var marked = require('marked');
var fs = require('fs');

var readMe = fs.readFileSync('terraformDeepDive.md', 'utf-8');
var markdownReadMe = marked(readMe);

fs.writeFileSync('terraformDeepDive.html', markdownReadMe);