import 'boxicons/css/boxicons.min.css';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Menu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const navigateHome = () => {
        navigate('/home');
    };

    const showIssuedBooks = () => {
        const email = localStorage.getItem('userEmail');
        navigate(`/issued-books/${email}`);
    };

    const notificationsPage = () => {
        const email = localStorage.getItem('userEmail');
        navigate(`/notifications/${email}`);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="sidebar-wrapper">
            <button className="menu-dropdown" onClick={toggleSidebar}>
                <i className="bx bxs-user-circle"></i>
            </button>
            {isSidebarOpen && (
                <div className="sidebar" ref={sidebarRef}>
                    <button className="close-sidebar" onClick={closeSidebar}>
                    <i className="bx bxs-user-circle"></i>
                    </button>
                    <ul>
                        <li>
                            <button onClick={navigateHome}>
                                <i className="bx bxs-home"></i> Home
                            </button>
                        </li>
                        <li>
                            <button onClick={notificationsPage}>
                                <i className="bx bxs-bell"></i> Notifications
                            </button>
                        </li>
                        <li>
                            <button onClick={showIssuedBooks}>
                                <i className="bx bxs-book"></i> Issued books
                            </button>
                        </li>
                    </ul>
                    
                    <div className="sidebar-footer">
                        <button className="logout-button" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    </div>
                </div>
            )}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        </div>
    );
}

export default Menu;
