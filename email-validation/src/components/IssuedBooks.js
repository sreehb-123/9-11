import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useIssuanceStatus } from './IssuanceStatusContext';

function IssuedBooks() {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { email } = useParams(); 
    const { isBookIssued } = useIssuanceStatus();

    const navigateHome = () => {
        navigate('/home');
    };

    const fetchIssuedBooks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/issued-books?email=${email}`);
            const data = await response.json();
            setIssuedBooks(data);
        } catch (error) {
            console.error('Error fetching issued books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssuedBooks();
    }, [email]);

    if (loading) return <p>Loading...</p>;

    if (!issuedBooks.length) {
        return (
            <>
                <div className="NAVBAR">
                    <Navbar />
                </div>
                <div className='none'>
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
                            <p><strong>Due Date:</strong> {new Date(new Date(book.issueDate).getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                            {isBookIssued(book.bookId) ? (
                                <p><span className="issued-status">Issued</span></p>
                            ) : (
                                <p><span className="not-issued-status">Not Issued</span></p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default IssuedBooks;