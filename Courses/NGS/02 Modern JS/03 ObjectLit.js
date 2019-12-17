//! These are ways in which we can create objects
//? This is the most common way in which objects are created
// const obj = {
//     key:value
// }

const mystery = 'answer'
const PI = Math.PI
const obj = {
    p1:10,
    p2:20,
    f1(){
        //? This is another way to create a property which holds a function
    },
    f2: () => {
        //? Or we can use the normal way if we need a arrow function
        
    },
    //* Dynamic properties, call them inside a REPL session
    [mystery]:42,
    PI,
};
