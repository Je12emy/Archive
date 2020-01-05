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

//! Import jwt
const jwt = require('jsonwebtoken')

const myFunction = async () => {
    //? Use jwt.sign({object: identifier for user},'secret password for token') to create a token
    const token = jwt.sign({_id: 'asd123'},'thisismynewcourse', {expiresIn:'5 seconds'})
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data);
    
}
myFunction()