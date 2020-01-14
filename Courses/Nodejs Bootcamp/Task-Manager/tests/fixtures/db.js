const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '42what123',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Sasha',
    email: 'sasha@example.com',
    password: '42what1234',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 1 for testing',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 2 for testing',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 3 for testing',
    completed: true,
    owner: userTwo._id
}


const setDataBase = async () => {
    //? Whipe the user collection
   await User.deleteMany()
   //? Whipe the task collection
   await Task.deleteMany()
   
   //? Create a new User
   await new User(userOne).save()
   await new User(userTwo).save()
   
   //? Create the tasks
   await new Task(taskOne).save()
   await new Task(taskTwo).save()
   await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    setDataBase,
    taskThree
}

