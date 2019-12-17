//! ********* SET TIMEOUT ************
// //! Define the function which takes a function as a parameters and a time
// setTimeout(
//     () => {
//         //* This function's execution will be delayed
//         console.log('Hello after 4 seconds');
// }, 4000);

// //? Regular function wihich takes 'who' as a parameter
// const rocks = who => {
//     console.log(who + ' rocks!');
// }
// //* We call the funcion inside the timeout, we call the funcion, set the intervalp5.BandPass()
// //! any other other argument will be passed for the invoked function
// setTimeout(rocks, 4000, 'Jeremy')


// //! CODE CHALLENGE, USING ONLY ONE FUNCTION PRINT THE MESSAGES

// //? Define a function which prints out a parameter
// const THE_ONE = function (timer){
//     console.log(`Hello after ${timer} seconds`);
    
// }
// //* Invoke said function with different timeouts and timers
// setTimeout(THE_ONE, 4000, 4)
// setTimeout(THE_ONE, 8000, 8)

//! *********** SET INTERVAL *************
// //? Define a function which prints out the message for every 3 seconds
// setInterval(() => {
//     console.log('Hello every 3 seconds');
    
// }, 4000);

//! Stopping our timmers
// const timerId = setTimeout(
//     () => {
//         console.log('You cant see me');
//     } , 0
// );
// //* We could replace this function with setImmediate

// //? setTimeout returns a ID, with the function clearTimeout we can cancel it
// //! This means that the function will not printout since it will be cancelled
// clearTimeout(timerId)
// //* clearInterval
// //* clearImmediate

// //? This function will wait until the loop is done
// setTimeout(()=>
//     console.log('Hello after 0.5 seccong, MAYBE'),500
// );
// for (let index = 0; index < 1e18; index++) {
//     //! HUGE loop
// }


//! CODE CHALLENGE
/* Print "Hello World"
 Every second
 And stop after 5 times

 After 5 times. Print "done" and Node Exit. */

let printCounter = 0
const FIVER = () => {
    if (printCounter != 5) {
        console.log('Hello for FIVE times');
        printCounter += 1
    }else{
        console.log('DONE');
        clearInterval(TIMER_ID)
    }
};
const TIMER_ID = setInterval(FIVER,1000)


