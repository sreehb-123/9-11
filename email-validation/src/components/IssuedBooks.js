import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';

function IssuedBooks() {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/issued-books');
                const data = await response.json();
                setIssuedBooks(data);
            } catch (error) {
                console.error('Error fetching issued books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssuedBooks();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!issuedBooks.length) return <p>No issued books found.</p>;

    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="books" id="issued-books">
                <h2>Issued Books</h2>
                <ul className="bookList">
                    {issuedBooks.map(book => (
                        <li key={book._id}>
                            <h2>
                                <Link to={`/book/${book.bookId}`} className="book-link">
                                    {book.title}
                                </Link>
                            </h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default IssuedBooks;
