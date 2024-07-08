import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import '../components/main.css';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/notifications/123');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!notifications.length) return <p>No notifications found.</p>;

    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="notifications">
                <h2>Notifications</h2>
                <ul>
                    {notifications.map(book => (
                        <li key={book._id}>
                            <h2>
                                <Link to={`/book/${book.bookId}`}>
                                    {book.title}
                                </Link>
                            </h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
                            <p>This book is overdue. Please return it as soon as possible.</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Notifications;