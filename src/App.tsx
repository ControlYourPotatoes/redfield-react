// App.tsx
import React from 'react';
// Removed Router import since it's now used in the entry point file
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';
import Prices from './components/pages/Prices';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact_us' element={<ContactUs />} />
        <Route path='/Prices' element={<Prices />} />
        <Route path='/Sign-up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
