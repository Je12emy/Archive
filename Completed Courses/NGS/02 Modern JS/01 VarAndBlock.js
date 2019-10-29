
//! Block scopes

{
    //? This is a normal block scope
    {
        //! Nested block scope
        //* Use the let or const keywords to scopes
    }
}
if (true) {
    //? Block scope inside a conditional
}
//* If we were to sue var index to define this variable it can be accessed outside of it's cope
//! var index = 0
for (let index = 0; index < 10; index++) {
    //? Block scope inside a loop
}

function sum(a,b) {
    //? Block scope inside a function or Function Scope
    //! var result = a+ b
    //* We should not be able to access this variable
    let result = a + b
    return result
}
console.log(sum(1+2));

//! We should use const when the reference assigned is meant to not change
//? Scalar Values, we can't change the reference to the value
const answer = 42
const greeting = 'Hello'
//? For Arrays and Objects, the content can be changed
const numbers = [2,4,6]
const person = {
    fistName: 'Jeremy',
    lastName: 'Zelaya'
}

//* Object.freeze() would allow us to guarantee the reference cannot be changed
//* Immutable.js is a library which could help us to work with immutable objects


//! let vs const
const answer = 42

/*
    Program here
*/

answer //! Is still 42

//! vs

let answer2 = 42

/*
    Program here
*/

answer2 //! Might have changed