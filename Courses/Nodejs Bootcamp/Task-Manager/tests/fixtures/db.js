const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')

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
const setDataBase = async () => {
    //? Whipe the user collection
   await User.deleteMany()
   //? Create a new User
   await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setDataBase
}

