import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

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
                alert('Book issued successfully');
            } else {
                alert(data.error || 'Failed to issue book');
            }
        } catch (error) {
            console.error('Error issuing book:', error);
            alert('Failed to issue book');
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
            <div className="book-details">
                <h1>{book.title}</h1>
                <div className="info">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Department:</strong> {book.department}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <p><strong>Number of units left:</strong> {book.count}</p>
                    <p><button onClick={handleIssue}>ISSUE</button></p>
                </div>
            </div>
        </>
    );
}

export default BookDetails;