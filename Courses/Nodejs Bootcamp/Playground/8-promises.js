const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //! Set resolve with the result
        //resolve([7,4,1])
        //! Set reject with the error message
        reject('Things went wrong')
        //? When resolve nor reject are called the 
        //? promise stops running.
        //? This prevent repeated call to either of them
    },2000)
})

doWorkPromise.then((result) => {
    console.log('Succes: ',result);
    }
).catch((error)=> {
    console.log('Error:',error);
})

