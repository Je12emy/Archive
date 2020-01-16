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

//* Counter
let count = 0
//? Access socket methods, and access the socket's methods
io.on('connection', (socket) => {
    console.log('New web socket connection');
    //? Emmit a new event named countUpdated and pass in the counter
    socket.emit('countUpdated', count)
    //? Listen in the socket for the incrementCounter Event
    socket.on('incrementCounter', () =>{
        count++
        console.log(count);
        //? Emit the countUpdated event
         //socket.emit('countUpdated', count)
         io.emit('countUpdated', count)
    })
})

app.get('/', (req, res) => {

})

server.listen(PORT, () => {
    console.log('Express server is up on Port:', PORT);
})