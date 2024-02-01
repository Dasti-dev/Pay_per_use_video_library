import React from 'react'
import { useLocation } from 'react-router-dom';
import './Dashboard.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Video from '../components/Video'
import Wallet from '../components/Wallet';

function Dashboard() {
    const location = useLocation();
    let content;
    switch(location.pathname) {
        case '/dashboard' : content = <Video />
        break;
        case '/dashboard/wallet' : content =    <Wallet />
        break;
        default :
        content = null
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
