import './App.css';
import { MuiButton } from './components/MuiButton';
import { MuiTypography } from './components/MuiTypography';
import PuertoRicoMap from './components/PuertoRicoMap';
import Navbar from './components/Navbar'
import './components/Navbar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes> 
          <Route path='/' element={<Home />} />
            <Route path='/About' />
            <Route path='/Contact_us'/>
            <Route path='/Prices'/>
            <Route path='/Sign-up'/>
          </Routes>
          <Home />
    <div className='muiBottons'>
        <MuiButton />
        <MuiTypography />
        <PuertoRicoMap />
    </div>
      </Router>
    </div>
  );
}

export default App;
