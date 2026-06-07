import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function RegisterScreen({ navigate, onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Registration failed.'); setLoading(false); return; }
      onLogin(data.user);
    } catch (e) {
      setError('Could not connect. Make sure the server is running.');
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name',            label: 'FULL NAME',       type: 'text',     placeholder: 'Hana Mengistu' },
    { key: 'email',           label: 'EMAIL',           type: 'email',    placeholder: 'hana@example.com' },
    { key: 'password',        label: 'PASSWORD',        type: 'password', placeholder: '••••••••' },
    { key: 'confirmPassword', label: 'CONFIRM PASSWORD',type: 'password', placeholder: '••••••••' },
  ];

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    border: '1.5px solid rgba(44,24,16,0.15)',
    borderRadius: '12px', outline: 'none',
    fontFamily: 'var(--font-body)', fontSize: '15px',
    color: 'var(--color-charcoal)', background: '#FAFAFA',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #F5EDE0 0%, #FAF3E0 60%, #F0E4CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }} aria-hidden="true">
        <defs>
          <pattern id="stars2" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g transform="translate(60,60)" fill="#8B4513">
              <polygon points="0,-40 9,-9 40,0 9,9 0,40 -9,9 -40,0 -9,-9" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars2)" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: '#FFF', borderRadius: '28px',
          padding: '48px', width: '100%', maxWidth: '440px',
          boxShadow: '0 20px 60px rgba(44,24,16,0.12)',
          position: 'relative', zIndex: 2,
        }}
      >
        <button onClick={() => navigate('landing')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-charcoal-muted)', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: 0,
        }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '600',
            color: 'var(--color-terracotta)', letterSpacing: '0.12em', marginBottom: '10px',
          }}>
            SELAM WELLNESS
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '700',
            color: 'var(--color-coffee)', lineHeight: 1.1, marginBottom: '8px',
          }}>
            Join the village
          </h1>
          <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px' }}>
            Free forever. Your space. Your peace.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {fields.map(field => (
            <div key={field.key}>
              <label style={{
                fontSize: '11px', fontWeight: '700', color: 'var(--color-charcoal-soft)',
                display: 'block', marginBottom: '5px', letterSpacing: '0.08em',
              }}>
                {field.label}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={field.type === 'password' ? (showPass ? 'text' : 'password') : field.type}
                  value={form[field.key]}
                  onChange={e => update(field.key, e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()}
                  placeholder={field.placeholder}
                  style={{ ...inputStyle, paddingRight: field.type === 'password' ? '44px' : '16px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-terracotta)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(44,24,16,0.15)'}
                />
                {field.key === 'password' && (
                  <button onClick={() => setShowPass(!showPass)} style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-charcoal-muted)',
                  }}>
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div style={{
            background: '#FFF0ED', border: '1px solid rgba(164,74,58,0.3)',
            borderRadius: '10px', padding: '12px 16px',
            color: 'var(--color-terracotta)', fontSize: '13px',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            background: loading ? 'rgba(44,24,16,0.4)' : 'var(--color-terracotta)',
            color: '#FFF', border: 'none',
            borderRadius: '14px', fontSize: '15px', fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s', marginBottom: '20px',
          }}
        >
          {loading ? 'Creating account...' : 'Create Free Account →'}
        </motion.button>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-charcoal-soft)' }}>
          Already a member?{' '}
          <button onClick={() => navigate('login')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-terracotta)', fontWeight: '600', fontSize: '14px',
          }}>
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
}
