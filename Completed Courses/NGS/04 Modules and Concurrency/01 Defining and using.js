//! function (exports, module, require, __filename, __dirname){
    //? arguments accesses all the parameters passed into a function
    //console.log(arguments);
    //? the variable g would b in this function's scope
    let g = 1
    //? Here are making use of the object exports
    exports.a = 42
    module.exports.b = 37
    //* This wrapping function will always return a value
    //! return module.exports
    //? exports is a alias for this method
    //* 
//! }