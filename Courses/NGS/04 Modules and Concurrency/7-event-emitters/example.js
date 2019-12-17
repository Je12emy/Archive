//! Require this library, usually name it EventEmitter
//? Most other libraries use a Event Emitter
const EventEmitter = require('events');

//* Streams are Event Emitters
//- process.stdin, process.stdout
//! Create a EventEmitter object
const myEmitter = new EventEmitter()
//! Most important methods
//? Emit a string
myEmitter.emit(`TEST_EVENT`)
//* With setImmediate the event will be invoked after the rest of the programm is executed
setImmediate(() => {
    //? Emit a string
myEmitter.emit(`TEST_EVENT`)
})

//? If we pick up said string emit, do something will a callback
//! Here are subscribing to the event but IT HAS NOT BEEN EMITED YET
myEmitter.on(`TEST_EVENT`, () => {
    console.log('TEST_EVENT WAS FIRED');
})
//* This can be done multiple times
myEmitter.on(`TEST_EVENT`, () => {
    console.log('TEST_EVENT WAS FIRED');
})
myEmitter.on(`TEST_EVENT`, () => {
    console.log('TEST_EVENT WAS FIRED');
})

// //? Emit a string
// myEmitter.emit(`TEST_EVENT`)