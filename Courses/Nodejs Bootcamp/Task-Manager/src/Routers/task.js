const express = require('express')
//? Import the Model
const Task = require('../models/task')
//? Create the router
const router = express.Router()

const auth = require('../middleware/auth')

//! Task Routes
//? Fetch all tasks
router.get('/tasks', async (req, res) => {
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

router.post('/tasks', auth, async (req, res)=>{
    // const task = new Task(req.body)
    //? Rest param
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send()
    }
})

//? Fetch task by id
router.get('/tasks/:id', async (req, res) => {
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


//? Update Task
router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send()
    }
    try {
        const _id = req.params.id
        
        const task = await Task.findById(_id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new:true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

//? Deleting tasks
router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router