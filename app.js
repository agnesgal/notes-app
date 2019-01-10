const fs = require('fs');
const _= require('lodash');
const yargs = require('yargs');

const notes = require('./playground/notes');

var noteTitle = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

var noteBody = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: noteTitle,
        body: noteBody
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: noteTitle,
    })
    .command('remove', 'Remove a note', {
        title: noteTitle,
    })
    .help()
    .argv;
var command = argv._[0];

console.log('Command: ', command);
console.log(process.argv);
console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(_.isUndefined(note)) {
        console.log('Note already exists')
    }
    else {
        console.log('Note created');
        notes.logNote(note);
    }
}
else if (command === 'list') {
    var allNote = notes.getAll();
    console.log(`Printing ${allNote.length} note(s).`);
    allNote.forEach((note) => notes.logNote(note));
}
else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note) {
        notes.logNote(note);
    }
    else {
        console.log('Note not found')
    }
}else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else {
    console.log('not rec');
}
