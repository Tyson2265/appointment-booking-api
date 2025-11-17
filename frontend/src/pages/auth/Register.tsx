import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

export default function Register() {
  const auth = useAuthContext();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await auth.register(username, password);
      nav('/auth/login', { state: { registered: true, username } });
    } catch (e: any) {
      setErr(e?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="branches-page">
      <div className="branches-container">
        <div className="branches-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left side hero */}
            <div className="auth-hero">
              <div style={{ fontSize: 20, opacity: 0.9 }}>Create an Account</div>
              <h2 style={{ fontSize: 32, opacity: 0.9 }}>Get Started</h2>
              <p>Register to book appointments at Capitec branches.</p>
            </div>

            {/* Right side form card */}
            <div className="auth-card mx-auto" style={{ width: '100%', maxWidth: 420 }}>
              {err && (
                <div
                  className="auth-success"
                  style={{ background: '#ffebee', color: '#c62828' }}
                >
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
                <button className="auth-primary" type="submit" disabled={loading}>
                  {loading ? 'Creating…' : 'Create Account'}
                </button>
              </form>

              <div className="auth-links" style={{ marginTop: 12 }}>
                <a href="/auth/login">Already have an account? Sign in</a>
              </div>

              <div className="auth-note">
                We will never share your information. This is a demo UI.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
