#!/usr/bin/env node

var lib = require('../lib/index.js');

// Displays the text in the console

if (!(process.argv.length > 2)) {

console.log('The first and only argument should be a json path!');
return;
}
lib.convertJSON(process.argv.slice(2)[0]);
