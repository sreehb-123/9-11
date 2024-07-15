import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import '../components/main.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const email = localStorage.getItem('userEmail');

    const [issuedBooks,setIssuedBooks] = useState([]);

    const navigateHome = () => {
        navigate('/home');
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!email) {
                    throw new Error('User email not found in local storage');
                }

                console.log(email);

                const response = await fetch(`http://localhost:5000/notifications/${email}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setNotifications(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if(email){
            fetchNotifications();
        } else{
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

    if (loading) {
        return <div className="loading">Loading notifications...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()} className="refresh-button">Refresh</button>
            </div>
        );
    }

    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="books" id="notifications-container">
                {notifications.length === 0 ? (
                    <div className="none-notification">
                        <i class='bx bxs-bell'></i>
                        <p className="no-notification">No notifications at the moment.</p>
                        <button onClick={navigateHome} className="return-home">Return To Home</button>
                    </div>
                ) : (
                    <ul className="bookList">
                        <h2 className="notifications-heading">Notifications</h2>
                        {notifications.map(book => {
                            const issueDate = new Date(book.issueDate);
                            const dueDate = new Date(issueDate.getTime() + 15 * 24 * 60 * 60 * 1000);
                            return (
                                <li key={book._id} className="notification-item">
                                    <h2 className="book-title">
                                        <Link to={`/book/${book.bookId}`} className="book-link">
                                            {book.title}
                                        </Link>
                                    </h2>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Issue Date:</strong> {issueDate.toLocaleDateString()}</p>
                                    <p><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</p>
                                    <p className="due-notice">The book is due. Please return as early as possible.</p>
                                    <button onClick={() => handleReturn(book.bookId)} className="return-btn">RETURN</button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Notifications;
