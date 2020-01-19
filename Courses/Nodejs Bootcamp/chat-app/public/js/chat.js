const socket = io()
//* Elements
const $messageForm = document.querySelector('#message-form')
const $messageInput = document.querySelector('#message')
const $shareLocation = document.querySelector('#send-location')
const $submitButton = document.querySelector('#sendButton')
const $message = document.querySelector('#messages')

//* Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-message-template').innerHTML

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
    console.log('Received: ',message.text);
    const {text, createdAt} = message
    //? Render the html template and pass in a variable
    const html = Mustache.render($messageTemplate, {text, createdAt: moment(createdAt).format('h:mm a')})
    //? Render before the end of the element
    $message.insertAdjacentHTML('beforeend', html)
})

socket.on('sendLocation', (location) => {    
    const {url, createdAt} = location
    //console.log(`User has shared his location: ${message}`);
    const html = Mustache.render($locationTemplate, {url, createdAt: moment(createdAt).format('h:mm: a')})
    $message.insertAdjacentHTML('beforeend', html)
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