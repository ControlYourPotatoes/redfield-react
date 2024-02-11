import React from 'react';
import './App.css';
import { MuiButton } from './components/MuiButton';
import { MuiTypography } from './components/MuiTypography';
import PuertoRicoMap from './components/PuertoRicoMap';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PricingTable from './components/PricingTable'; // Make sure to create this component

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<div>About Page Placeholder</div>} />
          <Route path='/Contact_us' element={
            <div>
              <p>For any inquiries, please contact us at:</p>
              <a href="mailto:project.h.redfield@gmail.com">project.h.redfield@gmail.com</a>
            </div>
          } />
          <Route path='/Prices' element={<PricingTable />} /> {/* Render the PricingTable component here */}
          <Route path='/Sign-up' element={<div>Sign Up Placeholder</div>} />
        </Routes>
        <div className='muiButtons'>
          <MuiButton />
          <MuiTypography />
          <PuertoRicoMap />
        </div>
      </Router>
    </div>
  );
}

export default App;
