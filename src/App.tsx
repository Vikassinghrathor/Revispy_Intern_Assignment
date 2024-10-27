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

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem('isAuthenticated'))
  );

  // Add registration state
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    sessionStorage.clear(); // Clear any registration data
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(true);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <DiscountBanner />

      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/category" replace />
            ) : (
              <Register onRegisterSuccess={handleRegisterSuccess} />
            )
          }
        />

        <Route
          path="/verify-email"
          element={
            isAuthenticated ? (
              <Navigate to="/category" replace />
            ) : !isRegistering ? (
              <Navigate to="/signup" replace />
            ) : (
              <VerifyEmail />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/category" replace />
            ) : (
              <Login onLoginSuccess={login} />
            )
          }
        />

        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
};

export default App;