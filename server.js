const fs = require('fs');
const express = require('express');
const db = require('./db/db.json');
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(PORT, () => {
    console.log(`Note taker listening at http://localhost:${PORT}`);
});