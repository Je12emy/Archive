const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The value is not a valid Email')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Your password cannot be "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
//? Create a custom method for this model
userSchema.statics.findByCredentials = async (email, password) => { 
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to login')
    }
    //? Compare the credentials
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
//? Web token creation
userSchema.methods.generateAuthToken = async function(){
    const user = this
    //? Remember user._id is of type ObjectId and not a string which is why we convert it
    const token = jwt.sign({_id:user._id.toString()}, 'secretPassword')
    //? Add the token into the tokens array
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON = function(){
    const user = this
    //? Parse the document into a JS Object
    const userObject = user.toObject()
    
    //! Delete the properties
    delete userObject.password
    delete userObject.tokens

    //* Return the object
    return userObject
}

//! Hash the plain text password
//? Function to be used before saving
userSchema.pre('save', async function (next) {
    //? Bind this into a variable
    const user = this
    //? If the password is being modified or created
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    //? Continue normal operation
    next()
})

const User = mongoose.model('User', userSchema)

//! Export this model
module.exports = User