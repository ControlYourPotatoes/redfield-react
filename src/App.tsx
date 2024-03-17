// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Prices from './components/pages/Prices';
import GuidedStore from './components/guided_store/GuidedStore';
import Dashboard from './components/Dashboard/Dashboard';
import SignInSignUpPage from './components/pages/SignUpform';
import ResetPassword from './components/pages/resetPassword';
import AccountMenu from './components/pages/AccountMenu';

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
      <AccountMenu />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/GuidedStore' element={<GuidedStore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/SignInUpForm' element={<SignInSignUpPage/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
