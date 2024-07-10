import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import '../components/main.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { email } = useParams();

    const navigateHome = () => {
        navigate('/home');
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/notifications?email=${email}`);
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
    }, [email]);

    if (loading) {return (
        <>
        <div className='NAVBAR'>
                    <Navbar />
                </div>
                <p>lodaing...</p>
        </>
    )};

    if (!notifications.length) {
        return (<>
                <div className='NAVBAR'>
                    <Navbar />
                </div>
                <div className='none'>
                    <i className="bx bxs-bell" ></i>
                    
                    <p>No notifications here</p>
                    <button onClick={navigateHome} className="return-home">Return To Home</button>
                </div>
            </>);}

    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="books" id="notifications">
                <h2>Notifications</h2>
                <ul className="bookList">
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