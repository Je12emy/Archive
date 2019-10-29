const fs = require('fs').promises;

async function main() {
  //! This is much more easy to work with than 3-cb-nestring
  const data = await fs.readFile(__filename);
  await fs.writeFile(__filename + '.copy', data);
  // More awaits here...
}

main();
console.log('TEST');
