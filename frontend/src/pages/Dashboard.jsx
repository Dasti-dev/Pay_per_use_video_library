import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/login/loginSlice';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getContent = useMemo(() => {
        switch(location.pathname) {
            case '/dashboard':
                return React.lazy(() => import('../components/Video'));
            case '/dashboard/wallet':
                return React.lazy(() => import('../components/Wallet'));
            case '/dashboard/upload':
                return React.lazy(() => import('../components/Upload'));
            default:
                dispatch(logOut());
                navigate('/');
                return null;
        }
    }, [location.pathname, dispatch, navigate]);

    const ContentComponent = getContent; // Corrected PascalCase variable name

    return (
        <div className="Dashboard">
            <Navbar />
            <div className="content">
                <Sidebar />
                <div className="left">
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {ContentComponent && <ContentComponent />} {/* Corrected PascalCase usage */}
                    </React.Suspense>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
