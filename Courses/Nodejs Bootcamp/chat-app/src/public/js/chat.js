const socket = io()
//* Elements
const $messageForm = document.querySelector('#chatForm')
const $messageInput = document.querySelector('#messageInput')
const $shareLocation = document.querySelector('#shareLocationButton')
const $submitButton = document.querySelector('#sendButton')
const $message = document.querySelector('#messages')

//* Templates
const messageTemplate = document.querySelector('#messageTemplate').innerHTML

$messageForm.addEventListener('submit', (e) => {
    //? Disable the send button
    $submitButton.setAttribute('disabled', 'disabled')
    e.preventDefault()
    if (!$messageInput.value) {
        return console.log('No message was provided');   
    }
    socket.emit('message', $messageInput.value, (message) => {
        $submitButton.removeAttribute('disabled')
        console.log(message);
    })
    $messageInput.value = ""
    $messageInput.focus()
})

socket.on('message', (message) => {
    console.log('Received: ',message);
    //? Render the html template and pass in a variable
    const html = Mustache.render(messageTemplate, {message})
    //? Render before the end of the element
    $message.insertAdjacentHTML('beforeend', html)
})

socket.on('sendLocation', (message) => {    
    console.log(`User has shared his location: ${message}`);
})

$shareLocation.addEventListener('click', e => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support Geolocation')
    }
    navigator.geolocation.getCurrentPosition( location => {
        $shareLocation.setAttribute('disabled', 'disabled')
        const {latitude, longitude} = location.coords    

        socket.emit('sendLocation', {latitude, longitude}, (message) => {
            console.log(message);
            setTimeout(() => {
                $shareLocation.removeAttribute('disabled')
            }, 2000)
            
        })
    })
})