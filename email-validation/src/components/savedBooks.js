import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';

function SavedBooks() {
    const [savedBooks, setSavedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/saved-books');
                const data = await response.json();
                setSavedBooks(data);
            } catch (error) {
                console.error('Error fetching saved books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedBooks();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!savedBooks.length) return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <p>No saved books</p>;
        </>
    );

    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="books" id="saved-books">
                <h2>Saved Books</h2>
                <ul className="bookList">
                    {savedBooks.map(book => (
                        <li key={book._id}>
                            <h2>
                                <Link to={`/book/${book.bookId}`} className="book-link">
                                    {book.title}
                                </Link>
                            </h2>
                            <p><strong>Author:</strong> {book.author}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SavedBooks;
