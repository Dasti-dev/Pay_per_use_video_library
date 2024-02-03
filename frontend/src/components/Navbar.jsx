import React,{ useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../features/login/loginSlice';
import './Navbar.css'

function Navbar() {

    const navigator = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const handleClick = (e) => {
        e.preventDefault();
        navigator('/signup')
    }
    const handleClickLog = (e) => {
        e.preventDefault();
        navigator('/login')
    }
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logOut());
        navigator('/');
    }

  return (
    <div className='nav'>
        <div className="logo" onClick={(e)=>navigator('/')}>
            <div className="border">
              <p><b>Home.</b>Theatre</p>  
            </div>
        </div>
        <div className="center">
            {
                isLoggedIn && 
                <div className='search'>     
                    <input
                        type="text"
                        placeholder="Type something ..."
                        // Add any additional attributes or event handlers as needed
                    />
                    <button type="submit">Search</button> 
                </div>
            }
        </div>
        <div className="admin">
            {
                isLoggedIn ? <div onClick={handleLogout}>{useSelector(state => state.username)}</div> : <div className="btn"><button className='btnlog' onClick={handleClick}>SignUp</button> <button className='btnlog' onClick={handleClickLog}>Login</button></div>
            }
        </div>
    </div>
  )
}

export default Navbar
