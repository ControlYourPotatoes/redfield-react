import React from 'react';
import './App.css';
import { MuiButton } from './components/MuiButton'; // Make sure this component exists
import { MuiTypography } from './components/MuiTypography'; // Make sure this component exists
import PuertoRicoMap from './components/PuertoRicoMap'; // Make sure this component exists
import Navbar from './components/Navbar'; // Ensure this is updated to MUI v5
import './components/Navbar.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'; // Make sure this component exists
import About from './components/About'; // Ensure this component exists and is updated
import PricingTable from './components/PricingTable'; // Make sure this component is created
import SignUp from './components/SignUp'; // Ensure this component is created and added

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
