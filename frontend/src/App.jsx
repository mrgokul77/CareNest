import React, { useRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyProfile from './pages/MyProfile';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" />;
  }

  return children;
};

const App = () => {
  const caregiversRef = useRef();

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
    
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
