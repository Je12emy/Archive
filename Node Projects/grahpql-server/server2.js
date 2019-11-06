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
        # Query called course, it receives a Integer which is required
        # and expect a return type of Course
        course(id: Int!): Course

        # Query called courses, it receives a String as a parameter
        # and expects a return of type array of Course
        courses(topic:String):[Course]
    }
    type Mutation {
        # With Mutation we can update values
        # Define a new Query where we require a id and string
        # and expect a output of type Course

        updateCourseTopic(id: Int!, topic: String!): Course
    }
    # Create a schema of type Course
    type Course{
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var getCourse = function(args){
    let id = args.id
    //? Filter function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    //* Return the new (filtered) array based on the course id, on said array access the first element
    return coursesData.filter(course =>{
        return course.id == id
    })[0];
}
var getCourses = function(args){
    //? If we are given a topic
    if (args.topic) {
        let topic = args.topic
        //? Filter the array based on topic
        return coursesData.filter(course => {
            return course.topic == topic
        });
    }else
        return coursesData
}
//* Destructure id and topic from args
var updateCourseTopic = function({id, topic}){
    //? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic
            return course
        }
    });
    //? Return the course which we just updated
    return coursesData.filter(course => course.id === id)[0]
}

//* Resolver function
//? https://www.tutorialspoint.com/graphql/graphql_resolver.htm
//? A Resolver is a function which is called a everytime a query is executed.
//* When these queries are executed the functions will be executed
var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic:updateCourseTopic
};

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
});

//! Course Data
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]