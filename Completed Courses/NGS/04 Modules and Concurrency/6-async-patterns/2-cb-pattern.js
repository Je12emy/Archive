const fs = require('fs');
//! Async method, the last argument is a function or a 
//! callback function it will always have a err argument and 
//! a data argument seccond
fs.readFile(__filename, function cb(err, data) {
  console.log('File data is', data);
});

console.log('TEST');
