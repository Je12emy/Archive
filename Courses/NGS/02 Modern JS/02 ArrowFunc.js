//! This is a new way to define a function
//? This is a simpler way to define a function but also is more predictable since it works with closures
const square = (a) => {
    return a * a
}

//! Arrow function don't care who calls them
const x = function (){
    //? 'this' here is the caller of x
}
const y = () => {
    //? 'this' here is NOT the caller of y
    //* It's the same 'this' found in y's scope
}

//! 'this' here is "exports"

this.id = 'exports'
//console.log(this)

//* PS X:\Courses\node\02 Modern JS> node '.\02 ArrowFunc.js'
//! { id: 'exports' }
//? We get a object with a id of 'exports'

const testerObj = {
    function1: function () {
        console.log('function1', this);
    },
    function2: () => {
        console.log('function2', this);  
    },
};
testerObj.function1()
testerObj.function2()

//* PS X:\Courses\node\02 Modern JS> node '.\02 ArrowFunc.js'
//! function1 { function1: [Function: function1],
//! function2: [Function: function2] }
//! Function 1 return the whole object which is calling it
//? function2 { id: 'exports' }
//? Function 2 returns only it's own context, which includes the id

