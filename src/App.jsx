<<<<<<< HEAD

import './App.css'


function App() {
return <>
  <h1 className='text-center font-semibold text-3xl'>Welcome to react</h1>
  <div className='text-3xl font-bold underline text-center'>This is container</div>
  
</>
}

export default App
=======
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
>>>>>>> context
