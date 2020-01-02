//! Execute this file
require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e0d463a985e9d555243e103', {
    age: 1
}).then(user => {
    console.log(user);
    return User.countDocuments({age:1})
}).then(result => {
    console.log(result);
    
}).catch(e => {
    console.log(e);
    
})

