import React, { useState, useEffect } from 'react';
import './Main.css';

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Clear timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='Main'>
      {loading ? (
        <div className="loadingText">Loading...</div>
      ) : (
        <div className="centerText">
          WORLD OF MOVIES
        </div>
      )}
    </div>
  );
};

export default React.memo(Main);
