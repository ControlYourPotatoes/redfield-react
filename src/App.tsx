// App.tsx
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
>>>>>>> origin/Puga
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Prices from './components/pages/Prices';
<<<<<<< HEAD
import ContactUs from './components/pages/ContactUs';
import GuidedStore from './components/guided_store/GuidedStore';
import Dashboard from './components/Dashboard/Dashboard';

// MainPage component that includes Home, Prices, and About
const MainPage = () => (
  <div>
    <Home />
    <Prices />
    <About />
  </div>
);
=======
import GuidedStore from './components/guided_store/GuidedStore';
import Dashboard from './components/Dashboard/Dashboard'; // Ensure this import matches the exported component

>>>>>>> origin/Puga

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/Contact_us' element={<ContactUs />} />
        <Route path='/GuidedStore' element={<GuidedStore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
