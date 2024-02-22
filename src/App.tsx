// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Prices from './components/pages/Prices';
import ContactUs from './components/pages/ContactUs';
import GuidedStore from './components/guided_store/GuidedStore';

// MainPage component that includes Home, Prices, and About
const MainPage = () => (
  <div>
    <Home />
    <Prices />
    <About />
  </div>
);

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/Contact_us' element={<ContactUs />} />
        <Route path='/GuidedStore' element={<GuidedStore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
