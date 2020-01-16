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

socket.on('sendLocation', (message) => {
    console.log(message);
    
    console.log(`User has shared his location: ${message}`);
    
})

document.querySelector('#shareLocationButton').addEventListener('click', e => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support Geolocation')
    }
    const location = navigator.geolocation.getCurrentPosition( location => {
        const {latitude, longitude} = location.coords    
        socket.emit('sendLocation', {latitude, longitude})
    })

})