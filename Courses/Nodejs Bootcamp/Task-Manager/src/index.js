const express = require('express')
//! Run this file
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000

//! Parse JSON in a object
app.use(express.json())

app.post('/users', async (req, res) => {
    console.log(req.body); 
    //? Create a new user
    const user = new User(req.body)

    //? Save the user
    //* We can run the whole await promise in a try/catch block
    try{
        //! If this await promise is fullfilled the response will be sent
        await user.save()
        res.status(201).send(user)
    }catch (e){
        return res.status(400).send(e)
    }
    
    // user.save().then(user => {
    //     res.status(201).send(user)
    // }).catch(error => {
    //     res.status(400).send(error)
    // })
})

app.post('/tasks', async (req, res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send()
    }

    // const task = new Task(req.body)
    // task.save().then(task => {
    //     res.status(201).send(task)
    // }).catch(error => {
    //     res.status(400).send(error)
    // })
})
//? Fetch all users
app.get('/users', async (req,res)=> {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
    
    
    
    // //? Fetch all users
    // User.find({}).then(users => {
    //     res.status(200).send(users)
    // }).catch(error => {
    //     res.status(500).send()
    // })
})

//? Fetch a single user
app.get('/users/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
    
    // const _id = req.params.id
    // console.log(_id);
    // //! Mongoose turns the id string into ObjectId, this means it need to be atlast 12 characters
    // //! or else it will throw a 500 error
    // User.findById(_id).then(user => {
    //     //? If no user is found return a 404
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch(error => {
    //     res.status(500).send(error)
    // })
})

//? Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }


    // Task.find({}).then(tasks => {
    //     res.status(200).send(tasks)
    // }).catch(error => {
    //     res.status(500).send(error)
    // })
})

//? Fetch task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
    
    
    // const _id = req.params.id
    // Task.findById(_id).then(task => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(task)
    // }).catch(error => {
    //     res.status(500).send(error)
    // })
})

//? Update user
app.patch('/users/:id', async (req, res) => {
    //? Ensure the user is not passing invalid update properties
    //* Get all the key values in the req.body
    const updates = Object.keys(req.body)
    //* Array with the allowed fields to be updated
    const allowedUpdates = ['name', 'email', 'password', 'age']
    //? "Every" returns true if all the items return true
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid update property"})
    }
    try {    
        const _id = req.params.id        
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        //? If the ID does not exist    
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        res.status(400).send()
    }
})

//? Update Task
app.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send()
    }
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate(_id, req.body, { new:true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

app.listen(PORT, () => {
    console.log('Server is up on port: ', PORT);
})



