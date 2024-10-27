import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import Register from "./pages/Signup/Register";
import VerifyEmail from "./pages/Signup/VerifyEmail";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Header from "./components/Header";
import DiscountBanner from "./components/DiscountBanner";

// Define types for ProtectedRoute props
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const App: React.FC = () => {
  // Track login status with TypeScript
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    // Check if user is authenticated from localStorage or session
    Boolean(localStorage.getItem('isAuthenticated'))
  );

  // Protected Route Component with location handling
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated) {
      // Redirect to login while preserving the attempted URL
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
  };

  // Authentication helper functions
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      {/* Header and DiscountBanner are always displayed */}
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <DiscountBanner />

      <Routes>
        {/* Default route redirects to signup */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Public routes */}
        <Route
          path="/signup"
          element={
            isAuthenticated ?
              <Navigate to="/category" replace /> :
              <Register onRegisterSuccess={() => { }} />
          }
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ?
              <Navigate to="/category" replace /> :
              <Login onLoginSuccess={login} />
          }
        />

        {/* Protected routes */}
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />

        {/* Catch all route for 404 */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
};

export default App;