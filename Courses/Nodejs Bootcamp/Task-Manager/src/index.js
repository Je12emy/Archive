const express = require('express')
//! Run moongose.js to connect to the database
require('./db/mongoose')

const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')
const auth = require('./middleware/auth')

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