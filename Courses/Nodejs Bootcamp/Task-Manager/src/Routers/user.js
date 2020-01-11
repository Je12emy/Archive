const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')
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
        await sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    }catch (e){
        console.log(e);
        
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

//? Update user
router.patch('/users/me', auth, async (req, res) => {
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
        //? Update for hashing
        //* Use the logged in user
        const user = req.user
        //? Since there no guarantee properties will be the same allways
        //? We need the properties to be updated dynamiclly
        //* Access the properties using the update array to assign the new value for the key values
        updates.forEach(update => user[update] = req.body[update] )
        await user.save()

        res.send(user)

    } catch (error) {
        res.status(400).send()
    }
})

//? Deleting users
router.delete('/users/me', auth,async (req, res) => {
    try {
        //* Updated to use the logged user info
        //? New
        await req.user.remove()
        
        //? Old with authentication
        //const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }

        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)

    } catch (error) {
        res.status(500).send()
    }
})

//? Multer config, destination folder is set
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        //? Check for the file name using regex
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //* Return a error in the callback
            return cb(new Error('Please upload a .jpg, .jpeg or .png file'))
        }
        //* Return true
        cb(undefined, true)
    }
})
//? User profile pic upload
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //? Turn the file buffer into png and resize it
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    //* Access the binnary data and save it in the user model
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
router.delete('/users/me/avatar', auth, async(req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.get('/users/:id/avatar', async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
        
    } catch (error) {
        res.status(404).send()
    }
})

//? Export this router
module.exports = router