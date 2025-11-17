import { Suspense, lazy } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import { useAuthContext } from './contexts/AuthContext';

const Appointments = lazy(() => import('./pages/Appointments'));
const Booking = lazy(() => import('./pages/Booking'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));


export default function App() {
  const auth = useAuthContext();
  const nav = useNavigate();

  return (
    <div style={{fontSize:"16px"}} className="min-h-screen bg-gray-50 font-sans">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-6">

            {/* show main nav only after login */}
            {auth.isAuthenticated ? (
            <header className="top-nav">
        <div className="brand"></div>
        <div className="nav-actions">
          <button><Link to="/bookings" className="nav-action">Bookings</Link></button>
          <button><Link to="/appointments" className="nav-action">Appointments</Link></button>
          {auth.isAuthenticated && (
            <button className="nav-action" onClick={() => { auth.logout(); nav('/auth/login'); }}>Logout</button>
          )}
        </div>
      </header>
            ) : null}
          </div>

        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public auth endpoints */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            

            {/* Protected endpoints */}
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <PrivateRoute>
                  <Appointments />
                </PrivateRoute>
              }
            />

            {/* Redirect unknown routes to bookings */} 


            <Route path="*" element={<Navigate to="/bookings" replace />} />

          </Routes>
        </Suspense>
      </main>
    </div>
  );
}