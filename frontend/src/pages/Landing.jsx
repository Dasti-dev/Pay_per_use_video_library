import React, { lazy, Suspense } from 'react';
import './Landing.css';
import Navbar from '../components/Navbar';

const Main = lazy(() => import('../components/Main'));

function Landing() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    </div>
  );
}

export default Landing;
