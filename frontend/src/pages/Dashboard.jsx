import React from 'react'
import { useLocation } from 'react-router-dom';
import './Dashboard.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Video from '../components/Video'
import Wallet from '../components/Wallet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/login/loginSlice';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let content;
    switch(location.pathname) {
        case '/dashboard' : content = <Video />
        break;
        case '/dashboard/wallet' : content =    <Wallet />
        break;
        default :
        {
            content = null;
            dispatch(logOut())
            navigate('/');
        }
    }
  return (
    <div className="Dashboard">
        <Navbar></Navbar>
        <div className="content">
            <Sidebar></Sidebar>
            {
                <div className="left">
                    { content }
                </div>
            }

        </div>
    </div>
  )
}

export default Dashboard
