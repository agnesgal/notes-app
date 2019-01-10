const fs = require('fs');

var originalNo = {
    title: 'Some title',
    body: 'some body'
};

//originalNoteString
var originalNote = JSON.stringify(originalNo);
fs.writeFileSync('notes-original.json', originalNote);

//note
var noteString = fs.readFileSync('notes-original.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);
