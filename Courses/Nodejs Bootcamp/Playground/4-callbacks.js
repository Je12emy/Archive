// //* A callback function is simply a function within a function
// setTimeout(()=> {
//     //? Set timeout call this function in the future
//     console.log('Two secconds have passed');
// },2000)

// //* The callback can also be synchrous
// const names = ['Jeremy','Sacha','Jess']
// const shortName = names.filter( name => name.length <= 4)
// console.log(shortName);

// //? Function to return coodinates as a Object
// const geocode = (address, callback) => {
//     //* Use a setTimeout function in order to simmulate a request
//     setTimeout(() => {
//         const data = {
//             latitude:0,
//             longitude:0
//         }
//         callback(data)
//     },2000);
    
// };
// //* Log the returned object
// geocode('Los Angeles', data => {
//     console.log(data);
// });

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// const add = (a, b, callback) => {
//     setTimeout(() => {
//         const result = a + b;
//         callback(result)
//     },2000);
// };

// add(1,4,(result) => {
//     console.log(result)
// });


