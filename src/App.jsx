// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import LoginForm from "./components/Authentication/LoginForm";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipForm from "./components/Ships/ShipForm";
import ShipDetail from "./components/Ships/ShipDetail";
import { JobsProvider } from "./contexts/JobsContext";
import JobsPage from "./pages/JobsPage";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShipsProvider>
          <JobsProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/ships"
              element={
                <PrivateRoute>
                  <ShipsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/ships/new"
              element={
                <PrivateRoute>
                  <ShipForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/ships/edit/:id"
              element={
                <PrivateRoute>
                  <ShipForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/ships/:id"
              element={
                <PrivateRoute>
                  <ShipDetail />
                </PrivateRoute>
              }
            />
            <Route path="/jobs" element={<PrivateRoute><JobsPage /></PrivateRoute>} />
          </Routes>
          </JobsProvider>
        </ShipsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
