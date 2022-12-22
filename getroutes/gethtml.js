// Import dependecies
const path = require('path');

//Creates Router for Gethtml.js file
module.exports = (html) => {

  //  /Notes returns the notes.html file and * returns index.html
  html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  
  html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};