// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //! Set resolve with the result
//         //resolve([7,4,1])
//         //! Set reject with the error message
//         reject('Things went wrong')
//         //? When resolve nor reject are called the 
//         //? promise stops running.
//         //? This prevent repeated call to either of them
//     },2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Succes: ',result);
//     }
// ).catch((error)=> {
//     console.log('Error:',error);
// })

//! Normal nested promise chaining

const add = (a,b) => {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(a + b)
        },2000)
    })
}

add(1,2).then(sum =>{
    console.log(sum);
    add(sum,5).then(sum2 => {
        console.log(sum2);
        
    }).catch(e => {
        console.log(e);
        
    })
 
}).catch(e => {
    console.log(e);
    
})

add(1,1).then((sum) => {
    console.log(sum);
    //? Return a new promise
    return add(sum, 4)  
}).then(sum2 => {
    //? Since a new promise is being returned we can fullfill it
    console.log(sum2);
    
}).catch(e => {
    //? This catch works for both promises
    console.log(e);
    
})
