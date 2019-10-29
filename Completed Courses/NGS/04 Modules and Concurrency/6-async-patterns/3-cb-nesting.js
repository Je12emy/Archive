const fs = require('fs');
//! Allot of nested callbacks, not ideal since code is harder to read, code and maintain
fs.readFile(__filename, function cb1(err, data) {
  fs.writeFile(__filename + '.copy', data, function cb2(err) {
    // Nest more callbacks here...
  });
});

console.log('TEST');
