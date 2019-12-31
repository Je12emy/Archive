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

    // //? Access the collection and invoke the updateOne method
    // const updatePromise = db.collection('users').updateOne({
    //     //? Pass in the filter
    //     _id: new ObjectID('5e094cba4607583c101080ec')
    // },{
    //     //? Pass in the Update Operator
    //     $inc: {
    //         //? Increment the field by 1
    //         age: 1
    //     }
    // })
    
    // //? Fullfill the promise
    // updatePromise.then((user) => {
    //     console.log('User updated: ',user);
    // }).catch((error) => {
    //     console.log('Error:',error);
    // })

    // db.collection('users').deleteMany({
    //     age: 20
    // }).then(user => {
    //     console.log('Deleted user:', user);
        
    // }).catch(error => {
    //     console.log('Error:', error);
    // })

    db.collection('tasks').deleteOne({
        description: 'Buy milk'
    }).then(task => {
        console.log('Items deleted', task.deletedCount);
        
    }).catch(error => {
        console.log('Error:', error);
        
    })

})




