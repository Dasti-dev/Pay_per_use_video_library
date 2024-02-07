import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUpForm = () => {
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    });

    // Memoize handleChange function using useCallback
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true); // Set loading to true before making the request
            const response = await axios.post('http://localhost:5000/auth/signup', formData);
            console.log(response.data); // Handle successful response
            setLoading(false); // Set loading to false after the request is completed
            alert('Signed Up');
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            });
            navigator('/login');
        } catch (error) {
            console.error('Error:', error); // Handle error
            alert(error);
            setLoading(false); // Set loading to false if an error occurs
        }
    };

    return (
        <div className="signup">
            <div className="head">
                SIGN UP !!!!
            </div>
            <div className="sign-up-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {loading ? (
                        <button type="submit" disabled>Loading...</button>
                    ) : (
                        <button type="submit">Sign Up</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
