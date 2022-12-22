// Imports
const path = require('path');
const fs = require('fs')

// npm package that allows for unique ids to be created
var { v4: uuidv4 } = require('uuid');


// Creates router for Getnotes.js file
module.exports = (notes) => {

  //Reads the db.json file and returns saved data as json
  notes.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // Receives a new note to save onto the request body
  notes.post('/api/notes', (req, res) => {
    let notesData = fs.readFileSync('db/db.json');
    notesData = JSON.parse(notesData);
    res.json(notesData);
    // Notes text input area
    let noteInput = {
      title: req.body.title,
      text: req.body.text,
      // uuid npm creates a unique id for each note
      id: uuidv4(),
    };
    // Recevices info that was input in body.title or text and directs it to db.json file
    notesData.push(noteInput);
    fs.writeFileSync('db/db.json', JSON.stringify(notesData));
    res.json(notesData);

  });


  // Delete function to receive a query parameter containing the id of a note to delete.
  notes.delete('/api/notes/:id', (req, res) => {
    // Retrieves stored data from db.json
    let notesData = JSON.parse(fs.readFileSync('db/db.json'))
    // Removes notes with an id
    let eraseNote = notesData.filter(item => item.id !== req.params.id);
    // Rewrites code to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(eraseNote));
    res.json(eraseNote);
    
  })
};