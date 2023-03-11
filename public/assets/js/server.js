const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
      });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, '/db/db.json'),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });
});

app.delete('/api/notes/:id', (req, res) => {
  // Receive a query parameter containing the id of a note to delete.
  // Read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
