import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Caregivers from './pages/Caregivers';
import AddCaregivers from './pages/AddCaregivers';
import EditCaregiver from './pages/EditCaregiver';
import About from './pages/About';
import Contact from './pages/Contact';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HireCaregiver from './pages/HireCaregiver';

const App = () => {
  const caregiversRef = useRef();

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        
        {/* Updated path for login and signup */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/caregivers' element={<Caregivers ref={caregiversRef} />} />
        <Route path='/edit-caregiver/:id' element={<EditCaregiver caregiversRef={caregiversRef} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointments' element={<Appointment />} />
        <Route path="/add-caregiver" element={<AddCaregivers />} />
        <Route path="/caregivers/:id/hire" element={<HireCaregiver />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
