//! JSON Class

//? Import the FS module
//const fs = require('fs')

// //* Create a JS Object
// const book = {
//     title:'Ego is the enemy',
//     author:'Ryan Holiday'
// }
// //? Convert the object with the JSON stringify method
// const BOOK_JSON = JSON.stringify(book)

// //! Write into the FS
// fs.writeFileSync('1-json.json', BOOK_JSON)

//* Read the FS and asign it to a variable
//const DATA_BUFFER = fs.readFileSync('1-json.json')
//* Parse the data into a new object
//const DATA_JSON = JSON.parse(DATA_BUFFER)
//* Log out a JSON property
//console.log(DATA_JSON.title)
//? Output: Ego is the enemy

//! Code Challenge
// const fs = require('fs')
// const DATA = JSON.parse(fs.readFileSync('1-json.json'))
//* Reasigning
// DATA.name = 'Jeremy'
// DATA.age = 21
//* Parse into JSON and write
// const JSON_DATA = JSON.stringify(DATA)
// fs.writeFileSync('1-json.json',JSON_DATA)
fs.writeFileSync('1-json2.json',{})












