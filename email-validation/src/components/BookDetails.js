import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useIssuanceStatus } from './IssuanceStatusContext';
import bookcover from './bookcover.jpg';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addIssuedBook, removeIssuedBook, isBookIssued } = useIssuanceStatus();

    const navigateHome = () => {
        navigate('/home');
    };

    const handleDeptClick = () => {
        navigate(`/department/${book.department}`);
    };

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                const data = await response.json();
                setBook(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [id]);

    const handleIssue = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const response = await fetch(`http://localhost:5000/issue-book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.status === 200) {
                addIssuedBook(id);
                alert('Book issued successfully');
            } else {
                const data = await response.json();
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
            });
            if (response.status === 200) {
                removeIssuedBook(id);
                alert('Book returned successfully');
            } else {
                const data = await response.json();
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
                <button className="nav-btn" onClick={handleDeptClick}>
                    <span> {book.department}</span>
                    <span>&gt;&gt;</span>
                </button>
                <button className="nav-btn">
                    <span>book details</span>
                </button>
            </div>
            <div className="book-details">
                <h1>{book.title}</h1>
                <div className="info">
                    <div className='book-img'><img src={bookcover} className='bookImg' alt="Book Cover" /></div>
                    <div>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Department:</strong> {book.department}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <p><strong>Number of units left:</strong> {book.count}</p>
                        {isBookIssued(id) ? (
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