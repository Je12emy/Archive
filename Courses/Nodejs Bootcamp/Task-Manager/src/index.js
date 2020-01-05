const express = require('express')
//! Run moongose.js to connect to the database
require('./db/mongoose')

const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')

const app = express()
const PORT = process.env.PORT || 3000

//! Parse JSON in a object
app.use(express.json())

//! Routers
app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => {
    console.log('Server is up on port: ', PORT);
})

// //! Import bcrypt
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     //? Plain text password
//     const password = 'red12345!'
//     //? Hashed password, using a prommise and a bcrypt method
//     const hashedPassword = await bcrypt.hash(password, 8)
//     //? Log both
//     console.log(password);
//     console.log(hashedPassword);

//     //? Compare both passwords, ([plain text password], [stored/hashed password])
//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log('Are they the same?', isMatch); //?: True
    
// }
// myFunction()
