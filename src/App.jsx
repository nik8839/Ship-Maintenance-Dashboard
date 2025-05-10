// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import LoginForm from './components/Authentication/LoginForm';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShipsProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/ships" element={<PrivateRoute><ShipsPage /></PrivateRoute>} />
          </Routes>
        </ShipsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
