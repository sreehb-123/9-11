import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css'

function Menu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false); // Close the sidebar explicitly
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const navigateHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <button className='menu-dropdown' onClick={toggleSidebar}>
            <i class='bx bxs-user-circle' ></i>
        </button>
        {isSidebarOpen && (
        <div className="sidebar">
            <button className="close-sidebar" onClick={closeSidebar}><i class='bx bxs-user-circle' ></i>
        </button>
          <ul>
            <li><button onClick={navigateHome}><i class='bx bxs-home'></i>  Home</button></li>
            <li><button><i class='bx bxs-bell'></i>  Notification</button></li>
            <li><button><i class='bx bx-category'></i>  Categories</button></li>
            <li><button><i class='bx bxs-book'></i>  Requested book</button></li>
            <li><button><i class='bx bxs-bookmark'></i>  Saved</button></li>
          </ul>
          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
          </div>
        </div>
      )}
      {isSidebarOpen && <div className="sidebar-overlay"></div>}
    </div>
  );
}
export default Menu;