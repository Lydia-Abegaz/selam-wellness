import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function LoginScreen({ navigate, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid credentials.'); setLoading(false); return; }
      onLogin(data.user);
    } catch (e) {
      setError('Could not connect. Make sure the server is running.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #F5EDE0 0%, #FAF3E0 60%, #F0E4CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }} aria-hidden="true">
        <defs>
          <pattern id="stars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g transform="translate(60,60)" fill="#8B4513">
              <polygon points="0,-40 9,-9 40,0 9,9 0,40 -9,9 -40,0 -9,-9" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: '#FFF',
          borderRadius: '28px',
          padding: '48px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 20px 60px rgba(44,24,16,0.12)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <button onClick={() => navigate('landing')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-charcoal-muted)', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: 0,
        }}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px', fontWeight: '600',
            color: 'var(--color-terracotta)',
            letterSpacing: '0.12em',
            marginBottom: '10px',
          }}>
            SELAM WELLNESS
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px', fontWeight: '700',
            color: 'var(--color-coffee)',
            lineHeight: 1.1, marginBottom: '10px',
          }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px' }}>
            Continue your wellness journey.
          </p>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-charcoal-soft)', display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="hana@example.com"
              style={{
                width: '100%', padding: '14px 16px',
                border: '1.5px solid rgba(44,24,16,0.15)',
                borderRadius: '12px', outline: 'none',
                fontFamily: 'var(--font-body)', fontSize: '15px',
                color: 'var(--color-charcoal)', background: '#FAFAFA',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-terracotta)'}
              onBlur={e => e.target.style.borderColor = 'rgba(44,24,16,0.15)'}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-charcoal-soft)', display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '14px 48px 14px 16px',
                  border: '1.5px solid rgba(44,24,16,0.15)',
                  borderRadius: '12px', outline: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: 'var(--color-charcoal)', background: '#FAFAFA',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-terracotta)'}
                onBlur={e => e.target.style.borderColor = 'rgba(44,24,16,0.15)'}
              />
              <button onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-charcoal-muted)',
              }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            background: '#FFF0ED', border: '1px solid rgba(164,74,58,0.3)',
            borderRadius: '10px', padding: '12px 16px',
            color: 'var(--color-terracotta)', fontSize: '13px',
            marginBottom: '20px',
          }}>
            {error}
          </div>
        )}

        {/* Demo hint */}
        <div style={{
          background: 'rgba(122,158,126,0.1)', borderRadius: '10px',
          padding: '10px 14px', marginBottom: '20px', fontSize: '12px',
          color: 'var(--color-sage)', fontWeight: '500',
        }}>
          Demo: use <strong>hana@selam.et</strong> / <strong>selam123</strong>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            background: loading ? 'rgba(44,24,16,0.4)' : 'var(--color-coffee)',
            color: '#FAF3E0', border: 'none',
            borderRadius: '14px', fontSize: '15px', fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            marginBottom: '20px',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </motion.button>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-charcoal-soft)' }}>
          No account?{' '}
          <button onClick={() => navigate('register')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-terracotta)', fontWeight: '600', fontSize: '14px',
          }}>
            Join Selam free
          </button>
        </div>
      </motion.div>
    </div>
  );
}
