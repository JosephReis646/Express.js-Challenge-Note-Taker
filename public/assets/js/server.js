const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
  // Read the db.json file and return all saved notes as JSON.
});

app.post('/api/notes', (req, res) => {
  // Receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
});

app.delete('/api/notes/:id', (req, res) => {
  // Receive a query parameter containing the id of a note to delete.
  // Read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
