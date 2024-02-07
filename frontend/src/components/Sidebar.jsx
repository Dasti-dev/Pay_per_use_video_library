import React, { useState, useEffect, useMemo } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const options = [
    {
        key: 1,
        name: "Library",
        logo: "lib",
        link: '/dashboard',
    },
    {
        key: 2,
        name: "Wallet",
        logo: "lib",
        link: '/dashboard/wallet',
    },
    {
        key: 3,
        name: "Upload",
        logo: "lib",
        link: '/dashboard/upload',
    },
];

function Sidebar() {
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        // Simulate loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1500);

        // Clear timeout on unmount
        return () => clearTimeout(timeout);
    }, []);

    const handleNavigation = (link) => {
        navigator(link);
    };

    const memoizedOptions = useMemo(() => options, []); // Memoize options array

    return (
        <div className="Sidebar">
            {loading ? (
                <div>Loading...</div>
            ) : (
                memoizedOptions.map((data) => (
                    <div className="optns" key={data.key} onClick={() => handleNavigation(data.link)}>
                        {data.name}
                    </div>
                ))
            )}
        </div>
    );
}

export default Sidebar;
