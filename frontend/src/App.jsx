import React from 'react';
import './App.css'
import { useSelector } from 'react-redux';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute/Privateroute';

function App() {
  const loggedIn = useSelector(state => state.isLoggedIn);

  
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          {
            loggedIn &&
            <Route path="/dashboard/*" element={<Dashboard />}></Route>
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
