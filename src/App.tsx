// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Prices from './components/pages/Prices';
import GuidedStore from './components/guided_store/GuidedStore';
import Dashboard from './components/Dashboard/Dashboard';
import SignInSignUpPage from './components/pages/SignUpform';
import ContactUs from './components/pages/ContactUs';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from './theme';

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
          <Route path='/SignInUpForm' element={<SignInSignUpPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
