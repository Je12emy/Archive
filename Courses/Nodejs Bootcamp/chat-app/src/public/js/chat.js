const socket = io()
//? When the countUpdated event is received log the mssg
// socket.on('countUpdated', (count) => {
//     console.log('Count has been updated', count);
// })

// const button = document.querySelector('#incrementButton')
// button.addEventListener('click', () => {
//     console.log('Click');
//     //? Emit the incrementCounter event
//     socket.emit('incrementCounter')
    
// })

document.querySelector('#chatForm').addEventListener('submit', (e) => {
    e.preventDefault()
    let input = document.querySelector('#messageInput').value
    if (!input) {
        return console.log('No message was provided');
        
    }
    socket.emit('sendMessage', input)
    console.log('Sent: ', input);
    
    input.value = ""
})
socket.on('message', (message) => {
    console.log('Received: ',message);
})