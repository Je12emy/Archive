const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

//! User Routes
//? User login 
router.post('/users/login', async (req, res) => {
    try {      
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //* Send back the public profile data
        res.send({ user, token})
        
    } catch (error) {
        res.status(400).send(error)
    }
})

//? Create user
router.post('/users',async (req, res) => {
    //? Create a new user
    const user = new User(req.body)

    //? Save the user
    //* We can run the whole await promise in a try/catch block
    try{
        //! If this await promise is fullfilled the response will be sent
        await user.save()
        const token = user.generateAuthToken()
        res.status(201).send({user, token})
    }catch (e){
        return res.status(400).send(e)
    }
    
    // user.save().then(user => {
    //     res.status(201).send(user)
    // }).catch(error => {
    //     res.status(400).send(error)
    // })
})

//? Fetch all users
router.get('/users/me', auth, async (req,res)=> {
    res.send(req.user)
})

//? Logout of current sesion
router.post('/users/logout', auth, async(req, res) => {
    try {
        //? Filter out the current token out of the array
        req.user.tokens = req.user.tokens.filter(token => {
            //* New array where all tokens are not in the header
            return token.token != req.token
        })
        //* Save the new user model with the updated tokens array
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//? Logout of all sesions
router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        //! Delete the whole tokens array
        req.user.tokens = []
        //? Update the collection
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//? Fetch a single user
router.get('/users/:id', async (req,res) => {
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

//? Update user
router.patch('/users/:id', async (req, res) => {
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

        //? Update for hashing
        //* Find the user
        const user = await User.findById(_id)
        //? Since there no guarantee properties will be the same allways
        //? We need the properties to be updated dynamiclly
        //* Access the properties using the update array to assign the new value for the key values
        updates.forEach(update => user[update] = req.body[update] )
        await user.save()
        //const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        //? If the ID does not exist    
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        res.status(400).send()
    }
})

//? Deleting users
router.delete('/users/:id',async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        res.status(500).send()
    }
})

//? Export this router
module.exports = router

