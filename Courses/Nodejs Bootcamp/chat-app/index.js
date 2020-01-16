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

//? When a new connection is started by the client
io.on('connection', () => {
    console.log('New web socket connection');
    
})

app.get('/', (req, res) => {

})

server.listen(PORT, () => {
    console.log('Express server is up on Port:', PORT);
})