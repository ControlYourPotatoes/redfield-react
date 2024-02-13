import React from 'react';
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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact_us' element={
            <div>
              <p>For any inquiries, please contact us at:</p>
              <a href="mailto:project.h.redfield@gmail.com">project.h.redfield@gmail.com</a>
            </div>
          } />
          <Route path='/Prices' element={<PricingTable />} />
          <Route path='/Sign-up' element={<SignUp />} /> {/* Updated this line to include SignUp component */}
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
