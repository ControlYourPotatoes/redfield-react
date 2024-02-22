// App.tsx
import React from 'react';
// Removed Router import since it's now used in the entry point file
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Prices from './components/pages/Prices';
import Dashboard from './components/Dashboard/Dashboard';

import GuidedStore from './components/guided_store/GuidedStore';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact_us' element={<ContactUs />} />
        <Route path='/Prices' element={<Prices />} />
        <Route path='/GuidedStore' element={<GuidedStore />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
