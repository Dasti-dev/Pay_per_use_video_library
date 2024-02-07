import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';

const Signup = lazy(() => import('../components/Signup'));

function SignupPage() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
      </Suspense>
    </div>
  );
}

export default SignupPage;
