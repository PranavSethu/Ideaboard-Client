import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './Signup.css';
import axios from 'axios';  // Ensure axios is installed or use fetch API instead

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/api/v1/guard/register', { email, password });
            alert('User created successfully');
            navigate("/");  // Redirect to login after signup
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Signup failed with no specific error';
            alert(errorMessage);
            console.error(errorMessage);
        }
    };
    

    return (
        <div className='wrapping'>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <div className='input-box'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                    <FaLock className='icon' />
                </div>
                <button type="submit">
                    Sign up
                </button>
            </form>
            <p className='already'>
                Already have an account?
                <NavLink to="/">  // Assuming your login route is "/login"
                    Sign in
                </NavLink>
            </p>
        </div>
    );
};

export default Signup;
