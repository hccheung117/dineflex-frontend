import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RestaurantPage from './pages/RestaurantPage';
import BookingPage from './pages/BookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

function App() {
  return (
    <AuthProvider> 
        <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking-history" element={<BookingHistoryPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;