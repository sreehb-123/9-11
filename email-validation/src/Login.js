// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './Login.css';  // Import CSS file
import logoImage from './iitdh logo.jpg'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/validate-email', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <img src={logoImage} alt="Logo" className="logo-image" />
            <p><b>LOGIN TO THE WEBSITE</b></p>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="email" className="visually-hidden">Enter your e-mail id</label>
                <div className="input-with-icon">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your e-mail id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">LOGIN</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
