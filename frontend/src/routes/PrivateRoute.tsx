import { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const auth = useAuthContext();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect to login and include original location so user can return after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}