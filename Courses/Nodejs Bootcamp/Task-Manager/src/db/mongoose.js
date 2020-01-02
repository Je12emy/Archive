const mongoose = require('mongoose')

//? Mongoose connection is very similar to Mongo but we include de db
//? It needs a diferent name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})





