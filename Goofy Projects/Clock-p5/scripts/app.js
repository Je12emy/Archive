function setup() {
    createCanvas(400,400)
}

function draw() {
    //! Inpired by: https://www.youtube.com/watch?v=E4RyStef-gY
    background(0);
    //? Variables for local time
    let hr = hour();
    let mn = minute();
    let sc = second();

    //? Mapped values
    let hourRadius = map(hr % 12,0,12, 200, 250)
    let minuteRadius = map(mn, 0, 60, 150, 200)
    let secondRadius = map(sc, 0, 60,100, 150)

    //! Drawing of the clock
    //* Draw a circle for the hours handle
    strokeWeight(4)
    stroke(255, 107, 107)
    noFill()
    ellipse(200,200, hourRadius, hourRadius);

    //* Draw a circle for the minutes handle
    strokeWeight(4)
    stroke(72, 219, 251)
    noFill()  
    ellipse(200,200, minuteRadius, minuteRadius);

    //* Draw a circle for the seconds handle
    strokeWeight(4)
    stroke(255, 159, 243)
    noFill()
    ellipse(200, 200, secondRadius, secondRadius);
    
    //* Draw a circle for the seconds handle
    strokeWeight(4)
    stroke(200, 214, 229)
    noFill()
    ellipse(200, 200, 250, 250);
    
    //* Draw the timer
    fill(255);
    textSize(12)
    noStroke()
    text(hr % 12 + ':'+ mn + ':'+ sc, 180, 200);
}