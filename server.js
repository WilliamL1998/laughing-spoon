const fs = require('fs');
const path = require('path');
const express = require('express');
const uuid = require('uuid');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
})

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body
    const newNote = {
        title,
        text,
        id: uuid.v4()
    }
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            fs.writeFile(
                "./db/db.json",
                JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                  writeErr
                    ? console.error(writeErr)
                    : console.info("Successfully saved note!")
              );
            res.sendFile(path.join(__dirname, "public/notes.html"));
        }
    })
})

app.delete("/api/notes/:id", (req, res) => {
    const updatedNotes = []
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            for (let i = 0; i < parsedNotes.length; i++) {
                let noteId = parsedNotes[i].id;
                if (noteId != req.params.id) {
                    updatedNotes.push(parsedNotes[i]);
                    console.log(updatedNotes)
                }
            }
            fs.writeFile(
                "./db/db.json",
                JSON.stringify(updatedNotes, null, 4),
                (writeErr) =>
                  writeErr
                    ? console.error(writeErr)
                    : console.info("Successfully deleted note!")
              );
            res.sendFile(path.join(__dirname, "public/notes.html"));
        }
    })
})





app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})