// App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Prices from './components/pages/Prices';
import GuidedStore from './components/guided_store/GuidedStore';
import Dashboard from './components/Dashboard/Dashboard';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Slider } from '@mui/material';
function App() {
  return (
    <ThemeProvider theme={theme}>
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
      <Slider
  defaultValue={30}
  sx={{
    width: 300,
    color: 'success.main',
  }}
/>
    </ThemeProvider>
  );
}

export default App;
