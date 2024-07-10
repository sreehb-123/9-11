const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const { title } = require('process');
const schedule = require('node-schedule');

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
});

const Book = mongoose.model('Book',bookSchema);

const issuedBookSchema = new mongoose.Schema({
    bookId: mongoose.Schema.Types.ObjectId,
    userEmail: String,
    title: String,
    author: String,
    issueDate: Date
});

const IssuedBook = mongoose.model('IssuedBook', issuedBookSchema);

const Notification = mongoose.model('Notification',new mongoose.Schema({
    userId: String,
    message: String,
    date: { type: Date, default: Date.now },
}));

const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;

schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const overdueBooks = await IssuedBook.find({
            issueDate: { $lt: new Date(Date.now() - FIFTEEN_DAYS_IN_MS) }
        });
        overdueBooks.forEach(book => {
            console.log(`Notification: Book titled "${book.title}" is overdue.`);
        });
    } catch (error) {
        console.error('Error scheduling notifications:', error);
    }
});

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
    const { email } = req.body;
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
            userEmail: email,
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
    const {email} = req.query;
    try {
        console.log('Fetching issued books...');
        const issuedBooks = await IssuedBook.find({ userEmail:email });
        res.json(issuedBooks);
    } catch (error) {
        console.error('Error fetching issued books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/return-book/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        book.count += 1;
        await book.save();
        await IssuedBook.findOneAndDelete({ bookId: id, userEmail: email });
        res.json({ book });
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/notifications/:userId', async (req, res) => {
    try {
        const overdueBooks = await IssuedBook.find({
            issueDate: { $lt: new Date(Date.now() - FIFTEEN_DAYS_IN_MS) }
        });
        res.json(overdueBooks);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/clear-issued-books', async (req,res) => {
    try{
        await IssuedBook.deleteMany({});
        res.json({ message: 'All issued books have been cleared.' });
    } catch (error) {
        console.error('Error clearing issued books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
