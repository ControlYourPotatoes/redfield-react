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
import InvestorDashboard from './components/Dashboard/InvestorDashboard';
import ContactUs from './components/pages/ContactUs';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from './theme';
import { AuthProvider } from './components/pages/AuthContext';
import MainPage from './MainPage';
import AccountMenu from './components/pages/AccountMenu';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AuthProvider>
          <AccountMenu />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact_us' element={<ContactUs />} />
            <Route path='/Prices' element={<Prices />} />
            <Route path='/GuidedStore' element={<GuidedStore />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/SignInUpForm' element={<SignInSignUpPage />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path='/InvestorDashboard' element={<InvestorDashboard />} />
          </Routes>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
