const express = require('express')
//! Run moongose.js to connect to the database
require('./db/mongoose')

const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')
const auth = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 3000


const multer = require('multer')
//? Multer config, destination folder is set
const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        //? Check for the file name using regex
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            //* Return a error in the callback
            return cb(new Error('Please upload a Word document'))
        }
        //* Return true
        cb(undefined, true)
    }
})

//* Route for uploading using the multer middleware, here we set it to look for a single file named upload
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})



//! Parse JSON in a object
app.use(express.json())

//! Routers
app.use(userRouter)
app.use(taskRouter)


app.listen(PORT, () => {
    console.log('Server is up on port: ', PORT);
})


