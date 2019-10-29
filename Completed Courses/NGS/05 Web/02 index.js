//! Require directives, we get the top level API as a function
const express = require('express')
//? Create a server by calling the function
const server = express()
const PORT = 4242

//? In express we use multiple listeners for urls, here we are creating one for the root
server.get('/',(req,res)=>{
    res.send('Hello Express!')
})
server.get('/about',(req,res)=>{
    res.send('About Express!')
})
server.listen(PORT,()=>{
    console.log('Server is now running');
})

