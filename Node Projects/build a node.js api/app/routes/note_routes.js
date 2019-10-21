//! Require statement for the Object ID
var ObjectID = require('mongodb').ObjectID

module.exports = function(app,db){
    //* Create Routes
    //? When the app receives a POST request to the /notes path, the code inside the callback will be executed
    app.post('/notes', (req,res) => {
        //? Create the Note Here
        //* REQ is the JSON object and RES is the reply
        //? Create the note object
        const note = {text:req.body.body, title: req.body.title}
        //! CREATE
        db.db('NotesDB').collection('Notes').insert(note, (err, results) => {
            if (err) {
                //! Send a error
                res.send({error:'An error has ocurred'})
                console.log(err);
            }else{
                //! Send the note we created
                res.send(results.ops[0])
                }
        });
        
    });

    //! RETRIEVE
    app.get('/notes/:id',(req,res) => {
        //? MongoDB needs a ID as a object
        const ID = req.params.id
        
        //* Create the ID as an object to pass into Mongo
        const details = {'_id':new ObjectID(ID)}

        db.db('NotesDB').collection('Notes').findOne(details,(err,item)=> {
            if (err) {
                //! Send a error
                res.send({error:'An error has ocurred'})
                console.log(err);
            }else{
                //! Send the note we created
                res.send(item)
            }
        });
    });

    //! DELETE
    app.delete('/notes/:id',(req,res) => {
        //? MongoDB needs a ID as a object
        const ID = req.params.id
        
        //* Create the ID as an object to pass into Mongo
        const details = {'_id':new ObjectID(ID)}

        db.db('NotesDB').collection('Notes').remove(details,(err,item)=> {
            if (err) {
                //! Send a error
                res.send({error:'An error has ocurred'})
                console.log(err);
            }else{
                //! Send the note we created
                res.send('Note: '+ ID + 'has been deleted!')
            }
        });
    });

    //! PUT
    app.put('/notes/:id',(req,res) => {
        //? MongoDB needs a ID as a object
        const ID = req.params.id
        
        //* Create the ID as an object to pass into Mongo
        const details = {'_id':new ObjectID(ID)}
        
        //? Create the note object
        const note = {text:req.body.body, title: req.body.title}
        
        db.db('NotesDB').collection('Notes').update(details,note,(err,item)=> {
            if (err) {
                //! Send a error
                res.send({error:'An error has ocurred'})
                console.log(err);
            }else{
                //! Send the note we created
                res.send(item)
            }
        });
    });
}