import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Enroll from './pages/Enroll';
import Fields from './pages/Fields';
import Features from './pages/Features';
import Student from './pages/Sudents';
import Loginpage from './pages/Loginpage';
import SignUppage from './pages/SignUppage';
import RoleManagement from './pages/RoleManagement';

// Dynamic Protected Route: checks auth state every time the route is visited
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('cambridge_user') || sessionStorage.getItem('cambridge_user');
  return user ? children : <Navigate to="/Login" replace />;
};

// Dynamic Public Route: redirects to / if user is already logged in
const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('cambridge_user') || sessionStorage.getItem('cambridge_user');
  return user ? <Navigate to="/" replace /> : children;
};

// Super Admin Only Route: strictly verifies user has role === 'superadmin'
const SuperAdminRoute = ({ children }) => {
  const rawUser = localStorage.getItem('cambridge_user') || sessionStorage.getItem('cambridge_user');
  let user = null;
  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (e) {
    user = null;
  }
  return user && user.role === 'superadmin' ? children : <Navigate to="/" replace />;
};

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="">

          <Routes>

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Loginpage />
                </PublicRoute>
              }
            />
            <Route
              path="/Login"
              element={
                <PublicRoute>
                  <Loginpage />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUppage />
                </PublicRoute>
              }
            />
            <Route
              path="/SignUp"
              element={
                <PublicRoute>
                  <SignUppage />
                </PublicRoute>
              }
            />

            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/Enroll"
              element={<Enroll />}
            />
            <Route
              path="/Fields"
              element={<Fields />}
            />
            <Route
              path="/Features"
              element={<Features />}
            />
            <Route
              path="/Students"
              element={
                <ProtectedRoute>
                  <Student />
                </ProtectedRoute>
              }
            />

            {/* Super Admin exclusive role control center */}
            <Route
              path="/admin/roles"
              element={
                <SuperAdminRoute>
                  <RoleManagement />
                </SuperAdminRoute>
              }
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

