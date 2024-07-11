import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import logoImage from './iitdh logo.jpg'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post('http://localhost:5000/validate-email', { username: email, password });
            if (response.data.success) {
                console.log("Successful!!");
                localStorage.setItem('userEmail', email);
                navigate('/home');
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setMessage('Server error. Please try again later.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setMessage('');
    };

    return (
        <div className="login-container">
            <img src={logoImage} alt="IITDH Logo" className="logo-image" />
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
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <label htmlFor="password" className="visually-hidden">Enter your password</label>
                <div className="input-with-icon">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'LOGIN'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;