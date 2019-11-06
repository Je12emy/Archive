//! Express require directive
var express = require('express')
var express_graphql = require('express-graphql')
//! Destructure the buildSquema function from graphql
var {buildSchema} = require('graphql')

//? https://graphql.org/graphql-js/

//* GraphQL Schema
//? Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query{
        message: String
    }
`);

//* Resolver function
//? https://www.tutorialspoint.com/graphql/graphql_resolver.htm
//? A Resolver is a function which is called a everytime a query is executed.
//* Everytime this field is called, the will run the function which returns the string
var root = {
    message: () => 'Hello World'
}

//! Creating a express server and GraphQL endpoint
var app = express();
//? This a enpoint, so after we access <ip>/graphql this will be executed
//? After we create the endpoint, we will configure the middleware attached to the endpoint
app.use('/graphql',express_graphql({
    //? Set the scquema, which we have in a variable
    schema: schema,
    //? Set the resolver
    rootValue: root,
    //! This property is a tool which runs in the browser, it provides a GUI
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Express GraphQL server in now running in: localhost:4000')
})
