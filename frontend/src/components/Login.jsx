import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../features/login/loginSlice';
import './SignUp.css';

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();

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
        console.log(formData)
        const response = await axios.post('http://localhost:5000/auth/login', formData);
        const token = response.data.token;
        const name = formData.username;
        
        dispatch(logIn({text:token,name:name}))
        alert('Logged In')
        setFormData({
            username: '',
            password: ''
        });
        navigate('/');
    } catch (error) {
        console.error('Error:', error); // Handle error
        alert(error);
    }
  };

  return (
    
    <div className="signup">
        <div className="head">
            LOG IN !!!!
        </div>
        <div className="sign-up-form">
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Log In</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
