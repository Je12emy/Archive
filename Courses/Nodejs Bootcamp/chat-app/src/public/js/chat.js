const socket = io()
//? When the countUpdated event is received log the mssg
socket.on('countUpdated', (count) => {
    console.log('Count has been updated', count);
})

const button = document.querySelector('#incrementButton')
button.addEventListener('click', () => {
    console.log('Click');
    //? Emit the incrementCounter event
    socket.emit('incrementCounter')
    
})

