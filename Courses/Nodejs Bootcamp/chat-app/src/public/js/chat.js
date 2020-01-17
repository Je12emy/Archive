const socket = io()

document.querySelector('#chatForm').addEventListener('submit', (e) => {
    e.preventDefault()
    let input = document.querySelector('#messageInput').value
    if (!input) {
        return console.log('No message was provided');   
    }
    socket.emit('sendMessage', input, (message) => {
        console.log(message);
    })
    input.value = ""
})

socket.on('message', (message) => {
    //console.log('Received: ',message);
})

socket.on('sendLocation', (message) => {    
    console.log(`User has shared his location: ${message}`);
})

document.querySelector('#shareLocationButton').addEventListener('click', e => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support Geolocation')
    }
    const location = navigator.geolocation.getCurrentPosition( location => {
        const {latitude, longitude} = location.coords    
        socket.emit('sendLocation', {latitude, longitude}, (message) => {
            console.log(message);
            
        })
    })

})