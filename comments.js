// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Parse JSON
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Get comments
app.get('/api/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

// Post comments
app.post('/api/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const newComment = {
            id: uuidv4(),
            name: req.body.name,
            comment: req.body.comment
        };
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), () => {
            res.send(newComment);
        });
    });
});

// Delete comments
app.delete('/api/comments/:id', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const newComments = comments.filter((comment) => {
            return comment.id !== req.params.id;
        });
        fs.writeFile('comments.json', JSON.stringify(newComments), () => {
            res.send(req.params.id);
        });
    });
});

// Listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});