import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../features/login/loginSlice';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const username = useSelector(state => state.username);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1500);

        // Clear timeout on unmount
        return () => clearTimeout(timeout);
    }, []);

    const handleLogout = useCallback(() => {
        dispatch(logOut());
        navigate('/');
    }, [dispatch, navigate]);

    const handleClick = useCallback(() => {
        navigate('/signup');
    }, [navigate]);

    const handleClickLog = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    return (
        <div className='nav'>
            <div className="logo" onClick={() => navigate('/')}>
                <div className="border">
                    <p><b>Home.</b>Theatre</p>
                </div>
            </div>
            <div className="center">
                {isLoggedIn && !loading && (
                    <div className='search'>
                        <input
                            type="text"
                            placeholder="Type something ..."
                        />
                        <button type="submit">Search</button>
                    </div>
                )}
            </div>
            <div className="admin">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    isLoggedIn ? (
                        <div onClick={handleLogout}>{username}</div>
                    ) : (
                        <div className="btn">
                            <button className='btnlog' onClick={handleClick}>SignUp</button>
                            <button className='btnlog' onClick={handleClickLog}>Login</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Navbar;
