const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const { title } = require('process');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/libraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    count: Number,
    department: String,
    description: String,
})

const Book = mongoose.model('Book',bookSchema);

let users = [];
fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    users = JSON.parse(data);
});

const checkCredentials = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

app.post('/validate-email', (req, res) => {
    const { username, password } = req.body;

    if (checkCredentials(username, password)) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/search', async (req, res) => {
    try {
      const { q } = req.query;
      const books = await Book.find({ title: new RegExp(q, 'i') });
      res.json(books);
    } catch (error) {
      res.status(500).send({error: 'Internal Server Error'});
    }
});

app.get('/book/:id', async (req,res) => {
    const { id } = req.params;
    try{
        const book = await Book.findById(id);
        res.json(book);
    } catch(error){
        res.status(500).send({error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});