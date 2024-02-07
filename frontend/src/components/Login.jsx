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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      const token = response.data.token;
      const id = response.data.id;
      const name = formData.username;

      dispatch(logIn({ text: token, name: name, id: id }));
      alert('Logged In');
      setFormData({
        username: '',
        password: ''
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error); // Handle error
      alert(error);
      setLoading(false);
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
            disabled={loading} // Disable input while loading
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            disabled={loading} // Disable input while loading
          />
          <button type="submit" disabled={loading}>{loading ? 'Logging In...' : 'Log In'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
