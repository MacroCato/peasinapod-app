import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure you have the necessary CSS in App.css

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password,
            });
            // Handle successful login (e.g., store token, redirect)
            console.log('Login successful:', response.data);
            const { userId, token } = response.data;
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token); // Store token in local storage
            navigate('/home'); // Redirect to profiles page
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to the register page
    };

    return (
        <div className="login-container">
            {/* <h1>Login</h1> */}
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    {/* <label>Email:</label> */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />
                </div>
                <div><button type="submit">Login</button></div>
                <div><button type="button" onClick={handleRegister}>Register</button></div>
            </form>
        </div>
    );
};

export default Login;