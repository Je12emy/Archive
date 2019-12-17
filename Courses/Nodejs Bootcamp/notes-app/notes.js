const fs = require('fs')
const chalk = require('./node_modules/chalk')

const getNotes = () => console.log('Your notes...');
//! Export this function

const addNote = function (title, body) {
    //* Call the loadNotes function which returns a array with all the notes
    let notes = loadNotes()
    //* Filter out the duplicates
    const duplicateNotes = notes.filter(note => {
        //? True: Keep the note in the array
        //? False: Does not keep the note in the array
        //* This function iterates though the note title, if it matches the provided title
        //* it will added into a new array which contains all the duplicates, this is the boolean
        return note.title === title
    })

    //* If the array with duplicates doen't contain a duplicate, we add it
    if (duplicateNotes.length === 0) {
        //? push into the array a new object
        notes.push({
            title: title,
            body: body
        })
        //* Call the save function and send the new array
        saveNotes(notes)
        console.log(chalk.green('New note has been added'));
    } else {
        //? If there is duplicate we will not add the note
        console.log(chalk.red('This note title already exists!'));
    }

};

const removeNote = function (title) {
    let notes = loadNotes()
    //* In a new array, store the values whithout the filtered/to be removed note
    let filteredNotes = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase())
    //? same size= not removed
    //? different size= removed
    if (notes.length === filteredNotes.length) {
        console.log(chalk.red('Note was not removed'));
    } else {
        console.log(chalk.green('Note was removed'));
        saveNotes(filteredNotes)
    }
}

const listNotes = () => {
    let notes = loadNotes()
    notes.forEach((note,index) => {
        console.log(`${index+1}. ${note.title}: ${note.body}`)})
};

const readNote = title => {
    let notes = loadNotes()
    let queryNote = notes.filter(note => note.title.toLowerCase() === title.toLowerCase())
 
    if (queryNote.length > 0) {
        console.log(chalk.blue('Note was found!'))
        console.log(`${queryNote[0].title}: ${queryNote[0].body}`);
    }else{
        console.log(chalk.red('Note was no found!'))
    }
};

const loadNotes = () => {
    try {
        //* Read the file and return it parsed
        var data = fs.readFileSync('notes.json')
        return JSON.parse(data)
    } catch (error) {
        //? If the file does not exists return a empty array
        return []
    }
};

const saveNotes = notes => {
    //* Write the new array into the file
    fs.writeFileSync('notes.json', JSON.stringify(notes))
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

