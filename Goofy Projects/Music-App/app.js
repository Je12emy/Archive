window.addEventListener('load',() =>{
    // This captures all elements with the class parameter given
    // Captures all elements with the class name of audio
    const sounds = document.querySelectorAll('audio')
    // Captures all elements with the class name of .pads but the divs inside of it
    const pads = document.querySelectorAll('.pads div')
    
    // For animations
    const visual = document.querySelector('.visual')
    const colors = [
        '#60d394',
        '#d36060',
        '#c060d3',
        '#e6e35d',
        '#7960d3',
        '#8ad1da'
    ]
    // Sound manipulation here
    // We loop over the pads array, and we capture each iterable in the variable named pad
    // If we add another parameter we can access this iterable's index which should match the array of sounds.
    pads.forEach((pad,index) => {
        // Here we use a normal function in order to have access to the keyword this.
        pad.addEventListener('click', function () {
            // We want to allow the sound timmer in order to allow for multple clicks
            sounds[index].currentTime = 0
            sounds[index].play()
            createBubble(index)
        })
    })
    // Functions for animations
    const createBubble = index => {
        // Create a new div
        const bubble = document.createElement('div')
        // Append that new div as a child element
        visual.appendChild(bubble)
        bubble.style.backgroundColor = colors[index]
        // Add a new animation and give some extra parameters for smoothing.
        bubble.style.animation = `jump 1s ease`
        // In order to remove this child element to ease on performance we need to remove it after the animatin is done
        bubble.addEventListener('animationend', function(){
            visual.removeChild(this)
        })
    }
    
})