//! Object property shorthand
const name = 'Jeremy'
const userAge = 21
//? The properties have the same values as the defined variables
user = {
    name,
    userAge,
    location: 'New York'
}
//console.log(user);

//! Object destructuring
const product = {
    label: 'Coke-Cola',
    price:5,
    stock:500,
    salePrice: undefined,
    rating: 4
}
//* With this syntax we can retrieve the object properties instead of creating a variabe and listing each one
// let {label:ProductName, price, stock, salePrice, rating = 5} = product
// console.log(ProductName, price, stock, salePrice,rating);

//! Destructuing with function arguments
//? Destructure the object within the function arguments
const transaction = (type, {label = 'Not found', price = 0, stock = 0} = {}) => {
    console.log(label, price, stock, type);
}

transaction('order', product)

