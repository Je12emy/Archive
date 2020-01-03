
//! Standard add promise
const add = (a,b) => {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive')
            }
            resolve(a + b)
        },2000)
    })
}
//! Mark this function as async
const doWork = async () => {
    //? Await is used with a promise, the promise is fullfilled and captured in the variable
    //? If one of this promises get's rejected the others will not be executed and the error will be thrown
    const result = await add(1,-99)
    const result2 = await add(result, 50)
    const result3 = await add(result2, -3)
    return result3
}

doWork().then(value => {
    console.log('Result: ',value);

}).catch(error => {
    console.log('Error: ',error);  
})


