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

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async() => {
//     // const task = await Task.findById('5e15772cd7a3b411db450dc7')
//     // //? Populate the property with the relationship from User
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner); //? User information is displayed
    
//     const user = await User.findById('5e1576030e022b0fdaab3897')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }
// main()
