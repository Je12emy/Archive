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
const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//* Options
//? Parse que query string
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})
const autoscroll = () => {
    //* New message element
    const $newMessage = $message.lastElementChild

    //* Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $message.offsetHeight + newMessageMargin

    //* Visible Height
    const visibleHeight = $message.offsetHeight
    
    //* Height of messages container
    const containerHeight = $message.scrollHeight
    
    //* How far have I scrolled
    const scrollOffset = $message.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $message.scrollTop = $message.scrollHeight
    }
    
}

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
    const {username, text, createdAt} = message
    //? Render the html template and pass in a variable
    const html = Mustache.render($messageTemplate, {username, text, createdAt: moment(createdAt).format('h:mm a')})
    //? Render before the end of the element
    $message.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('sendLocation', (message) => {    
    const {username, url, createdAt} = message
    //console.log(`User has shared his location: ${message}`);
    const html = Mustache.render($locationTemplate, {username ,url, createdAt: moment(createdAt).format('h:mm: a')})
    $message.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render($sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
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

socket.emit('join', {username, room}, (error) => {
    if(error){
        alert(`There was an error: ${error}`)
        location.href= '/'
    }
})