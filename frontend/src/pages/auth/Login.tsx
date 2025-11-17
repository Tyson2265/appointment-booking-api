import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../styles/auth.css';

export default function Login() {
  const auth = useAuthContext();
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as any;

  const [username, setUsername] = useState(state.username || '');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await auth.login(username, password);
      const dest = state.from?.pathname || '/branches';
      nav(dest, { replace: true });
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    }
  };

  return (
    <div className="branches-page">
      <div className="branches-container">
        <div className="branches-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left side hero */}
            <div className="auth-hero">
              <div style={{ fontSize: 20, opacity: 0.9 }}>Welcome to</div>
              <h2 style={{ fontSize: 32, opacity: 0.9 }}>Capitec Appointment Booking</h2>
              <p>Sign in to view branches, slots and make bookings</p>
            </div>

            {/* Right side login card */}
            <div className="auth-card mx-auto" style={{ width: '100%', maxWidth: 420 }}>
              {state.registered && (
                <div className="auth-success">Account created — please sign in.</div>
              )}
              {err && (
                <div className="auth-success" style={{ background: '#ffebee', color: '#c62828' }}>
                  {err}
                </div>
              )}

              <form onSubmit={submit}>
                <input
                  className="auth-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="auth-primary" type="submit">
                  Sign In
                </button>
              </form>

              <div className="auth-links">
                <a href="/auth/register">Create account</a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Use Forgot PIN flow (not implemented)');
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <div className="auth-note">
                By signing in you agree to the terms of service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
