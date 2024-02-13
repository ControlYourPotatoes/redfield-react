import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import './components/Navbar.css';

import Home from './components/pages/Home';
// Import other page components here
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Prices from './components/pages/Prices';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div style={{ marginTop: '10px' }}> {/* Adjust the margin-top based on the navbar's height */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact_us' element={<ContactUs />} />
            <Route path='/Prices' element={<Prices />} />
            <Route path='/Sign-up' element={<SignUp />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
