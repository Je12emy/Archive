const express = require('express')
//! Run moongose.js to connect to the database
require('./db/mongoose')

const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')
const auth = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method) {
//         res.status(503).send('Server is under maintenance')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         console.log('You cant use this operation')
//         res.send('GET requests are disabled')    
//     } else {
//     console.log(req.method, req.path);
//     //! Finish middleware function
//     next()
//     }
// })

//! Parse JSON in a object
app.use(express.json())

//! Routers
app.use(userRouter)
app.use(taskRouter)


app.listen(PORT, () => {
    console.log('Server is up on port: ', PORT);
})

const pet = {
    name: 'Luka'
}
pet.toJSON = function (){
    console.log(this); //? { name: 'Luka', toJSON: [Function (anonymous)] }
    return {}
}
console.log(JSON.stringify(pet)); //? {}

