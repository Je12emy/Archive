const greeter = (name = 'user', age) => {
    console.log(`Hello ${name}!`);   
}
//? Calling with a param
//greeter('Jeremy')
//* Output: Hello Jeremy!
//? Calling with No parameter, withough default param
//greeter()
//* Output: Hello undefined!

//? Undefined is default value for this param since we are not providing it, let's fix it
greeter()
//*output: Hello user
