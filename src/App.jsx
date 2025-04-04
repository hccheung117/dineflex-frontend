import { useEffect } from 'react'; // Make sure to import useEffect from React
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RestaurantPage from './pages/RestaurantPage';
import BookingPage from './pages/BookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

function MainApp() {
  const { user, login } = useAuth();
  const navigate = useNavigate(); // Correctly use useNavigate inside MainApp (which is inside Router)

  useEffect(() => {
    // Check localStorage for a token
    const token = localStorage.getItem("token");
    if (token && !user) {
      // If token exists and user is not logged in, auto-login
      login({ token }); // Assuming your login method handles setting the user data
      navigate("/"); // Redirect to home page
    }
  }, [user, login, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/booking-history" element={<BookingHistoryPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;