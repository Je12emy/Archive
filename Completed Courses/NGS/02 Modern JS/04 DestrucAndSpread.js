//* Destructuring
//? Defining these variables
// const PI = Math.PI;
// const E = Math.E;
// const SQRT2 = Math.SQRT2;

//! Would be the same as doing this with Object destructuring  
const {PI,E,SQRT2} = Math;

const circle = {
    label:'circleX',
    radius: 2,
}
// //? Here the function takes up the radius' value
// const circleArea = ({radius}) => 
//     (PI * radius * radius).toFixed(2)

// console.log('Area is: ' + circleArea(circle));
//! Output: Area is: 12.57
//? Let's now add some default and option parameters with the precision argument
const circleArea = ({radius}, {precision = 2} = {}) => 
    (PI * radius * radius).toFixed(precision)

//* Since we are working with destructuring we will need to pass a object
console.log('Area is: ' + circleArea(circle, {precision:5}));
//! Output: Area is: 12.56637
//* This is a great alternative compared to using named variables

//* Rest
//? With Rest we can destructure several parameters into a single array
//const [first, second,, forth] = [10,20,30,40]

const [first, ...restOfItems] = [10,20,30,40]
//* first = 10, restOfItems = [ 20, 30, 40 ]

//? We can filter our certain elements ussing Rest
const data = {
    temp1:'001',
    temp2:'002',
    firstName:'Jeremy',
    lastLame:'Zelaya'
};
//? Destrucutre the object into these variables
const {temp1,temp2,...Person} = data
//* Now Person should have filtered the temp properties
//! Person Output: { firstName: 'Jeremy', lastLame: 'Zelaya' }

//* Spread
//? Spread is great for copying elements into a new one 
const newArray = [...restOfItems]
const newObject = {
    ...Person,
}
//! newArray Output: [ 20, 30, 40 ]
//! newObject Output: { firstName: 'Jeremy', lastLame: 'Zelaya' }

