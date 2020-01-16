const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const localPublicPath = path.join(__dirname, './src/public')

app.use(express.static(localPublicPath))

let count = 0

io.on('connection', (socket) => {
    //? Send all other users a message excluding this socket
    socket.broadcast.emit('message', 'New user has joined the chat')
    socket.on('sendMessage', message => {
        console.log(message);
        io.emit('message', message)
    })
    socket.on('sendLocation', ({latitude, longitude}) => {
        
        socket.broadcast.emit('sendLocation', `https://www.google.com/maps?q=${latitude},${longitude}` )
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User has left the chat')
    })
})

app.get('/', (req, res) => {

})

server.listen(PORT, () => {
    console.log('Express server is up on Port:', PORT);
})