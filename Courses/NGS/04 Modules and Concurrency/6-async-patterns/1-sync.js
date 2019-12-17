const fs = require('fs');
//! Sync method to read files
const data = fs.readFileSync(__filename);

console.log('File data is', data);

console.log('TEST');
