const mongoose = require('mongoose')

//? Mongoose connection is very similar to Mongo but we include de db
//? It needs a diferent name
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})