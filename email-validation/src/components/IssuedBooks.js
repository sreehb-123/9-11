import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';
import { useNavigate } from 'react-router-dom';

function IssuedBooks() {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const email = localStorage.getItem('userEmail');

    const navigateHome = () => {
        navigate('/home');
    };

    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                console.log('Fetching issued books for email:', email);
                const response = await fetch(`http://localhost:5000/issued-books/${email}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched issued books:', data);
                setIssuedBooks(data);
            } catch (error) {
                console.error('Error fetching issued books:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchIssuedBooks();
        } else {
            setLoading(false);
            setError('User email not found. Please log in again.');
        }
    }, [email]);

    const handleReturn = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:5000/return-book/${bookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                setIssuedBooks(issuedBooks.filter(book => book.bookId !== bookId));
                alert('Book returned successfully');
            } else {
                alert(data.error || 'Failed to return book');
            }
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Failed to return book');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    if (error) {
        return (
            <>
                <div className="NAVBAR">
                    <Navbar />
                </div>
                <div className="error">
                    <p>Error: {error}</p>
                    <button onClick={navigateHome} className="return-home">Return To Home</button>
                </div>
            </>
        );
    }

    if (!issuedBooks.length) {
        return (
            <>
                <div className="NAVBAR">
                    <Navbar />
                </div>
                <div className="none">
                    <p>No issued books</p>
                    <button onClick={navigateHome} className="return-home">Return To Home</button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="books" id="issued-books">
                <h2>Issued Books</h2>
                <ul className="bookList">
                    {issuedBooks.map(book => {
                        const issueDate = new Date(book.issueDate);
                        const dueDate = new Date(issueDate.getTime() + 15 * 24 * 60 * 60 * 1000);
                        return (
                            <li key={book._id}>
                                <h2>
                                    <Link to={`/book/${book.bookId}`} className="book-link">
                                        {book.title}
                                    </Link>
                                </h2>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Issue Date:</strong> {issueDate.toLocaleDateString()}</p>
                                <p><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</p>
                                <button onClick={() => handleReturn(book.bookId)}>RETURN</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default IssuedBooks;