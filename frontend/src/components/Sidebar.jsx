import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';

const options = [
    {
        key : 1,
        name : "Library",
        logo : "lib" ,
        link : '/dashboard',
    },
    {
        key : 2,
        name : "Wallet",
        logo : "lib" ,
        link : '/dashboard/wallet',
    },
]



function Sidebar() {

    const navigator = useNavigate();
    const handleNavigation = (link) => {
        navigator(link);
    };

  return (
    <div className="Sidebar">
        {
            options.map((data) => (
                <div className="optns" key={data.key} onClick={() => handleNavigation(data.link)}>{data.name}</div>
            ))
        }
    </div>
  )
}

export default Sidebar
