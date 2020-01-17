const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const localPublicPath = path.join(__dirname, './src/public')

app.use(express.static(localPublicPath))

let count = 0

io.on('connection', (socket) => {
    //? Send all other users a message excluding this socket
    socket.broadcast.emit('message', 'New user has joined the chat')
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback('Delivered')
    })
    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        socket.broadcast.emit('sendLocation', `https://www.google.com/maps?q=${latitude},${longitude}` )
        callback('Location has been shared')
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