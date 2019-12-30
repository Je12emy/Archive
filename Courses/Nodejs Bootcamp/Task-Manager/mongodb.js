//? CRUD: Create - Retrieve - Update - Delete
//! Mongo and Mongo CLient
// const mongodb = require('mongodb')
// const mongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

//! Connection set up
const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBase = 'task-manager'

//! Connect to mongo, we pass the URL, Options and a Callback
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    //? This callback returns either a erroror the client itself
    if (error) {
        return console.log('Unable to connect to the Mongo database');
    }
    //? Create the dababase
    const db = client.db(dataBase)
    
    //? Access the collection of users and findOne
    //? In the object we pass the criteria
    //? In the callback we have the error and accesed document

    // db.collection('users').findOne({_id: new ObjectID('5e093dbdc830901de8e6ec7e')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(user); 
    // })
    
    //* Find: http://mongodb.github.io/node-mongodb-native/3.4/api/Collection.html#find
    //? With find we are given a cursor and NOT  a callback
    //? a cursor points towards the matches in the db
    //? this allows for many options instead of just returning a callback with a array
    //* Cursor: http://mongodb.github.io/node-mongodb-native/3.4/api/Cursor.html

    // db.collection('users').find({age:21}).count((error, count) => {
    //     //* Turn this cursor into a array, the array does take the callback
    //     if (error) {
    //         return console.log('Error fetching users');   
    //     }
    //     console.log(count);
    // })
    
    db.collection('tasks').find({_id: new ObjectID('5e0945915bbbd737d71b1d9a')}).toArray((error, task) => {
        if (error) {
            return console.log('Unable to fetch Task');
        }
        console.log(task);
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch uncompleted tasks');
        }
        console.log(tasks);
        
    })

})




