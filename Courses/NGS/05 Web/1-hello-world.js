//! Returns the API
const http = require('http')
const PORT = 4242

//? Create server, which can take a function as a argument
//* Higher order functions are function which can toke functions as a argument or return functions
const server = http.createServer((req,res) =>{
    //* Writing a line and ending communication
    res.end('Hello World!')
    //! Log out the res object, make a request in the brower
    //console.log(res);
    //! Reduce the output
    console.dir(req, {depth:0})
    console.dir(res, {depth:0})
    //* req ans res are streams, we can subscribe

})
//? Listed on port
server.listen(PORT, () => {
    console.log('Server is running...');
    
})
//* Right now we need to restart the server everytime we make a change.
//* We can install a package to do this for us