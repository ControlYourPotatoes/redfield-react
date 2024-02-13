import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Navbar.css';
import Home from './components/pages/Home';
// Import other page components here
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
// import Prices from './components/pages/Prices';
import SignUp from './components/pages/SignUp';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact_us' element={<ContactUs />} />
          {/* <Route path='/Prices' element={<PricingTable />} /> */}
          <Route path='/Sign-up' element={<SignUp />} /> {/* Updated this line to include SignUp component */}
        </Routes>
        <div className='muiButtons'>
        </div>
      </Router>

    </div>
  );
}

export default App;
