import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';

const Login = lazy(() => import('../components/Login'));

function LoginPage() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  );
}

export default LoginPage;
