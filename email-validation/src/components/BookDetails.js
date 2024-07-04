import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';
import bookcover from "./bookcover.jpg";
import { useNavigate } from 'react-router-dom';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isIssued, setIsIssued] = useState(false);
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/home');
    };

    const handleDeptClick = () => {
        navigate(`/department/${book.department}`)
      };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched book details:', data);
                setBook(data);
                const issuedResponse = await fetch(`http://localhost:5000/issued-books`);
                const issuedBooks = await issuedResponse.json();
                setIsIssued(issuedBooks.some(issuedBook => issuedBook.bookId === data._id));
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleIssue = async () => {
        try {
            const response = await fetch(`http://localhost:5000/issue-book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setBook(data.book);
                setIsIssued(true);
                alert('Book issued successfully');
            } else {
                alert(data.error || 'Failed to issue book');
            }
        } catch (error) {
            console.error('Error issuing book:', error);
            alert('Failed to issue book');
        }
    };

    const handleReturn = async () => {
        try {
            const response = await fetch(`http://localhost:5000/return-book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setBook(data.book);
                setIsIssued(false);
                alert('Book returned successfully');
            } else {
                alert(data.error || 'Failed to return book');
            }
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Failed to return book');
        }
    };
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return <p>No book details found.</p>;
    }
    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="navigation">
                <button onClick={navigateHome} className="nav-btn">
                    <span>Home </span>
                    <span>&gt;&gt;</span>
                </button>
                <button  className="nav-btn" onClick={handleDeptClick}>
                    <span> {book.department}</span>
                    <span>&gt;&gt;</span>
                </button>
                <button  className="nav-btn">
                    <span>book details</span>
                </button>
            </div>
            <div className="book-details">
                <h1>{book.title}</h1>
                <div className="info">
                    <div className='book-img'><img src={bookcover} className='bookImg'></img></div>
                    <div>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Department:</strong> {book.department}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <p><strong>Number of units left:</strong> {book.count}</p>
                        {isIssued ? (
                        <p><button onClick={handleReturn} className="book-btn">RETURN</button></p>
                    ) : (
                        <p><button onClick={handleIssue} className="book-btn">ISSUE</button></p>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetails;
