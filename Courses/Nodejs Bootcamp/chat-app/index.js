const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocation} = require('./src/utils/messages')
const {addUser,getUsersInRoom,getUser,removeUser} = require('./src/utils/users')


const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const localPublicPath = path.join(__dirname, './public')

app.use(express.static(localPublicPath))

io.on('connection', (socket) => {
    
    socket.on('join', ({ username, room }, callback) => {
        //* User storage; pass in the socket's id, the username and room
        const {error, user} = addUser({id: socket.id, username, room})
        if (error) {
            return callback(error)
        }
        //? Join a given communication socket
        socket.join(user.room)
        
        socket.emit('message', generateMessage('Server','Welcome'))
        //? Send all other users a message excluding this socket        
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the chat!`))
        
        //? Create a new event and pass in the room and users in said room
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })
    
    socket.on('message', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback('Delivered')
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('sendLocation', generateLocation(user.username,`https://www.google.com/maps?q=${latitude},${longitude}`) )
        callback('Location has been shared')
    })

    socket.on('disconnect', (callback) => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('Server',`${user.username} has left the room`))
            io.to(user.room).emit('roomData', {
                room:user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

app.get('/', (req, res) => {

})

server.listen(PORT, () => {
    console.log('Express server is up on Port:', PORT);
})