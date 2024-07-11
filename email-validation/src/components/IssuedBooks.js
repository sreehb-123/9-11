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