import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios'; // Ensure axios is installed or use fetch API instead
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            // Assuming your login endpoint is structured as such based on the routes
            const response = await axios.post('http://localhost:3002/api/v1/guard/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Save the JWT in localStorage
                navigate("/usercapture"); // Adjust if necessary to match your actual routes
                console.log('Logged in successfully', response.data.user); // Optional
            } else {
                throw new Error('Authentication failed, no token received');
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Login failed with no response from server';
            alert(errorMessage);
            console.error(error);
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={onLogin}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input
                        id="text"
                        name="email"
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <div className='remember-forget'>
                    <label><input type='checkbox' />Remember me</label>
                    <a href='#'>Forget password</a>
                </div>
                <div>
                    <button type='submit'>
                        Login
                    </button>
                </div>
            </form>
            <div className='register-link'>
                <p>Don't have an account?
                    <NavLink to="/signup">
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    )
};

export default Login;
