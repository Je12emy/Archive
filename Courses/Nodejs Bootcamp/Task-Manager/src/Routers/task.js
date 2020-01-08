const express = require('express')
//? Import the Model
const Task = require('../models/task')
//? Create the router
const router = express.Router()

const auth = require('../middleware/auth')

//! Task Routes
//? Fetch all tasks
//* GET/task?completed=false/true
//* GET/tasls?limit=#?skip=#
router.get('/tasks', auth, async (req, res) => {
    try {
        //const tasks = await Task.find({owner:req.user._id})
        //res.send(tasks)
        const match = {}
        if (req.query.completed) {
            //? Convert the string into a boolean by comparing the param with the string true
            match.completed = req.query.completed === 'true'
        }
        
        const user = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(user.tasks)  
    } catch (error) {
        res.status(500).send()
    }

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
router.get('/tasks/:id',auth , async (req, res) => {
    const _id = req.params.id
    try {
        //? Find Task by _id and it's user id
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


//? Update Task
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send()
    }
    try {
        const _id = req.params.id
        
        const task = await Task.findOne({_id, owner: req.user._id})      
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new:true, runValidators: true})
        
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

//? Deleting tasks
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router