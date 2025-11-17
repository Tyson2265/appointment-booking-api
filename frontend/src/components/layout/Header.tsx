import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const auth = useAuthContext();
  const nav = useNavigate();
  return (
    <header className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold"><Link to="/">Capitec Booking</Link></h1>
      </div>
      <nav className="space-x-4">
        <Link to="/branches" className="text-gray-700">Branches</Link>
        <Link to="/slots" className="text-gray-700">Slots</Link>
        <Link to="/booking" className="text-gray-700">Book</Link>
        {auth.isAuthenticated ? (
          <button onClick={() => { auth.logout(); nav('/'); }} className="ml-3 text-sm px-3 py-1 rounded border">Logout</button>
        ) : (
          <Link to="/auth/login" className="ml-3 text-sm px-3 py-1 rounded border">Login</Link>
        )}
      </nav>
    </header>
  );
}