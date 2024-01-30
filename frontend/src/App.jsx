import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage';
import Landing from './pages/Landing';

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
