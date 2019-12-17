//! Require calls
const notes = require('./notes')
const chalk = require('./node_modules/chalk')
const yargs = require('./node_modules/yargs')

//? Changing yargs version
yargs.version('1.1.0')

//! Create add command
yargs.command({
    //? The command method takes a object parameter
    //* Command name
    command:'add',
    //* Description
    description:'This is the command for adding a new note.',
    builder:{
        //* Builder object for this command.
        title:{
            describe:'Note title',
            //! Require property
            demandOption:true,
            //! Type
            type:'string'
        },
        body:{
            describe:'Note Body',
            demandOption:true,
            type:'string'
        }
    },
    //* Command handdler function
    handler: function(argv){
        //? This function is called whenever the command is used
        notes.addNote(argv.title, argv.body)     
    }
});
yargs.command({
    command:'remove',
    description:'This is the command for removing a note.',
    handler:function(argv){
        notes.removeNote(argv.title)
    },
    builder:{
        title:{
            description:'Remove a note by providing title',
            demandOption:true,
            type:'string'
        }
    }
});
yargs.command({
    command:'list',
    description:'This is the command for listing all notes.',
    handler:function(){
        notes.listNotes()
    }
});
yargs.command({
    command:'read',
    description:'This is the command for reading a single note.',
    handler:function(argv){
        notes.readNote(argv.title)
    },
    builder:{
        title:{
            description:'Retrieve a single note by providing a title.',
            demandOption:true,
            type:'string'
        }
    }
});

yargs.parse();






