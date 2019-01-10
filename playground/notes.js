const fs = require('fs'); //core node module

//gets previous notes if is there any
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-add-new.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-add-new.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();

    var note = {
        title,
        body
    };

    //checks if exists the file with previous notes
    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    console.log(filteredNotes);
    return filteredNotes[0];
};

var removeNote = (title) => {
    console.log('Remove', title);
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length !== notes.length;
};

var logNote = (note) => {
    console.log(`---`);
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};