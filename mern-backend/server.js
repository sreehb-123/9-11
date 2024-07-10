const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const { title } = require('process');

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/libraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    count: Number,
    department: String,
    description: String,
});

const Book = mongoose.model('Book',bookSchema);

const issuedBookSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    title: String,
    author: String,
    issueDate: Date
});

const IssuedBook = mongoose.model('IssuedBook', issuedBookSchema);

const savedBookSchema = new mongoose.Schema({
    bookId: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
});

const SavedBook = mongoose.model('SavedBook', savedBookSchema);
module.exports = { Book, SavedBook };

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
      const searchCriteria = {
        $or: [
            { title: new RegExp(q, 'i') },
            { author: new RegExp(q, 'i') },
            { genre: new RegExp(q, 'i') }
        ]
    };
    const books = await Book.find(searchCriteria);
    res.json(books);
    } catch (error) {
      res.status(500).send({error: 'Internal Server Error'});
    }
});


app.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/department/:dept', async (req, res) => {
    const { dept } = req.params;
    try {
        const books = await Book.find({ department: dept });
        res.json(books);
    } catch (error) {
        console.error('Error fetching books by department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/issue-book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        if (book.count <= 0) {
            return res.status(400).json({ error: 'No units left to issue' });
        }
        
        book.count -= 1;
        await book.save();

        const issuedBook = new IssuedBook({
            bookId: book._id,
            title: book.title,
            author: book.author,
            issueDate: new Date()
        });
        await issuedBook.save();

        res.json({ message: 'Book issued successfully', book });
    } catch (error) {
        console.error('Error issuing book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/issued-books', async (req, res) => {
    try {
        console.log('Fetching issued books...');
        const issuedBooks = await IssuedBook.find();
        res.json(issuedBooks);
    } catch (error) {
        console.error('Error fetching issued books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/return-book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        book.count += 1;
        await book.save();
        await IssuedBook.findOneAndDelete({ bookId: id });
        res.json({ book });
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save-book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Fetching book with ID: ${id}`);
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        console.log(`Checking if the book is already saved`);
        const existingSavedBook = await SavedBook.findOne({ bookId: book._id });
        if (existingSavedBook) {
            console.log('Book is already saved');
            return res.status(400).json({ error: 'This book has already been saved' });
        }

        console.log('Saving new book');
        const savedBook = new SavedBook({
            bookId: book._id,
            title: book.title,
            author: book.author,
        });
        await savedBook.save();

        console.log('Book saved successfully');
        const savedBooks = await SavedBook.find();
        console.log('Current state of saved books:', savedBooks);
        res.json({ message: 'Book saved successfully', book });
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get saved books
app.get('/saved-books', async (req, res) => {
    try {
        console.log('Fetching saved books...');
        const savedBooks = await SavedBook.find();
        res.json(savedBooks);
    } catch (error) {
        console.error('Error fetching saved books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST endpoint to un-save a book by ID
app.delete('/unsave-book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Un-saving book with ID: ${id}`);

        const book = await SavedBook.findOne({ bookId: id });
        
        if (!book) {
            console.log(`Book with ID ${id} not found in saved books`);
            return res.status(404).json({ error: 'Book not found in saved books' });
        }

        await book.save();
        await SavedBook.findOneAndDelete({ bookId: id });
        console.log('Book un-saved successfully');
        res.json({ message: 'Book un-saved successfully', book });
    } catch (error) {
        console.error('Error un-saving book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
