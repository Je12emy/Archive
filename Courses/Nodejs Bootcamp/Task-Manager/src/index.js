const express = require('express')
//! Run this file
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000

//! Parse JSON in a object
app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body); 
    //? Create a new user
    const user = new User(req.body)
    //? Save the user
    user.save().then(user => {
        res.status(201).send(user)
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.post('/tasks', (req, res)=>{
    const task = new Task(req.body)
    task.save().then(task => {
        res.status(201).send(task)
    }).catch(error => {
        res.status(400).send(error)
    })
})
//? Fetch all users
app.get('/users', (req,res)=> {
    //? Fetch all users
    User.find({}).then(users => {
        res.status(200).send(users)
    }).catch(error => {
        res.status(500).send()
    })
})

//? Fetch a single user
app.get('/users/:id', (req,res) => {
    //console.log(req.params);
    const _id = req.params.id
    console.log(_id);
    //! Mongoose turns the id string into ObjectId, this means it need to be atlast 12 characters
    //! or else it will throw a 500 error
    User.findById(_id).then(user => {
        //? If no user is found return a 404
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch(error => {
        res.status(500).send(error)
    })
})

//? Fetch all tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.status(200).send(tasks)
    }).catch(error => {
        res.status(500).send(error)
    })
})

//? Fetch task by id
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then(task => {
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port: ', PORT);
})



