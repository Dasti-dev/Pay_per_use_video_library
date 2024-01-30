import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUpForm = () => {
    const navigator = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

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
        const response = await axios.post('http://localhost:5000/auth/signup', formData);
        console.log(response.data); // Handle successful response
        alert('Signed Up')
        setFormData({
            firstName: '',
            lastName: '',
            username: '',
            password: ''
          });
          navigator('/login')
    } catch (error) {
        console.error('Error:', error); // Handle error
        alert(error);
    }
    // console.log(formData);
  };

  return (
    
    <div className="signup">
        <div className="head">
            SiGN UP !!!!
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
                <button type="submit">Sign Up</button>
            </form>
    </div>
    </div>
  );
};

export default SignUpForm;
