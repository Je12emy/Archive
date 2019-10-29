//! Fix
const fs = require('fs');
const util = require('util');
//! Promisify function to create a new instance of read file with NO callbacks,
//! we can actually comment this line of code since promisify is supported in node
const readFile = util.promisify(fs.readFile);

async function main() {
  //! We can consume this function with the async await feature
  const data = await readFile(__filename);
  console.log('File data is', data);
}

main();

console.log('TEST');
